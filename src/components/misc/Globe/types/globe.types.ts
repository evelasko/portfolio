export interface MarkerLocation {
  latitude: number;
  longitude: number;
}

export interface DragOptions {
  stiffness: number;
  damping: number;
  mass: number;
}

export interface GlobeOffset {
  offsetX: number;
  offsetY: number;
}

export interface GlobeProps {
  background?: string;
  baseColor?: string;
  glowColor?: string;
  markerColor?: string;
  isDraggable?: boolean;
  dragOptions?: DragOptions;
  speed?: number;
  phi?: number;
  theta?: number;
  dark?: number;
  diffuse?: number;
  mapBrightness?: number;
  maxSamples?: number;
  markerSize?: number;
  markerArray?: MarkerLocation[];
  scale?: number;
  alignment?: 'flex-start' | 'center' | 'flex-end';
  maxWidth?: number;
  offset?: GlobeOffset;
  devicePixelRatio?: number;
}

export interface WebGLAttribute {
  name: string;
  size: number;
  data?: Float32Array;
}

export interface GlobeWebGLBuffer {
  buffer: WebGLBuffer;
  location: number;
  size: number;
}

export type UniformValue = 
  | number 
  | [number, number] 
  | [number, number, number] 
  | [number, number, number, number]
  | Float32Array;

export interface WebGLUniform {
  type: UniformType;
  value: UniformValue;
  location?: WebGLUniformLocation | null;
}

export type UniformType = 'float' | 'vec2' | 'vec3' | 'vec4' | 'mat2' | 'mat3' | 'mat4' | 'sampler2D';

export interface UniformMap {
  [key: string]: WebGLUniform;
}

export interface WebGLGeometry {
  vertices: Array<{ x: number; y: number; z: number }>;
  normal?: Array<{ x: number; y: number; z: number }>;
}

export type AttributeModifierFunction = (
  data: Float32Array | undefined,
  vertexIndex: number,
  componentIndex: number,
  shader: GlobeWebGLShader
) => number;

export interface WebGLShaderConfig {
  gl: WebGLRenderingContext;
  vertex: string;
  fragment: string;
  uniforms: UniformMap;
  geometry: WebGLGeometry;
  mode?: number;
  modifiers?: { [key: string]: AttributeModifierFunction };
  attributes?: WebGLAttribute[];
  multiplier?: number;
}

export interface WebGLEngineConfig {
  canvas: HTMLCanvasElement;
  contextType?: string;
  context?: WebGLContextAttributes;
  settings?: WebGLEngineSettings;
}

export interface WebGLEngineSettings {
  devicePixelRatio?: number;
  clearColor?: [number, number, number, number];
  position?: { x: number; y: number; z: number };
  clip?: [number, number];
  onSetup?: (gl: WebGLRenderingContext) => void;
  onRender?: (engine: WebGLEngine) => void;
}

export interface GlobeEngineConfig {
  width: number;
  height: number;
  devicePixelRatio: number;
  phi: number;
  theta: number;
  dark: number;
  diffuse: number;
  mapSamples: number;
  mapBrightness: number;
  baseColor: [number, number, number];
  glowColor: [number, number, number];
  markerColor: [number, number, number];
  markers: Array<{ location: [number, number]; size: number }>;
  scale: number;
  offset: [number, number];
  onRender?: (uniforms: RenderUniforms) => void;
}

export interface RenderUniforms {
  phi?: number;
  theta?: number;
  dark?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  glowColor?: [number, number, number];
  markerColor?: [number, number, number];
  markers?: Array<{ location: [number, number]; size: number }>;
  scale?: number;
  offset?: [number, number];
  width?: number;
  height?: number;
}

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

// Forward declarations
export interface GlobeWebGLShader {
  render: (engineUniforms: UniformMap, updateUniforms?: Record<string, WebGLUniform>) => void;
  updateUniform: (name: string, value: UniformValue) => void;
  getUniform: (name: string) => UniformValue | undefined;
  destroy: () => void;
}

export interface WebGLEngine {
  gl: WebGLRenderingContext;
  canvas: HTMLCanvasElement;
  uniforms: UniformMap;
  instances: Map<string, GlobeWebGLShader>;
  shouldRender: boolean;
}
