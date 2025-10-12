import type { MarkerLocation } from "../../types/globe.types";

/**
 * Mathematical constants
 */
const { PI, sin, cos } = Math;

/**
 * Converts markers with latitude/longitude to the format expected by the shader
 * Each marker becomes [x, y, z, size] coordinates
 */
export const processMarkersForShader = (
  markers: MarkerLocation[],
  markerSize: number
): number[] => {
  const processedMarkers = markers.flatMap(marker => {
    const { latitude: lat, longitude: lng } = marker;

    // Convert degrees to radians
    const latRad = (lat * PI) / 180;
    const lngRad = (lng * PI) / 180 - PI;

    // Convert spherical coordinates to cartesian
    const cosLat = cos(latRad);
    const x = -cosLat * cos(lngRad);
    const y = sin(latRad);
    const z = cosLat * sin(lngRad);

    return [x, y, z, markerSize];
  });

  // Pad with zeros to ensure we have space for 64 markers (256 floats total)
  const paddedMarkers = [...processedMarkers];
  while (paddedMarkers.length < 256) {
    paddedMarkers.push(0);
  }

  return paddedMarkers;
};

/**
 * Converts latitude/longitude coordinates to spherical coordinates
 */
export const latLngToSpherical = (
  lat: number,
  lng: number
): [number, number] => {
  const latRad = (lat * PI) / 180;
  const lngRad = (lng * PI) / 180;
  return [latRad, lngRad];
};

/**
 * Converts spherical coordinates to cartesian coordinates
 */
export const sphericalToCartesian = (
  lat: number,
  lng: number,
  radius: number = 1
): [number, number, number] => {
  const cosLat = cos(lat);
  const x = radius * cosLat * cos(lng);
  const y = radius * sin(lat);
  const z = radius * cosLat * sin(lng);
  return [x, y, z];
};

/**
 * Creates the geometry for a fullscreen quad (two triangles)
 * This is used as the base geometry that the fragment shader will render the globe onto
 */
export const createQuadGeometry = () => ({
  vertices: [
    { x: -100, y: 100, z: 0 }, // Top left
    { x: -100, y: -100, z: 0 }, // Bottom left
    { x: 100, y: 100, z: 0 }, // Top right
    { x: 100, y: -100, z: 0 }, // Bottom right
    { x: -100, y: -100, z: 0 }, // Bottom left (repeat for second triangle)
    { x: 100, y: 100, z: 0 }, // Top right (repeat for second triangle)
  ],
});

/**
 * Calculates the projection matrix for the WebGL scene
 */
export const calculateProjectionMatrix = (
  aspectRatio: number,
  fieldOfView: number = 45,
  near: number = 0.001,
  far: number = 100
): Float32Array => {
  const fov = (fieldOfView * PI) / 180;
  const f = 1.0 / Math.tan(fov / 2);
  const rangeInv = 1 / (near - far);

  return new Float32Array([
    f / aspectRatio,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (near + far) * rangeInv,
    -1,
    0,
    0,
    near * far * rangeInv * 2,
    0,
  ]);
};

/**
 * Calculates the model matrix with position transformations
 */
export const calculateModelMatrix = (
  position: { x: number; y: number; z: number },
  aspectRatio: number
): Float32Array => {
  const { x, y, z } = position;
  const scale = aspectRatio < 1 ? 1 : aspectRatio;

  return new Float32Array([
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    x,
    y,
    -z * scale,
    1,
  ]);
};

/**
 * Creates a basic view matrix (identity for this implementation)
 */
export const createViewMatrix = (): Float32Array => {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};

/**
 * Normalizes marker array to ensure consistent format
 */
export const normalizeMarkers = (
  markers: (MarkerLocation | { location: [number, number]; size?: number })[]
): Array<{ location: [number, number]; size: number }> => {
  return markers.map(marker => {
    if ("location" in marker && Array.isArray(marker.location)) {
      return {
        location: marker.location as [number, number],
        size: marker.size || 0.1,
      };
    } else if ("latitude" in marker && "longitude" in marker) {
      return {
        location: [marker.latitude, marker.longitude] as [number, number],
        size: 0.1,
      };
    } else {
      // Fallback for any unexpected format
      return {
        location: [0, 0] as [number, number],
        size: 0.1,
      };
    }
  });
};
