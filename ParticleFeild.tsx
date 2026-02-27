import { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";

export default function ParticleField() {
  const particles = useMemo(() => {
    const positions = new Float32Array(3000);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  return (
    <Points positions={particles}>
      <PointMaterial size={0.03} color="#00ffff" transparent opacity={0.6} />
    </Points>
  );
}
