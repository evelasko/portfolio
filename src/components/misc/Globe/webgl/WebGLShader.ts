"use client";
import type {
  WebGLShaderConfig,
  WebGLAttribute,
  GlobeWebGLBuffer,
  UniformMap,
  WebGLUniform,
  UniformValue,
} from "../types/globe.types";
import { createUniformMap } from "./utils/uniformMapping";

/**
 * Globe WebGL Shader class that manages individual shader programs
 * Handles compilation, buffer management, uniforms, and rendering
 */
export class GlobeWebGLShader {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram | null = null;
  private uniforms: UniformMap;
  private attributes: WebGLAttribute[];
  private buffers: GlobeWebGLBuffer[] = [];
  private attributeKeys: string[] = [];
  private uniformMap: ReturnType<typeof createUniformMap>;
  private geometry: WebGLShaderConfig["geometry"];
  private mode: number;
  private modifiers: WebGLShaderConfig["modifiers"];
  private multiplier: number;
  private vertex: string;
  private fragment: string;
  private onRender?: (shader: GlobeWebGLShader) => void;

  constructor(config: WebGLShaderConfig) {
    this.gl = config.gl;
    this.vertex = config.vertex;
    this.fragment = config.fragment;
    this.uniforms = { ...config.uniforms };
    this.geometry = config.geometry;
    this.mode = config.mode ?? this.gl.TRIANGLE_STRIP;
    this.modifiers = config.modifiers ?? {};
    this.attributes = config.attributes ?? [];
    this.multiplier = config.multiplier ?? 1;
    this.uniformMap = createUniformMap(this.gl);

    // Initialize the shader
    this.prepareProgram();
    this.prepareUniforms();
    this.prepareAttributes();
  }

