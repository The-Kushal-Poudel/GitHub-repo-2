import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function usePointerAndScroll(reducedMotion) {
  const state = useRef({ x: 0, y: 0, scroll: 0 });

  useEffect(() => {
    if (reducedMotion) return undefined;

    const onPointerMove = (event) => {
      state.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      state.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      state.current.scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.2);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  return state;
}

function ParticleField({ reducedMotion }) {
  const points = useRef();

  const positions = useMemo(() => {
    const count = 145;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      array[i3] = (Math.random() - 0.5) * 9;
      array[i3 + 1] = (Math.random() - 0.5) * 5.4;
      array[i3 + 2] = (Math.random() - 0.5) * 3.4 - 1;
    }

    return array;
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !points.current) return;
    points.current.rotation.y += delta * 0.018;
    points.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#8FB8D7"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.18}
        depthWrite={false}
      />
    </points>
  );
}

function CrystalSystem({ reducedMotion }) {
  const group = useRef();
  const crystal = useRef();
  const ringOne = useRef();
  const ringTwo = useRef();
  const motion = usePointerAndScroll(reducedMotion);

  useFrame((state, delta) => {
    if (!group.current || !crystal.current) return;

    if (reducedMotion) {
      crystal.current.rotation.set(0.18, 0.55, -0.08);
      return;
    }

    const { x, y, scroll } = motion.current;
    const t = state.clock.elapsedTime;

    crystal.current.rotation.x = THREE.MathUtils.lerp(
      crystal.current.rotation.x,
      0.22 + y * 0.12 + Math.sin(t * 0.55) * 0.035,
      0.045
    );
    crystal.current.rotation.y += delta * 0.13;
    crystal.current.rotation.z = THREE.MathUtils.lerp(crystal.current.rotation.z, x * -0.08, 0.04);

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.11, 0.035);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.06, 0.035);
    group.current.position.y = Math.sin(t * 0.7) * 0.08 + scroll * 0.24;
    group.current.position.z = -scroll * 0.55;

    if (ringOne.current) ringOne.current.rotation.z += delta * 0.08;
    if (ringTwo.current) ringTwo.current.rotation.x -= delta * 0.055;
  });

  return (
    <group ref={group} position={[0.72, -0.02, -0.28]} scale={1.34}>
      <group ref={crystal}>
        <mesh>
          <icosahedronGeometry args={[1.22, 1]} />
          <meshPhysicalMaterial
            color="#7EA9C5"
            emissive="#6B8FA8"
            emissiveIntensity={0.16}
            roughness={0.22}
            metalness={0.12}
            transmission={0.2}
            transparent
            opacity={0.34}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={1.018}>
          <icosahedronGeometry args={[1.22, 1]} />
          <meshBasicMaterial
            color="#666B72"
            wireframe
            transparent
            opacity={0.16}
            depthWrite={false}
          />
        </mesh>
      </group>

      <mesh ref={ringOne} rotation={[1.18, 0.14, 0.2]}>
        <torusGeometry args={[1.7, 0.008, 8, 180]} />
        <meshBasicMaterial color="#8A87A8" transparent opacity={0.14} depthWrite={false} />
      </mesh>
      <mesh ref={ringTwo} rotation={[0.22, 0.7, 1.3]}>
        <torusGeometry args={[1.95, 0.005, 8, 180]} />
        <meshBasicMaterial color="#B78A7D" transparent opacity={0.12} depthWrite={false} />
      </mesh>

      <mesh position={[1.62, 0.48, 0.18]}>
        <sphereGeometry args={[0.045, 18, 18]} />
        <meshBasicMaterial color="#7EA9C5" />
      </mesh>
      <mesh position={[-1.45, -0.62, 0.08]}>
        <sphereGeometry args={[0.026, 14, 14]} />
        <meshBasicMaterial color="#777B80" />
      </mesh>
    </group>
  );
}

export default function HeroThreeScene({ reducedMotion = false }) {
  return (
    <div className="hero-three-stage" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.2], fov: 43 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 5]} intensity={1.75} color="#E7EEF1" />
        <pointLight position={[-3, -1, 3]} intensity={0.9} color="#8A87A8" />
        <pointLight position={[3, 1, 2]} intensity={0.65} color="#B78A7D" />
        <ParticleField reducedMotion={reducedMotion} />
        <CrystalSystem reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
