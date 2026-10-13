"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ============================================================================
   Scroll-linked 3D scene (react-three-fiber).
   The core mesh rotates with scrollProgress, and a shell of shards "explodes"
   outward as progress approaches 1 — the studio inspector's cameraAngle feeds
   the base tilt so the panel and the canvas never disagree.
   ========================================================================== */

interface SceneProps {
  /** 0 → 1 scroll progress through the pinned section. */
  progress: number;
  /** Base tilt in degrees from the studio inspector. */
  cameraAngle?: number;
  accent?: string;
}

function Core({ progress, cameraAngle = 24 }: SceneProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Group>(null);
  const shardsRef = useRef<THREE.Group>(null);

  const shards = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / 26);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        return {
          pos: [
            Math.sin(phi) * Math.cos(theta) * 2.1,
            Math.sin(phi) * Math.sin(theta) * 2.1,
            Math.cos(phi) * 2.1,
          ] as [number, number, number],
          rot: [theta * 0.6, phi * 0.9, theta * 0.3] as [number, number, number],
          scale: 0.06 + (i % 5) * 0.022,
        };
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const tilt = (cameraAngle * Math.PI) / 180;

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.25 + progress * Math.PI * 2.2;
      coreRef.current.rotation.x = tilt * 0.5 + progress * 0.9;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = -t * 0.12 - progress * Math.PI * 1.4;
      shellRef.current.rotation.z = progress * 0.6;
    }
    if (shardsRef.current) {
      // Explosion: 0 at top of section → 1.8× radius at the bottom.
      const spread = 1 + progress * 1.8;
      shardsRef.current.scale.setScalar(spread);
      shardsRef.current.rotation.y = progress * Math.PI;
      shardsRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.004 * (i % 3);
        child.rotation.y += 0.003 * (i % 4);
      });
    }
  });

  return (
    <group position={[0.6, 0, 0]}>
      {/* Inner distorted core */}
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.32, 4]} />
          <MeshDistortMaterial
            color="#6366F1"
            emissive="#4338CA"
            emissiveIntensity={0.55}
            roughness={0.18}
            metalness={0.72}
            distort={0.34}
            speed={1.5}
          />
        </mesh>
      </Float>

      {/* Wireframe shell */}
      <mesh ref={shellRef} scale={1.62}>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.32} />
      </mesh>

      {/* Exploding shards */}
      <group ref={shardsRef}>
        {shards.map((s, i) => (
          <mesh key={i} position={s.pos} rotation={s.rot} scale={s.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#10B981" : i % 3 === 1 ? "#6366F1" : "#8B5CF6"}
              emissive={i % 3 === 0 ? "#10B981" : "#6366F1"}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Starfield({ progress }: { progress: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(1400 * 3);
    for (let i = 0; i < 1400; i++) {
      const r = 6 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03 + progress * 0.8;
      ref.current.rotation.x = progress * 0.3;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#9CA3AF"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

export default function ThreeScene({ progress, cameraAngle = 24 }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.85]}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} color="#C7D2FE" />
      <pointLight position={[-6, -3, -4]} intensity={22} color="#8B5CF6" distance={20} />
      <pointLight position={[6, -4, 2]} intensity={16} color="#10B981" distance={18} />
      <Core progress={progress} cameraAngle={cameraAngle} />
      <Starfield progress={progress} />
      <fog attach="fog" args={["#0A0B0E", 9, 24]} />
    </Canvas>
  );
}
