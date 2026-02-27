import { useState } from "react";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import SpatialWorld from "./world/SpatialWorld";
import ParticleField from "./components/ParticleField";
import HoloVideo from "./components/HoloVideo";

export default function App() {
  const [mediaUris, setMediaUris] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);

  const scanAndroidStorage = async () => {
    setScanning(true);
    try {
      // Request permissions and scan the Android Movies directory
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents, // Change to Directory.Data or Movies based on where files are
      });

      const videoFiles = result.files
        .filter(file => file.name.endsWith('.mp4'))
        .map(file => Capacitor.convertFileSrc(file.uri));

      setMediaUris(videoFiles);
    } catch (error) {
      console.error("Native scan failed:", error);
    }
    setScanning(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SpatialWorld>
        <ParticleField />
        
        {mediaUris.length === 0 ? (
          <mesh position={[0, 0, 0]} onClick={scanAndroidStorage}>
            <boxGeometry args={[4, 1, 0.2]} />
            <meshStandardMaterial color={scanning ? "#ff00ff" : "#00ffff"} emissive={scanning ? "#ff00ff" : "#00ffff"} emissiveIntensity={2} />
          </mesh>
        ) : (
          <group>
            {mediaUris.map((uri, index) => (
              <HoloVideo key={index} src={uri} position={[-4 + (index * 5), 0, -2]} />
            ))}
          </group>
        )}
      </SpatialWorld>
    </div>
  );
}