  /**
   * Compiles a shader of the given type
   */
  private compileShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type);
    if (!shader) {
      throw new Error("Failed to create shader");
    }

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const error = this.gl.getShaderInfoLog(shader);
      this.gl.deleteShader(shader);
      throw new Error(`Shader compilation error: ${error}`);
    }

    return shader;
  }

  /**
   * Creates and links the shader program
   */
  private prepareProgram(): void {
    const program = this.gl.createProgram();
    if (!program) {
      throw new Error("Failed to create shader program");
    }

    const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, this.vertex);
    const fragmentShader = this.compileShader(
      this.gl.FRAGMENT_SHADER,
      this.fragment
    );

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      const error = this.gl.getProgramInfoLog(program);
      this.gl.deleteProgram(program);
      throw new Error(`Program linking error: ${error}`);
    }

    this.gl.useProgram(program);
    this.program = program;

    // Clean up shaders after linking
    this.gl.deleteShader(vertexShader);
    this.gl.deleteShader(fragmentShader);
  }

  /**
   * Prepares uniform locations
   */
  private prepareUniforms(): void {
    if (!this.program) return;

    const uniformKeys = Object.keys(this.uniforms);
    for (const key of uniformKeys) {
      const location = this.gl.getUniformLocation(this.program, key);
      this.uniforms[key].location = location;
    }
  }

  /**
   * Prepares vertex attributes and buffers
   */
  private prepareAttributes(): void {
    // Add default position attribute if vertices exist
    if (
      this.geometry.vertices &&
      this.attributes.findIndex(attr => attr.name === "aPosition") === -1
    ) {
      this.attributes.push({ name: "aPosition", size: 3 });
    }

    // Add normal attribute if normals exist
    if (
      this.geometry.normal &&
      this.attributes.findIndex(attr => attr.name === "aNormal") === -1
    ) {
      this.attributes.push({ name: "aNormal", size: 3 });
    }

    this.attributeKeys = this.attributes.map(attr => attr.name);

    // Prepare each attribute
    for (const attribute of this.attributes) {
      this.prepareAttribute(attribute);
    }
  }

  /**
   * Prepares a single attribute with its data
   */
  private prepareAttribute(attribute: WebGLAttribute): void {
    const { vertices, normal } = this.geometry;
    const { size, name } = attribute;
    const vertexCount = vertices.length;
    const totalSize = this.multiplier * vertexCount * size;
    const data = new Float32Array(totalSize);

    for (let instance = 0; instance < this.multiplier; instance++) {
      const instanceData = attribute.data;
      const offset = instance * vertexCount * size;

      for (let vertexIndex = 0; vertexIndex < vertexCount; vertexIndex++) {
        for (let component = 0; component < size; component++) {
          const index = offset + vertexIndex * size + component;
          const modifier = this.modifiers?.[name];

          if (modifier) {
            data[index] = modifier(instanceData, vertexIndex, component, this);
          } else if (name === "aPosition") {
            const coords = ["x", "y", "z"] as const;
            data[index] = vertices[vertexIndex][coords[component]];
          } else if (name === "aNormal" && normal) {
            const coords = ["x", "y", "z"] as const;
            data[index] = normal[vertexIndex][coords[component]];
          } else if (instanceData && instanceData[component] !== undefined) {
            data[index] = instanceData[component];
          } else {
            data[index] = 0;
          }
        }
      }
    }

    // Update the attribute with the generated data
    const attributeIndex = this.attributeKeys.indexOf(name);
    this.attributes[attributeIndex].data = data;

    // Create buffer for this attribute
    this.prepareBuffer(this.attributes[attributeIndex]);
  }

  /**
   * Creates WebGL buffer for an attribute
   */
  private prepareBuffer(attribute: WebGLAttribute): void {
    if (!this.program || !attribute.data) return;

    const buffer = this.gl.createBuffer();
    if (!buffer) {
      throw new Error("Failed to create buffer");
    }

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      attribute.data,
      this.gl.STATIC_DRAW
    );

    const location = this.gl.getAttribLocation(this.program, attribute.name);
    this.gl.enableVertexAttribArray(location);
    this.gl.vertexAttribPointer(
      location,
      attribute.size,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    const attributeIndex = this.attributeKeys.indexOf(attribute.name);
    this.buffers[attributeIndex] = {
      buffer,
      location,
      size: attribute.size,
    };
  }

  /**
   * Renders the shader with the given uniforms
   */
  public render(
    engineUniforms: UniformMap,
    updateUniforms: Record<string, WebGLUniform> = {}
  ): void {
    if (!this.program) return;

    this.gl.useProgram(this.program);

    // Bind buffers
    for (const buffer of this.buffers) {
      if (buffer && buffer.buffer) {
        this.gl.enableVertexAttribArray(buffer.location);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.buffer);
        this.gl.vertexAttribPointer(
          buffer.location,
          buffer.size,
          this.gl.FLOAT,
          false,
          0,
          0
        );
      }
    }

    // Update uniforms from parameters
    Object.keys(updateUniforms).forEach(key => {
      if (this.uniforms[key]) {
        this.uniforms[key].value = updateUniforms[key].value;
      }
    });

    // Set all uniforms
    Object.keys(this.uniforms).forEach(key => {
      const uniform = this.uniforms[key];
      if (uniform.location && this.uniformMap[uniform.type]) {
        this.uniformMap[uniform.type](uniform.location, uniform.value);
      }
    });

    // Draw
    const vertexCount = this.multiplier * this.geometry.vertices.length;
    this.gl.drawArrays(this.mode, 0, vertexCount);

    // Call render callback if provided
    if (this.onRender) {
      this.onRender(this);
    }
  }

  /**
   * Updates a uniform value
   */
  public updateUniform(name: string, value: UniformValue): void {
    if (this.uniforms[name]) {
      this.uniforms[name].value = value;
    }
  }

  /**
   * Gets current uniform value
   */
  public getUniform(name: string): UniformValue | undefined {
    return this.uniforms[name]?.value;
  }

  /**
   * Sets the render callback
   */
  public setOnRender(callback: (shader: GlobeWebGLShader) => void): void {
    this.onRender = callback;
  }

  /**
   * Destroys the shader and cleans up resources
   */
  public destroy(): void {
    // Delete buffers
    for (const buffer of this.buffers) {
      if (buffer && buffer.buffer) {
        this.gl.deleteBuffer(buffer.buffer);
      }
    }

    // Delete program
    if (this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }

    // Clear arrays
    this.buffers = [];
    this.attributes = [];
    this.attributeKeys = [];
  }
}
