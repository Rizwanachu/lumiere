import React, { useRef, Suspense, useMemo, Component, ReactNode, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/* ─── WebGL availability check ───────────────────────────── */
function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      (canvas.getContext as (id: string) => RenderingContext | null)('experimental-webgl')
    );
  } catch {
    return false;
  }
}

/* ─── Error Boundary ─────────────────────────────────────── */
class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}

/* ─── Gold ring band ─────────────────────────────────────── */
function RingBand() {
  return (
    <mesh castShadow>
      <torusGeometry args={[1, 0.13, 48, 200]} />
      <meshPhysicalMaterial
        color="#C9A96E"
        metalness={1}
        roughness={0.09}
        reflectivity={1}
        envMapIntensity={2.5}
      />
    </mesh>
  );
}

/* ─── 4 claw prongs ──────────────────────────────────────── */
function Prongs() {
  return (
    <>
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh
            key={deg}
            position={[Math.sin(rad) * 0.3, 0.2, Math.cos(rad) * 0.3]}
            rotation={[0.2, rad, 0]}
          >
            <cylinderGeometry args={[0.022, 0.016, 0.44, 8]} />
            <meshPhysicalMaterial color="#C9A96E" metalness={1} roughness={0.1} envMapIntensity={2} />
          </mesh>
        );
      })}
    </>
  );
}

/* ─── Diamond gem (octahedron = brilliant-cut silhouette) ── */
function DiamondGem() {
  const gemRef = useRef<THREE.Mesh>(null);

  // Flatten the octahedron slightly to look like a cut stone
  const geometry = useMemo(() => {
    const g = new THREE.OctahedronGeometry(0.38, 1);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      // compress bottom pavilion more than the crown
      pos.setY(i, y > 0 ? y * 0.65 : y * 1.1);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (gemRef.current) {
      gemRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={gemRef} geometry={geometry} position={[0, 0.5, 0]} castShadow>
      <meshPhysicalMaterial
        color="#e8f0ff"
        metalness={0}
        roughness={0}
        transmission={0.92}
        thickness={0.6}
        ior={2.42}
        reflectivity={1}
        envMapIntensity={4}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

/* ─── Tiny accent gems around band ──────────────────────── */
function BandAccents() {
  return (
    <>
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(angle), 0, Math.cos(angle)]} scale={0.042}>
            <octahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color="#d0e8ff"
              metalness={0}
              roughness={0}
              transmission={0.85}
              thickness={0.3}
              ior={2.42}
              envMapIntensity={3}
            />
          </mesh>
        );
      })}
    </>
  );
}

/* ─── Animated ring group with mouse parallax ───────────── */
function JewelGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.22;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.18 + 0.2,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -mouse.x * 0.08,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      <RingBand />
      <BandAccents />
      <Prongs />
      <DiamondGem />
    </group>
  );
}

/* ─── Three.js scene contents ────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
      <pointLight position={[-5, 4, -4]} intensity={1.2} color="#C9A96E" />
      <pointLight position={[4, -3, 4]} intensity={0.6} color="#7090ff" />

      <Environment preset="studio" />

      <Float speed={1.3} rotationIntensity={0} floatIntensity={0.55}>
        <JewelGroup />
      </Float>

      <Sparkles count={90} scale={7} size={1.6} speed={0.3} opacity={0.55} color="#C9A96E" />
      <Sparkles count={45} scale={5} size={0.7} speed={0.5} opacity={0.35} color="#ffffff" />

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.3}
        scale={8}
        blur={2.5}
        far={10}
        color="#8B6914"
      />
    </>
  );
}

/* ─── Public export ──────────────────────────────────────── */
export function Jewelry3D({
  className = '',
  fallback,
}: {
  className?: string;
  fallback?: ReactNode;
}) {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglOk(detectWebGL());
  }, []);

  // Still detecting
  if (webglOk === null) return null;

  // No WebGL — show fallback
  if (!webglOk) return <>{fallback}</>;

  return (
    <WebGLBoundary fallback={fallback ?? null}>
      <div className={className}>
        <Canvas
          camera={{ position: [0, 0.5, 4.5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          shadows
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </WebGLBoundary>
  );
}
