import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { Email } from '../../types/email';
import { useFrame } from '@react-three/fiber';

interface EmailCardProps {
  email: Email;
  position: [number, number, number];
  onClick: () => void;
}

export const EmailCard = ({ email, position, onClick }: EmailCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [springs, api] = useSpring(() => ({
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = meshRef.current.rotation.y += 0.001;
    }
  });

  const handlePointerOver = () => {
    api.start({
      scale: [1.1, 1.1, 1.1],
      rotation: [0, Math.PI / 12, 0],
    });
  };

  const handlePointerOut = () => {
    api.start({
      scale: [1, 1, 1],
      rotation: [0, 0, 0],
    });
  };

  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      {...springs}
    >
      <boxGeometry args={[4, 2, 0.1]} />
      <meshPhongMaterial color={email.read ? "#2a2a2a" : "#1a73e8"} />
      <Text
        position={[0, 0.5, 0.06]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {email.subject}
      </Text>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {email.from}
      </Text>
    </animated.mesh>
  );
};