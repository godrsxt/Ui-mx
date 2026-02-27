import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ReactNode } from "react";

export default function SpatialWorld({ children }: { children: ReactNode }) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={3} />

      {children}

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
      </EffectComposer>

      <OrbitControls enableZoom={true} makeDefault />
    </Canvas>
  );
}
