'use client';
import { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three'; // Added import
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';

const COUNT = 6;
export default function ShootingStars() {
  const stars = useRef<Array<THREE.Mesh>>(Array(COUNT).fill(null!)); // Corrected type

  useLayoutEffect(() => {
    if (stars.current) {
      stars.current.forEach((mesh, i) => {
        if (mesh) { // Check if mesh exists
          const tl = gsap.timeline({ repeat: -1, delay: i * 3 + Math.random() });
          tl.set(mesh.position, { x: () => (Math.random() - 0.5) * 16, y: 7, z: -5 })
            .to(mesh.position, { x: () => (Math.random() - 0.5) * 16, y: -6, z: 5, duration: 2, ease: 'power1.in' });
        }
      });
    }
  }, []);

  useFrame(() => {
    if (stars.current) {
      stars.current.forEach(m => m && (m.rotation.z += 0.2)); // Check if mesh exists
    }
  });

  return (
    <>
      {Array.from({ length: COUNT }).map((_, i) => ( // Use Array.from for mapping
        <mesh key={i} ref={el => (stars.current[i] = el!)} scale={[0.05, 0.05, 0.3]}>
          <boxGeometry />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      ))}
    </>
  );
} 