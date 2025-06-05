'use client';

import { useEffect, useRef } from 'react';

export default function usePortalControls() {
  // Initialize useRef with the correct type for mouse coordinates
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handle = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      mouse.current = [
        (clientX / window.innerWidth - 0.5),
        (clientY / window.innerHeight - 0.5)
      ];
    };

    // Check if window is defined before adding listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('pointermove', handle as EventListener);
      window.addEventListener('touchmove', handle as EventListener);

      // Cleanup function to remove the event listeners
      return () => {
        window.removeEventListener('pointermove', handle as EventListener);
        window.removeEventListener('touchmove', handle as EventListener);
      };
    }
  }, []); // Empty dependency array ensures this runs only once on mount/unmount

  // Return the ref containing the mouse coordinates
  return { mouse };
} 