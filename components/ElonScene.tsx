'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Html, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense, useMemo, useRef, useState } from 'react';
import { Color, Group, MathUtils, Vector2 } from 'three';

function ElonBust() {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetTilt = useRef(0);
  const pointer = useRef(new Vector2());

  useFrame((state, delta) => {
    if (!group.current) return;

    const { x, y } = pointer.current;
    targetTilt.current = MathUtils.lerp(targetTilt.current, hovered ? 0.18 : 0.08, delta * 2.5);

    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, x * 0.8, delta * 1.8);
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, -y * 0.4 + targetTilt.current, delta * 2.2);
    group.current.position.y = MathUtils.lerp(group.current.position.y, hovered ? 0.18 : 0, delta * 5);
  });

  const materials = useMemo(() => {
    const base = new Color('#b4c0ff');
    const accent = new Color('#f9d67d');
    const steel = new Color('#3f4a8a');
    return { base, accent, steel };
  }, []);

  const handlePointerMove = (event: { pointer: Vector2 }) => {
    pointer.current.copy(event.pointer.clone().multiplyScalar(1));
  };

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <mesh position={[0, 0.92, 0]} castShadow>
        <sphereGeometry args={[0.62, 48, 32]} />
        <meshStandardMaterial color={materials.base} roughness={0.35} metalness={0.45} />
      </mesh>

      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.4, 32]} />
        <meshStandardMaterial color={materials.steel} roughness={0.4} metalness={0.6} />
      </mesh>

      <mesh position={[0, -0.35, 0]}>
        <coneGeometry args={[0.95, 0.9, 5]} />
        <meshStandardMaterial color={materials.base} roughness={0.5} metalness={0.3} />
      </mesh>

      <mesh position={[0, -0.82, 0]}>
        <cylinderGeometry args={[0.78, 0.5, 0.7, 32]} />
        <meshStandardMaterial color={materials.steel} roughness={0.6} metalness={0.5} />
      </mesh>

      <mesh position={[0.58, 0.86, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.42, 0.16, 0.1]} />
        <meshStandardMaterial color={materials.accent} emissive={materials.accent.clone().multiplyScalar(0.15)} />
      </mesh>

      <mesh position={[-0.58, 0.86, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.42, 0.16, 0.1]} />
        <meshStandardMaterial color={materials.accent} emissive={materials.accent.clone().multiplyScalar(0.15)} />
      </mesh>

      <mesh position={[0.42, 0.35, 0.44]} rotation={[0, 0, 0.18]}>
        <boxGeometry args={[0.26, 0.12, 0.7]} />
        <meshStandardMaterial color={materials.steel} roughness={0.45} metalness={0.7} />
      </mesh>

      <mesh position={[-0.42, 0.35, 0.44]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.26, 0.12, 0.7]} />
        <meshStandardMaterial color={materials.steel} roughness={0.45} metalness={0.7} />
      </mesh>

      <mesh position={[0, -1.18, 0]}>
        <cylinderGeometry args={[1.2, 1.1, 0.28, 48]} />
        <meshStandardMaterial color={materials.accent} emissive={materials.accent.clone().multiplyScalar(0.05)} />
      </mesh>
    </group>
  );
}

function FloatingLabel() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 1.4) * 0.08 + 1.6;
  });

  return (
    <group ref={ref}>
      <Html center distanceFactor={10} transform occlude>
        <div className="label">
          <p>Elon Musk</p>
          <span>Interactive Tribute</span>
        </div>
      </Html>
    </group>
  );
}

function SceneLights() {
  const { viewport } = useThree();
  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[2.2, 2.6, 2.8]}
        intensity={1.6}
        castShadow
      />
      <spotLight
        position={[-4, 3, -3]}
        angle={Math.PI / 6}
        penumbra={0.6}
        intensity={1.4}
        color={new Color('#88b3ff')}
      />
      <pointLight position={[0, 4, 0]} intensity={viewport.width > 8 ? 0.8 : 0.5} color={new Color('#ffe8b2')} />
    </group>
  );
}

function ElonExperience() {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={[0.02, 0.03, 0.07]} />
      <PerspectiveCamera makeDefault position={[0, 1.4, 4]} fov={45} />
      <SceneLights />
      <Suspense fallback={null}>
        <ElonBust />
        <FloatingLabel />
        <Stars radius={12} count={4500} factor={0.5} fade speed={1} />
        <Environment preset="sunset" />
      </Suspense>
      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} minDistance={2.5} maxDistance={4.8} />
    </Canvas>
  );
}

export default function ElonScene() {
  return <ElonExperience />;
}
