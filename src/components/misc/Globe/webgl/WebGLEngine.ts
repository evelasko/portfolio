"use client";
import type {
  WebGLEngineConfig,
  UniformMap,
  WebGLUniform,
  UniformValue,
  GlobeWebGLShader,
  WebGLShaderConfig,
} from "../types/globe.types";
import { createUniformMap } from "./utils/uniformMapping";
import { GlobeWebGLShader as ShaderClass } from "./WebGLShader";
import {
  calculateProjectionMatrix,
  calculateModelMatrix,
  createViewMatrix,
} from "./utils/sphereUtils";

/**
 * Deep clone function that preserves typed arrays like Float32Array
 */
function deepCloneUniforms(uniforms: UniformMap): UniformMap {
  const cloned: UniformMap = {};

  for (const [key, uniform] of Object.entries(uniforms)) {
    cloned[key] = {
      type: uniform.type,
      value:
        uniform.value instanceof Float32Array
          ? new Float32Array(uniform.value)
          : Array.isArray(uniform.value)
            ? [...uniform.value]
            : uniform.value,
      location: uniform.location,
    };
  }

  return cloned;
}

/**
 * WebGL Engine class that manages the overall WebGL context and rendering
 * Handles context initialization, resize operations, and multiple shader instances
 */
export class WebGLEngine {
  public gl: WebGLRenderingContext;
  public canvas: HTMLCanvasElement;
  public uniforms: UniformMap = {};
  public instances: Map<string, GlobeWebGLShader> = new Map();
  public shouldRender: boolean = true;

  private uniformMap: ReturnType<typeof createUniformMap>;
  private devicePixelRatio: number;
  private clearColor: [number, number, number, number];
  private position: { x: number; y: number; z: number };
  private clip: [number, number];
  private onSetup?: (gl: WebGLRenderingContext) => void;
  private onRender?: (engine: WebGLEngine) => void;
  private animationFrameId?: number;

  constructor(config: WebGLEngineConfig) {
    this.canvas = config.canvas;

    // Get WebGL context
    const contextType = config.contextType ?? "webgl";
    const contextAttributes = {
      alpha: false,
      antialias: false,
      ...config.context,
    };

    const gl = this.canvas.getContext(
      contextType,
      contextAttributes
    ) as WebGLRenderingContext | null;

    if (!gl) {
      throw new Error("WebGL not supported or failed to create context");
    }

    this.gl = gl;

    // Initialize settings with defaults
    const settings = config.settings ?? {};
    this.devicePixelRatio = settings.devicePixelRatio ?? 1;
    this.clearColor = settings.clearColor ?? [1, 1, 1, 1];
    this.position = settings.position ?? { x: 0, y: 0, z: 2 };
    this.clip = settings.clip ?? [0.001, 100];
    this.onSetup = settings.onSetup;
    this.onRender = settings.onRender;

    // Create uniform mapping system
    this.uniformMap = createUniformMap(this.gl);

    // Initialize WebGL state
    this.initializeWebGL();

    // Setup resize handling
    this.setupResizeHandler();

    // Initial resize and render
    this.resize();
    this.render();
  }

  /**
   * Initializes WebGL state and settings
   */
  private initializeWebGL(): void {
    // Enable depth testing
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);

    // Set clear color if alpha is disabled
    const contextAttributes = this.gl.getContextAttributes();
    if (contextAttributes && !contextAttributes.alpha) {
      this.gl.clearColor(...this.clearColor);
      this.gl.clearDepth(1.0);
    }

    // Call setup callback if provided
    if (this.onSetup) {
      this.onSetup(this.gl);
    }
  }

  /**
   * Sets up automatic resize handling
   */
  private setupResizeHandler(): void {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => this.resize());
    }
  }

  /**
   * Handles canvas resize and updates projection matrices
   */
  public resize(): void {
    const { canvas, gl, devicePixelRatio, position, clip } = this;

    // Update canvas size
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    const aspectRatio = width / height;

    // Set viewport
    gl.viewport(0, 0, width, height);

    // Calculate matrices
    const fieldOfView = 45; // degrees
    const projectionMatrix = calculateProjectionMatrix(
      aspectRatio,
      fieldOfView,
      clip[0],
      clip[1]
    );
    const modelMatrix = calculateModelMatrix(position, aspectRatio);
    const viewMatrix = createViewMatrix();

    // Update engine uniforms
    this.uniforms.uProjectionMatrix = {
      type: "mat4",
      value: projectionMatrix,
    };

    this.uniforms.uModelMatrix = {
      type: "mat4",
      value: modelMatrix,
    };

    this.uniforms.uViewMatrix = {
      type: "mat4",
      value: viewMatrix,
    };
  }

  /**
   * Toggles rendering on/off
   */
  public toggle(shouldRender?: boolean): void {
    const newState =
      shouldRender !== undefined ? shouldRender : !this.shouldRender;

    if (newState !== this.shouldRender) {
      this.shouldRender = newState;

      if (this.shouldRender) {
        this.render();
      } else if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = undefined;
      }
    }
  }

  /**
   * Main render loop
   */
  public render(): void {
    // Clear the screen
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Render all shader instances
    this.instances.forEach(instance => {
      instance.render(this.uniforms);
    });

    // Call render callback if provided
    if (this.onRender) {
      this.onRender(this);
    }

    // Continue render loop if should render
    if (this.shouldRender) {
      this.animationFrameId = requestAnimationFrame(() => this.render());
    }
  }

  /**
   * Adds a new shader instance to the engine
   */
  public add(
    name: string,
    config: Omit<WebGLShaderConfig, "gl" | "uniforms"> & {
      uniforms?: UniformMap;
    }
  ): GlobeWebGLShader {
    // Properly clone engine uniforms preserving typed arrays
    const shaderUniforms = {
      ...deepCloneUniforms(this.uniforms),
      ...config.uniforms,
    };

    // Create shader configuration
    const shaderConfig: WebGLShaderConfig = {
      ...config,
      gl: this.gl,
      uniforms: shaderUniforms,
    };

    // Create and store shader instance
    const shader = new ShaderClass(shaderConfig);
    this.instances.set(name, shader);

    return shader;
  }

  /**
   * Removes a shader instance from the engine
   */
  public remove(name: string): void {
    const instance = this.instances.get(name);
    if (instance) {
      instance.destroy();
      this.instances.delete(name);
    }
  }

  /**
   * Gets a shader instance by name
   */
  public get(name: string): GlobeWebGLShader | undefined {
    return this.instances.get(name);
  }

  /**
   * Updates a uniform value across all shader instances
   */
  public updateUniform(name: string, value: UniformValue): void {
    if (this.uniforms[name]) {
      this.uniforms[name].value = value;
    }
  }

  /**
   * Sets uniforms for the engine
   */
  public setUniforms(uniforms: Record<string, WebGLUniform>): void {
    Object.assign(this.uniforms, uniforms);
  }

  /**
   * Gets the current canvas size
   */
  public getSize(): { width: number; height: number } {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }

  /**
   * Gets the current aspect ratio
   */
  public getAspectRatio(): number {
    return this.canvas.width / this.canvas.height;
  }

  /**
   * Destroys the engine and cleans up all resources
   */
  public destroy(): void {
    // Stop render loop
    this.toggle(false);

    // Destroy all shader instances
    this.instances.forEach(instance => {
      instance.destroy();
    });
    this.instances.clear();

    // Remove resize listener
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", () => this.resize());
    }

    // Clear uniforms
    this.uniforms = {};
  }
}
