import type { UniformType, UniformValue } from '../../types/globe.types';

/**
 * Maps uniform types to their corresponding WebGL methods
 */
export const createUniformMap = (gl: WebGLRenderingContext) => ({
  float: (location: WebGLUniformLocation, value: UniformValue) => {
    gl.uniform1f(location, value as number);
  },
  vec2: (location: WebGLUniformLocation, value: UniformValue) => {
    gl.uniform2fv(location, value as Float32Array | number[]);
  },
  vec3: (location: WebGLUniformLocation, value: UniformValue) => {
    gl.uniform3fv(location, value as Float32Array | number[]);
  },
  vec4: (location: WebGLUniformLocation, value: UniformValue) => {
    gl.uniform4fv(location, value as Float32Array | number[]);
  },
  mat2: (location: WebGLUniformLocation, value: UniformValue) => {
    gl.uniformMatrix2fv(location, false, value as Float32Array | number[]);
  },
  mat3: (location: WebGLUniformLocation, value: UniformValue) => {
    gl.uniformMatrix3fv(location, false, value as Float32Array | number[]);
  },
  mat4: (location: WebGLUniformLocation, value: UniformValue) => {
    gl.uniformMatrix4fv(location, false, value as Float32Array | number[]);
  },
  sampler2D: (location: WebGLUniformLocation, value: UniformValue) => {
    gl.uniform1i(location, value as number);
  },
});

/**
 * Uniform parameter constants mapping to shader variables
 */
export const UNIFORM_PARAMS = {
  phi: 'A',
  theta: 'B', 
  mapSamples: 'k',
  mapBrightness: 'E',
  baseColor: 'L',
  markerColor: 'M',
  glowColor: 'y',
  diffuse: 'F',
  dark: 'G',
  offset: 'x',
  scale: 'C',
  devicePixelRatio: 'devicePixelRatio',
  markers: 'z',
  markersCount: 'D',
  resolution: 'r',
} as const;

/**
 * Creates uniform configuration helper
 */
export const createUniform = (
  type: UniformType, 
  defaultValue: UniformValue, 
  currentValue?: UniformValue
) => ({
  type,
  value: currentValue !== undefined ? currentValue : defaultValue,
});

/**
 * Type guard to check if a value is a valid uniform value
 */
export const isValidUniformValue = (value: unknown): value is UniformValue => {
  if (typeof value === 'number') return true;
  if (Array.isArray(value)) {
    return value.length >= 2 && value.length <= 4 && value.every(v => typeof v === 'number');
  }
  if (value instanceof Float32Array) return true;
  return false;
};

/**
 * Converts color values from 0-255 range to 0-1 range for WebGL
 */
export const normalizeColor = (color: { r: number; g: number; b: number }): [number, number, number] => {
  return [color.r / 255, color.g / 255, color.b / 255];
};
