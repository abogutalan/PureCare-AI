"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-expect-error
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

// Derive the props type from the Points component
type PointsProps = React.ComponentProps<typeof Points>;

const StarBackground: React.FC<PointsProps> = (props) => {
  // Typed ref
  const ref = useRef<THREE.Points>(null);

  // Typed state
  const [sphere] = useState<Float32Array>(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff" // Corrected from "$fff" to "#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false} // Corrected typo from "dethWrite" to "depthWrite"
        />
      </Points>
    </group>
  );
};

const StarsCanvas: React.FC = () => (
  <div className="w-full h-auto fixed inset-0 z-[20]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
