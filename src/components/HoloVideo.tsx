import { Html } from "@react-three/drei";
import { useRef } from "react";

export default function HoloVideo({ src, position }: { src: string, position: [number, number, number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <mesh position={position}>
      <boxGeometry args={[5, 3, 0.1]} />
      <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} transparent opacity={0.25} />

      <Html transform distanceFactor={4} position={[0, 0, 0.06]}>
        <video
          ref={videoRef}
          src={src}
          controls
          style={{ width: "450px", border: "2px solid #00ffff", borderRadius: "8px" }}
        />
      </Html>
    </mesh>
  );
}
