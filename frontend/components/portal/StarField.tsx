'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
// Import Points and PointsMaterial instead of LineSegments/LineBasicMaterial
import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import usePortalControls from './usePortalControls';

// Colors mapping to content pillars (Adjust if your theme differs)
// Order: Anime 💜, Comics 💛, Movies/TV 🔵, Games 🟢, Fan-Fic 🔴
const COLORS = ['#b794ff', '#ffdd55', '#4da6ff', '#70ffb0', '#ff4d88'];
const POINT_SIZE = 6; // Define point size constant

export default function StarField() {
  // Change ref type to Points
  const pointsRef = useRef<Points>(null!); 
  const { mouse } = usePortalControls();

  const geometryRef = useRef<BufferGeometry>(null!); 

  // Generate positions, colors, and sizes for points
  const { positions, colors, sizes } = useMemo(() => {
    const posArray: number[] = [];
    const colArray: number[] = [];
    const sizeArray: number[] = []; // Array for point sizes
    const numPoints = 160; // Changed variable name for clarity
    const positionRange = 20;
    const depthRange = 10;

    for (let i = 0; i < numPoints; i++) {
      // Single point position
      const x = (Math.random() - 0.5) * positionRange;
      const y = (Math.random() - 0.5) * positionRange * 0.6;
      const z = (Math.random() - 0.5) * depthRange;
      posArray.push(x, y, z);

      // Assign brighter color
      const colorIndex = i % COLORS.length;
      const baseColor = new THREE.Color(COLORS[colorIndex]);
      const brightColor = baseColor.clone().multiplyScalar(1.8); // Brighten color
      colArray.push(brightColor.r, brightColor.g, brightColor.b); // Push bright RGB

      // Add size for this point
      sizeArray.push(POINT_SIZE);
    }
    return {
      positions: new Float32BufferAttribute(posArray, 3),
      colors: new Float32BufferAttribute(colArray, 3),
      sizes: new Float32BufferAttribute(sizeArray, 1) // Size attribute
    };
  }, []);

  // Set attributes on the geometry
  useMemo(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', positions);
      geometryRef.current.setAttribute('color', colors);
      geometryRef.current.setAttribute('size', sizes); // Set size attribute
    }
  }, [positions, colors, sizes]);

  // Animation loop (applies to Points object now)
  useFrame(({ clock }) => {
    if (pointsRef.current) { 
      pointsRef.current.rotation.y = clock.elapsedTime * 0.05 + mouse.current[0] * 0.4;
      pointsRef.current.rotation.x = 0.1 + mouse.current[1] * 0.4;
    }
  });

  // Return Points object with PointsMaterial
  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial 
        vertexColors 
        size={POINT_SIZE} 
        sizeAttenuation // Points get smaller further away
        transparent
        opacity={0.9} // Slightly increase opacity for better visibility
      />
    </points>
  );
} 