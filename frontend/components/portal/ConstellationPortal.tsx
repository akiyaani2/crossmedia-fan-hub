'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import StarField from './StarField';
import ShootingStars from './ShootingStars';
import '@/styles/portal.css';

export default function ConstellationPortal() {
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    return <div className="portal-fallback-gradient" />;
  }

  return (
    <Canvas
      className="absolute inset-0 -z-10"
      camera={{ position: [0, 0, 12], fov: 60 }}
    >
      <color attach="background" args={['#0e0b24']} />
      <Suspense fallback={null}>
        <StarField />
        <ShootingStars />
      </Suspense>
    </Canvas>
  );
} 