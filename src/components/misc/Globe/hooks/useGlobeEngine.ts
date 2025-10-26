"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import type {
  MarkerLocation,
  RenderUniforms,
  ColorRGB,
  UniformMap,
  WebGLUniform,
} from "../types/globe.types";
import { WebGLEngine } from "../webgl/WebGLEngine";
import { vertexShader } from "../webgl/shaders/vertex.glsl";
import { fragmentShader } from "../webgl/shaders/fragment.glsl";
import {
  createQuadGeometry,
  processMarkersForShader,
  normalizeMarkers,
} from "../webgl/utils/sphereUtils";
import {
  createUniform,
  UNIFORM_PARAMS,
  normalizeColor,
} from "../webgl/utils/uniformMapping";

export interface UseGlobeEngineConfig {
  width: number;
  height: number;
  devicePixelRatio?: number;
  phi?: number;
  theta?: number;
  dark?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: string | ColorRGB;
  glowColor?: string | ColorRGB;
  markerColor?: string | ColorRGB;
  markers?: MarkerLocation[];
  markerSize?: number;
  scale?: number;
  offset?: [number, number];
  onRender?: (uniforms: RenderUniforms) => void;
}

export interface UseGlobeEngineReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  updateUniforms: (uniforms: Partial<RenderUniforms>) => void;
  setMarkers: (markers: MarkerLocation[]) => void;
  setRotation: (phi: number, theta: number) => void;
  isReady: boolean;
  engine: WebGLEngine | null;
}

/**
 * Creates a simple procedural texture for the globe
 * This creates a basic land/water pattern using procedural generation
 */
const createGlobeTexture = (gl: WebGLRenderingContext): WebGLTexture => {
  const size = 128;
  const data = new Uint8Array(size * size);

  // Generate a simple procedural pattern
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const index = y * size + x;

      // Convert to spherical coordinates
      const phi = (x / size) * 2 * Math.PI;
      const theta = (y / size) * Math.PI - Math.PI / 2;

      // Simple noise-like pattern for landmasses
      const noise1 = Math.sin(phi * 3) * Math.cos(theta * 2);
      const noise2 = Math.sin(phi * 7 + theta * 5) * 0.3;
      const noise3 = Math.sin(phi * 13 - theta * 11) * 0.1;

      const value = noise1 + noise2 + noise3;

      // Create landmass pattern
      data[index] = value > 0.2 ? 255 : 0; // White for land, black for water
    }
  }

  const texture = gl.createTexture();
  if (!texture) {
    throw new Error("Failed to create texture");
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.LUMINANCE,
    size,
    size,
    0,
    gl.LUMINANCE,
    gl.UNSIGNED_BYTE,
    data
  );

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  return texture;
};

/**
 * Custom React hook for managing the Globe WebGL engine
 * Handles initialization, cleanup, and provides an interface for updates
 */
