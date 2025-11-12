

// src/components/GLBModel.jsx
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";


const GLBModel = ({
  url = "/src/assets/video/free_bmw_m3_e30.glb",
  color = "#f0f0f0",
  scale = 1,
  position = [0, -0.8, 0],
}) => {
  const { scene } = useGLTF(url, true);
  const firstRun = useRef(true);

  useEffect(() => {
    // enable shadows and try to apply color to paint-like materials
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;

        // Try to set color for car paint:
        try {
          const mat = obj.material;
          if (!mat) return;

          // Heuristics: material name contains 'paint' or 'body' or has metalness
          const name = (mat.name || "").toLowerCase();
          const isPaintLike =
            name.includes("paint") ||
            name.includes("body") ||
            ("metalness" in mat && mat.metalness >= 0) ||
            name.includes("car");

          if (isPaintLike) {
            mat.color && mat.color.set(color);
            mat.needsUpdate = true;
          }
        } catch (e) {
          // ignore material set errors
        }
      }
    });

    // If the model's scale/position must be corrected only once:
    if (firstRun.current) {
      // Optional: auto-fit scale if model is huge/small (you can tune)
      // firstRun.current = false;
    }
  }, [scene, color]);

  return <primitive object={scene} dispose={null} scale={scale} position={position} />;
};

useGLTF.preload("/src/assets/video/free_bmw_m3_e30.glb");

export default GLBModel;