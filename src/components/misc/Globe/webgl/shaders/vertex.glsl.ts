/**
 * Vertex shader for the Globe component
 * Handles basic vertex transformation using projection, model, and view matrices
 */
export const vertexShader = `
attribute vec3 aPosition;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(aPosition, 1.0);
}
`;

export default vertexShader;
