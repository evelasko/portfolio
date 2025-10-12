"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useGlobeEngine } from "./hooks/useGlobeEngine";
import type { GlobeProps } from "./types/globe.types";

interface GlobeComponentProps extends Partial<GlobeProps> {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

const Globe: React.FC<GlobeComponentProps> = ({
  className = "",
  style,
  width = 400,
  height = 400,
  background = "transparent",
  baseColor = "#18181b",
  glowColor = "#0ea5e9",
  markerColor = "#ef4444",
  isDraggable = true,
  speed = 0.01,
  phi = 0,
  theta = 0,
  dark = 0.8,
  diffuse = 0.4,
  mapBrightness = 0.8,
  maxSamples = 40000,
  markerSize = 0.1,
  markerArray = [],
  scale = 1,
  alignment = "center",
  maxWidth = 600,
  offset,
  devicePixelRatio,
  ...props
}) => {
  // State for rotation animation
  const [rotation, setRotationState] = useState({
    phi: phi || 0,
    theta: theta || 0,
  });
  const [isAnimating, setIsAnimating] = useState(!isDraggable);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPointer, setLastPointer] = useState({ x: 0, y: 0 });

  // Calculate responsive dimensions
  const containerWidth = Math.min(width, maxWidth);
  const containerHeight = height;

  // Initialize the WebGL engine
  const {
    canvasRef,
    updateUniforms,
    setMarkers,
    setRotation,
    isReady,
    engine,
  } = useGlobeEngine({
    width: containerWidth,
    height: containerHeight,
    devicePixelRatio:
      devicePixelRatio ||
      (typeof window !== "undefined" ? window.devicePixelRatio : 1),
    phi: rotation.phi,
    theta: rotation.theta,
    dark,
    diffuse,
    mapSamples: maxSamples,
    mapBrightness,
    baseColor: typeof baseColor === "string" ? baseColor : undefined,
    glowColor: typeof glowColor === "string" ? glowColor : undefined,
    markerColor: typeof markerColor === "string" ? markerColor : undefined,
    markers: markerArray,
    markerSize,
    scale,
    offset: offset ? [offset.offsetX, offset.offsetY] : [0, 0],
  });

  // Animation loop for auto-rotation
  useEffect(() => {
    if (!isAnimating || isDragging || !engine) return;

    const animate = () => {
      setRotationState(prev => ({
        phi: prev.phi + speed,
        theta: prev.theta,
      }));
    };

    const interval = setInterval(animate, 16); // ~60fps
    return () => clearInterval(interval);
  }, [isAnimating, isDragging, speed, engine]);

  // Update rotation in WebGL engine when rotation state changes
  useEffect(() => {
    if (isReady) {
      setRotation(rotation.phi, rotation.theta);
    }
  }, [rotation, isReady, setRotation]);

  // Update markers when markerArray changes
  useEffect(() => {
    if (isReady && markerArray) {
      setMarkers(markerArray);
    }
  }, [markerArray, isReady, setMarkers]);

  // Update other uniforms when props change
  useEffect(() => {
    if (isReady) {
      updateUniforms({
        dark,
        diffuse,
        mapBrightness,
        scale,
        ...(offset && { offset: [offset.offsetX, offset.offsetY] }),
      });
    }
  }, [dark, diffuse, mapBrightness, scale, offset, isReady, updateUniforms]);

  // Drag handling
  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (!isDraggable) return;

      setIsDragging(true);
      setIsAnimating(false);
      setLastPointer({ x: event.clientX, y: event.clientY });

      if (canvasRef.current) {
        canvasRef.current.setPointerCapture(event.pointerId);
      }
    },
    [isDraggable, canvasRef]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!isDragging || !isDraggable) return;

      const deltaX = event.clientX - lastPointer.x;
      const deltaY = event.clientY - lastPointer.y;

      setRotationState(prev => ({
        phi: prev.phi + deltaX * 0.01,
        theta: Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, prev.theta + deltaY * 0.01)
        ),
      }));

      setLastPointer({ x: event.clientX, y: event.clientY });
    },
    [isDragging, isDraggable, lastPointer]
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      setIsDragging(false);

      if (canvasRef.current) {
        canvasRef.current.releasePointerCapture(event.pointerId);
      }

      // Resume auto-rotation after a delay if it was enabled
      if (!isDraggable) {
        setTimeout(() => setIsAnimating(true), 1000);
      }
    },
    [isDraggable, canvasRef]
  );

  // Container styles
  const containerStyles: React.CSSProperties = {
    width: containerWidth,
    height: containerHeight,
    display: "flex",
    justifyContent: alignment,
    alignItems: "center",
    background,
    position: "relative",
    ...style,
  };

  // Canvas styles
  const canvasStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
    touchAction: "none", // Prevent default touch behaviors
  };

  return (
    <div
      className={`globe-container ${className}`}
      style={containerStyles}
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={canvasStyles}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp} // Handle pointer leaving canvas
      />

      {!isReady && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.1)",
            color: "#666",
            fontSize: "14px",
          }}
        >
          Loading Globe...
        </div>
      )}
    </div>
  );
};

export default Globe;