export const useGlobeEngine = (
  config: UseGlobeEngineConfig
): UseGlobeEngineReturn => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<WebGLEngine | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Helper function to parse color input
  const parseColor = useCallback(
    (
      color: string | ColorRGB | undefined,
      fallback: ColorRGB
    ): [number, number, number] => {
      if (!color) return normalizeColor(fallback);

      if (typeof color === "string") {
        // Parse hex color
        if (color.startsWith("#")) {
          const hex = color.slice(1);
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          return normalizeColor({ r, g, b });
        }
        // Parse rgb() string or other formats - simplified for now
        return normalizeColor(fallback);
      }

      return normalizeColor(color);
    },
    []
  );

  // Initialize WebGL engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    try {
      // Create WebGL engine
      const engine = new WebGLEngine({
        canvas,
        settings: {
          devicePixelRatio:
            config.devicePixelRatio ?? window.devicePixelRatio ?? 1,
          clearColor: [0, 0, 0, 1], // Black background
          position: { x: 0, y: 0, z: 2 },
          clip: [0.001, 100],
        },
      });

      // Create procedural texture
      const texture = createGlobeTexture(engine.gl);

      // Parse colors
      const baseColor = parseColor(config.baseColor, { r: 24, g: 24, b: 27 });
      const glowColor = parseColor(config.glowColor, { r: 14, g: 165, b: 233 });
      const markerColor = parseColor(config.markerColor, {
        r: 239,
        g: 68,
        b: 68,
      });

      // Process markers
      const markerArray = config.markers || [];
      const markerSize = config.markerSize || 0.1;
      const normalizedMarkers = normalizeMarkers(markerArray);
      const processedMarkers = processMarkersForShader(markerArray, markerSize);

      // Create uniforms for the globe shader
      const globeUniforms: UniformMap = {
        [UNIFORM_PARAMS.resolution]: createUniform("vec2", [
          config.width,
          config.height,
        ]),
        [UNIFORM_PARAMS.offset]: createUniform("vec2", config.offset || [0, 0]),
        [UNIFORM_PARAMS.baseColor]: createUniform("vec3", baseColor),
        [UNIFORM_PARAMS.glowColor]: createUniform("vec3", glowColor),
        [UNIFORM_PARAMS.markerColor]: createUniform("vec3", markerColor),
        [UNIFORM_PARAMS.markers]: createUniform(
          "vec4",
          new Float32Array(processedMarkers)
        ),
        [UNIFORM_PARAMS.phi]: createUniform("float", config.phi || 0),
        [UNIFORM_PARAMS.theta]: createUniform("float", config.theta || 0),
        [UNIFORM_PARAMS.mapSamples]: createUniform(
          "float",
          config.mapSamples || 40000
        ),
        [UNIFORM_PARAMS.scale]: createUniform("float", config.scale || 1),
        [UNIFORM_PARAMS.markersCount]: createUniform(
          "float",
          normalizedMarkers.length
        ),
        [UNIFORM_PARAMS.mapBrightness]: createUniform(
          "float",
          config.mapBrightness || 0.8
        ),
        [UNIFORM_PARAMS.diffuse]: createUniform("float", config.diffuse || 0.4),
        [UNIFORM_PARAMS.dark]: createUniform("float", config.dark || 0.8),
        // Add texture uniform
        H: createUniform("sampler2D", 0), // Texture unit 0
      };

      // Add globe shader to engine
      const geometry = createQuadGeometry();
      const globeShader = engine.add("globe", {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: globeUniforms,
        geometry,
        mode: engine.gl.TRIANGLES,
      });

      // Bind texture to shader
      engine.gl.activeTexture(engine.gl.TEXTURE0);
      engine.gl.bindTexture(engine.gl.TEXTURE_2D, texture);
      globeShader.updateUniform("H", 0); // Texture uniform in shader

      engineRef.current = engine;
      setIsReady(true);
    } catch (error) {
      console.error("Failed to initialize Globe WebGL engine:", error);
      setIsReady(false);
    }

    // Cleanup function
    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
      setIsReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.width, config.height, config.devicePixelRatio, parseColor]);

  // Update uniforms function
  const updateUniforms = useCallback(
    (uniforms: Partial<RenderUniforms>) => {
      if (!engineRef.current) return;

      const globeShader = engineRef.current.get("globe");
      if (!globeShader) return;

      const updateData: Record<string, WebGLUniform> = {};

      // Map update parameters to shader uniforms
      Object.entries(uniforms).forEach(([key, value]) => {
        const uniformKey = UNIFORM_PARAMS[key as keyof typeof UNIFORM_PARAMS];
        if (uniformKey && value !== undefined) {
          if (
            key === "baseColor" ||
            key === "glowColor" ||
            key === "markerColor"
          ) {
            // Type guard for color values
            if (
              typeof value === "string" ||
              (value &&
                typeof value === "object" &&
                "r" in value &&
                "g" in value &&
                "b" in value)
            ) {
              updateData[uniformKey] = {
                type: "vec3",
                value: parseColor(value as string | ColorRGB, {
                  r: 255,
                  g: 255,
                  b: 255,
                }),
              };
            }
          } else if (key === "offset") {
            // Type guard for offset arrays
            if (Array.isArray(value) && value.length === 2) {
              updateData[uniformKey] = {
                type: "vec2",
                value: value as [number, number],
              };
            }
          } else if (key === "width" || key === "height") {
            // Type guard for numeric values
            if (typeof value === "number") {
              const currentResolution = globeShader.getUniform(
                UNIFORM_PARAMS.resolution
              ) as [number, number];
              const newResolution: [number, number] =
                key === "width"
                  ? [value, currentResolution[1]]
                  : [currentResolution[0], value];
              updateData[UNIFORM_PARAMS.resolution] = {
                type: "vec2",
                value: newResolution,
              };
            }
          } else if (key === "markers") {
            // Handle markers separately with setMarkers function
            if (Array.isArray(value)) {
              // We'll use setMarkers for this instead of inline uniform update
              return;
            }
          } else {
            // Type guard for numeric values
            if (typeof value === "number") {
              updateData[uniformKey] = {
                type: "float",
                value: value,
              };
            }
          }
        }
      });

      // Apply updates
      Object.entries(updateData).forEach(([key, uniform]) => {
        globeShader.updateUniform(key, uniform.value);
      });

      // Call onRender callback if provided
      if (config.onRender) {
        config.onRender(uniforms);
      }
       
    },
    [parseColor, config.onRender]
  );

  // Set markers function
  const setMarkers = useCallback(
    (markers: MarkerLocation[]) => {
      if (!engineRef.current) return;

      const globeShader = engineRef.current.get("globe");
      if (!globeShader) return;

      const markerSize = config.markerSize || 0.1;
      const processedMarkers = processMarkersForShader(markers, markerSize);
      const normalizedMarkers = normalizeMarkers(markers);

      globeShader.updateUniform(
        UNIFORM_PARAMS.markers,
        new Float32Array(processedMarkers)
      );
      globeShader.updateUniform(
        UNIFORM_PARAMS.markersCount,
        normalizedMarkers.length
      );
    },
    [config.markerSize]
  );

  // Set rotation function
  const setRotation = useCallback(
    (phi: number, theta: number) => {
      updateUniforms({ phi, theta });
    },
    [updateUniforms]
  );

  return {
    canvasRef,
    updateUniforms,
    setMarkers,
    setRotation,
    isReady,
    engine: engineRef.current,
  };
};
