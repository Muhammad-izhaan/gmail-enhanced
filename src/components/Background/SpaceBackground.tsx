import { Stars, Cloud } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export const SpaceBackground = () => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <>
      <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      <Cloud opacity={0.1} speed={0.4} width={10} depth={1.5} segments={20} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </>
  );
};