/**
 * Fragment shader for the Globe component
 * Handles globe rendering using Fibonacci sphere sampling, lighting, markers, and atmospheric effects
 */
export const fragmentShader = `
precision highp float;

// Basic uniforms
uniform vec2 r;        // Resolution
uniform vec2 x;        // Offset
uniform vec3 L;        // Base color
uniform vec3 M;        // Marker color
uniform vec3 y;        // Glow color
uniform vec4 z[64];    // Markers array
uniform float A;       // Phi (rotation)
uniform float B;       // Theta (rotation)
uniform float k;       // Map samples
uniform float C;       // Scale
uniform float D;       // Markers count
uniform float E;       // Map brightness
uniform float F;       // Diffuse
uniform float G;       // Dark mode
uniform sampler2D H;   // Texture

// Constants
float I = 1.0 / k;     // Inverse of samples

// Rotation matrix for sphere
mat3 J(float a, float b) {
  float c = cos(a);
  float d = cos(b);
  float e = sin(a);
  float f = sin(b);
  return mat3(
    d, f * e, -f * c,
    0.0, c, e,
    f, d * -e, d * c
  );
}

// Fibonacci sphere sampling function
vec3 v(vec3 c, out float w) {
  c = c.xzy;
  
  // Calculate optimal subdivision level
  float p = max(2.0, floor(log2(2.236068 * k * 3.141593 * (1.0 - c.z * c.z)) * 0.72021));
  
  // Golden ratio calculations
  vec2 g = floor(pow(1.618034, p) / 2.236068 * vec2(1.0, 1.618034) + 0.5);
  vec2 d = fract((g + 1.0) * 0.618034) * 6.283185 - 3.883222;
  vec2 e = -2.0 * g;
  
  // Project coordinates
  vec2 f = vec2(atan(c.y, c.x), c.z - 1.0);
  vec2 q = floor(vec2(e.y * f.x - d.y * (f.y * k + 1.0), -e.x * f.x + d.x * (f.y * k + 1.0)) / (d.x * e.y - e.x * d.y));
  
  float n = 3.141593;
  vec3 s;
  
  // Find closest point on Fibonacci sphere
  for (float h = 0.0; h < 4.0; h += 1.0) {
    vec2 t = vec2(mod(h, 2.0), floor(h * 0.5));
    float j = dot(g, q + t);
    
    if (j > k) continue;
    
    // Generate Fibonacci point
    float a = j;
    float b = 0.0;
    
    // Binary expansion for golden ratio
    if (a >= 524288.0) { a -= 524288.0; b += 0.803894; }
    if (a >= 262144.0) { a -= 262144.0; b += 0.901947; }
    if (a >= 131072.0) { a -= 131072.0; b += 0.950973; }
    if (a >= 65536.0) { a -= 65536.0; b += 0.475487; }
    if (a >= 32768.0) { a -= 32768.0; b += 0.737743; }
    if (a >= 16384.0) { a -= 16384.0; b += 0.868872; }
    if (a >= 8192.0) { a -= 8192.0; b += 0.934436; }
    if (a >= 4096.0) { a -= 4096.0; b += 0.467218; }
    if (a >= 2048.0) { a -= 2048.0; b += 0.733609; }
    if (a >= 1024.0) { a -= 1024.0; b += 0.866804; }
    if (a >= 512.0) { a -= 512.0; b += 0.433402; }
    if (a >= 256.0) { a -= 256.0; b += 0.216701; }
    if (a >= 128.0) { a -= 128.0; b += 0.108351; }
    if (a >= 64.0) { a -= 64.0; b += 0.554175; }
    if (a >= 32.0) { a -= 32.0; b += 0.777088; }
    if (a >= 16.0) { a -= 16.0; b += 0.888544; }
    if (a >= 8.0) { a -= 8.0; b += 0.944272; }
    if (a >= 4.0) { a -= 4.0; b += 0.472136; }
    if (a >= 2.0) { a -= 2.0; b += 0.236068; }
    if (a >= 1.0) { a -= 1.0; b += 0.618034; }
    
    // Convert to spherical coordinates
    float l = fract(b) * 6.283185;
    float i = 1.0 - 2.0 * j * I;
    float m = sqrt(1.0 - i * i);
    vec3 o = vec3(cos(l) * m, sin(l) * m, i);
    
    // Check distance
    float u = length(c - o);
    if (u < n) {
      n = u;
      s = o;
    }
  }
  
  w = n;
  return s.xzy;
}

void main() {
  // Calculate screen coordinates
  vec2 a = (gl_FragCoord.xy / r * 2.0 - 1.0) / C - x * vec2(1.0, -1.0) / r;
  a.x *= r.x / r.y;
  
  float c = dot(a, a);
  float b;
  vec3 d = vec3(0.0, 0.0, 1.0);  // Light direction
  vec3 e = normalize(vec3(a, sqrt(0.64 - c)));  // Ray direction
  
  if (c <= 0.64) {
    // Inside sphere
    vec3 f = e * J(B, A);  // Apply rotation
    vec3 g = v(f, b);      // Get closest Fibonacci point
    
    // Calculate texture coordinates
    float j = asin(g.y);
    float h = acos(-g.x / cos(j));
    h = g.z < 0.0 ? -h : h;
    
    // Sample texture
    float t = texture2D(H, vec2(h * 0.5 / 3.141593, -(j / 3.141593 + 0.5))).x;
    
    // Lighting calculations
    float u = smoothstep(8e-3, 0.0, b);  // Distance-based smoothing
    float l = dot(e, d);                  // Lambert lighting
    float s = pow(l, F) * E;             // Diffuse with brightness
    float m = t * u * s;                 // Combined lighting
    float N = mix((1.0 - m) * pow(l, 0.4), m, G) + 0.1;  // Dark mode blend
    
    gl_FragColor = vec4(L * N, 1.0);
    
    // Add markers
    int O = int(D);
    float n = 0.0;
    for (int i = 0; i < 64; i++) {
      if (i >= O) break;
      
      vec4 o = z[i];
      vec3 p = o.xyz;
      vec3 w = p - f;
      float q = o.w;
      
      // Check if marker is visible
      if (dot(w, w) > q * q * 4.0) continue;
      
      vec3 P = v(p, b);
      b = length(P - f);
      
      if (b < q) {
        n += smoothstep(q * 0.5, 0.0, b);
      }
    }
    
    n = min(1.0, n * s);
    gl_FragColor.xyz = mix(gl_FragColor.xyz, M, n);
    gl_FragColor.xyz += pow(1.0 - dot(e, d), 4.0) * y;
  }
  
  // Atmospheric glow
  float K = pow(dot(normalize(vec3(-a, sqrt(1.0 - c))), d), 4.0) * smoothstep(0.1, 1.0, 0.2 / (c - 0.64));
  gl_FragColor += vec4(K * y, K);
}
`;

export default fragmentShader;
