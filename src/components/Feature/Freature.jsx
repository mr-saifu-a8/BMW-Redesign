// // Feature.jsx
// import React, { Suspense, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   OrbitControls,
//   Environment,
//   ContactShadows,
//   Html,
// } from "@react-three/drei";
// import GLBModel from "./GLBModel"; // see notes below for GLBModel behavior

// const models = [
//   { name: "RX450h “version L” 2WD", price: "7,025,000" },
//   { name: "RX450h “version L” AWD", price: "7,285,000" },
//   { name: "RX450h “F SPORT” 2WD", price: "7,165,000" },
//   { name: "RX450h “F SPORT” AWD", price: "7,425,000" },
//   { name: "RX450h 2WD", price: "6,025,000" },
//   { name: "RX450h AWD", price: "6,285,000" },
// ];

// const colors = [
//   { id: 1, code: "#f0f0f0", name: "Platinum White Pearl" },
//   { id: 2, code: "#a0a0a0", name: "Sonic Titanium" },
//   { id: 3, code: "#4a4a4a", name: "Black" },
//   { id: 4, code: "#882d2d", name: "Red Mica" },
//   { id: 5, code: "#2d6d88", name: "Deep Blue Mica" },
// ];

// const Feature = () => {
//   const [selectedColor, setSelectedColor] = useState(colors[0].code);
//   const [selectedModel, setSelectedModel] = useState(models[0].name);

//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       <div className="grid grid-cols-3 gap-8 items-start">
//         <div className="col-span-2 pr-6">
//           <div className="flex justify-between items-end mb-6">
//             <div className="text-gray-600">
//               <p className="absolute left-20 text-3xl font-['poly']">
//                 360° VIEW
//               </p>
//             </div>
//           </div>

//           <div className="relative" style={{ height: 420 }}>
//             <Canvas
//               shadows
//               // Reduced renderer weight & render-on-demand
//               frameloop="demand"
//               dpr={[1, 1.4]}
//               gl={{ antialias: false, powerPreference: "high-performance" }}
//               camera={{ position: [0, 1.2, 3], fov: 40 }}
//               style={{ width: "100%", height: "100%" }}
//             >
//               <ambientLight intensity={0.5} />
//               {/* Lower shadow-map to reduce cost */}
//               <directionalLight
//                 castShadow
//                 intensity={0.9}
//                 position={[5, 8, 5]}
//                 shadow-mapSize-width={1024}
//                 shadow-mapSize-height={1024}
//               />

//               {/* Lighter-weight environment (studio preset is OK) */}
//               <Environment preset="studio" background={false} />

//               <Suspense fallback={<Html center>Loading 3D Model...</Html>}>
//                 <GLBModel
//                   url="/src/assets/video/free_bmw_m3_e30.glb"
//                   color={selectedColor} // GLBModel should mutate material.color (see notes)
//                   scale={1.7}
//                   position={[0, -0.8, 0]}
//                 />
//                 {/* Make shadows cheaper */}
//                 <ContactShadows
//                   opacity={0.5}
//                   blur={1.5}
//                   far={1}
//                   position={[0, -0.9, 0]}
//                 />
//               </Suspense>

//               {/* Controls optimized: only invalidate canvas when user interacts */}
//               <Controls />
//             </Canvas>

//             {/* Color selector overlay */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white/20 backdrop-blur-sm px-4 rounded-full border">
//               <div className="text-sm font-medium mr-3">色を選ぶ</div>
//               <div className="flex items-center space-x-3">
//                 {colors.map((c) => (
//                   <button
//                     key={c.id}
//                     onClick={() => setSelectedColor(c.code)}
//                     title={c.name}
//                     className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition`}
//                     style={{
//                       backgroundColor: c.code,
//                       borderColor: selectedColor === c.code ? "#111" : "#ddd",
//                       boxShadow:
//                         selectedColor === c.code
//                           ? "0 0 0 4px rgba(0,0,0,0.06)"
//                           : "none",
//                     }}
//                   />
//                 ))}
//               </div>

//               <div className="ml-4 text-sm font-semibold">
//                 {colors.find((c) => c.code === selectedColor)?.name}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-2xl text-black font-light ">
//             モデルを選ぶ (Select Model)
//           </h3>

//           <ul className="space-y-2.5">
//             {models.map((model, idx) => {
//               const active = selectedModel === model.name;
//               return (
//                 <li
//                   key={idx}
//                   onClick={() => setSelectedModel(model.name)}
//                   className={`flex justify-between items-center text-sm p-3 border-b cursor-pointer transition ${
//                     active
//                       ? "bg-black text-white"
//                       : "bg-white text-gray-800 hover:bg-gray-50"
//                   }`}
//                 >
//                   <span className={`font-medium ${active ? "font-bold" : ""}`}>
//                     {model.name}
//                   </span>
//                   <span
//                     className={`text-right whitespace-nowrap text-lg ${
//                       active ? "font-bold" : "font-semibold"
//                     }`}
//                   >
//                     {model.price}
//                     <span className="text-xs ml-1">円</span>
//                   </span>
//                 </li>
//               );
//             })}
//           </ul>

//           <div className="mt-6 text-xs text-gray-500">
//             <p>
//               ※上記価格は消費税込みのメーカー希望小売価格で、保険料、税金（除く消費税）、登録等に伴う費用、リサイクル料金は含まれておりません。
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feature;

// /* Controls.jsx — small helper inside same file or separate file */
// import { useThree } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import React, { useRef, useEffect } from "react";

// export function Controls() {
//   const controlsRef = useRef();
//   const { invalidate, gl } = useThree();

//   useEffect(() => {
//     const controls = controlsRef.current;
//     if (!controls) return;

//     // re-render while interacting, otherwise render only on demand
//     const onStart = () => {
//       // switch to continuous render while dragging for smoothness
//       gl.setAnimationLoop(() => {
//         invalidate();
//       });
//     };
//     const onEnd = () => {
//       // stop continuous loop, go back to demand mode
//       gl.setAnimationLoop(null);
//       invalidate(); // final frame
//     };

//     controls.addEventListener("start", onStart);
//     controls.addEventListener("end", onEnd);
//     controls.addEventListener("change", invalidate); // ensure one-frame updates on minor moves

//     return () => {
//       controls.removeEventListener("start", onStart);
//       controls.removeEventListener("end", onEnd);
//       controls.removeEventListener("change", invalidate);
//       gl.setAnimationLoop(null);
//     };
//   }, [invalidate, gl]);

//   return (
//     <OrbitControls
//       ref={controlsRef}
//       enablePan={false}
//       enableDamping
//       dampingFactor={0.08}
//       rotateSpeed={0.6}
//       minDistance={1.5}
//       maxDistance={8}
//       makeDefault
//     />
//   );
// }





import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import GLBModel from "./GLBModel";

const models = [
  { name: "RX450h “version L” 2WD", price: "7,025,000" },
  { name: "RX450h “version L” AWD", price: "7,285,000" },
  { name: "RX450h “F SPORT” 2WD", price: "7,165,000" },
  { name: "RX450h “F SPORT” AWD", price: "7,425,000" },
  { name: "RX450h 2WD", price: "6,025,000" },
  { name: "RX450h AWD", price: "6,285,000" },
];

const colors = [
  { id: 1, code: "#f0f0f0", name: "Platinum White Pearl" },
  { id: 2, code: "#a0a0a0", name: "Sonic Titanium" },
  { id: 3, code: "#4a4a4a", name: "Black" },
  { id: 4, code: "#882d2d", name: "Red Mica" },
  { id: 5, code: "#2d6d88", name: "Deep Blue Mica" },
];

const Feature = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0].code);
  const [selectedModel, setSelectedModel] = useState(models[0].name);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-3 gap-8 items-start">
        {/* LEFT: 2-column area for title + 3D view */}
        <div className="col-span-2 pr-6">
          <div className="flex justify-between items-end mb-6">
           
            <div className="text-gray-600">
              <p className="absolute left-20 text-3xl font-['poly']">
                360° VIEW
              </p>
            </div>
          </div>

          {/* 3D Canvas area */}
          <div className="relative" style={{ height: 420 }}>
            <Canvas
              shadows
              camera={{ position: [0, 1.2, 3], fov: 40 }}
              style={{ width: "100%", height: "100%" }}
            >
              {/* Lights */}
              <ambientLight intensity={0.6} />
              <directionalLight
                castShadow
                intensity={1}
                position={[5, 10, 5]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />

              {/* Environment */}
              <Environment preset="studio" />

              <Suspense fallback={<Html center>Loading 3D Model...</Html>}>
                {/* Pass selectedColor so GLBModel will try to set paint color */}
                <GLBModel
                  url="/src/assets/video/free_bmw_m3_e30.glb"
                  color={selectedColor}
                  scale={1.7}
                  position={[0, -0.8, 0]}
                />
                <ContactShadows
                  opacity={0.6}
                  blur={2}
                  far={1.5}
                  position={[0, -0.9, 0]}
                />
              </Suspense>

              {/* Controls: drag rotate & scroll zoom */}
              <OrbitControls
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.08}
                rotateSpeed={0.6}
                minDistance={1.5}
                maxDistance={8}
              />
            </Canvas>

            {/* Color selector (overlay bottom center like screenshot) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white/20 backdrop-blur-sm px-4 rounded-full border">
              <div className="text-sm font-medium mr-3">色を選ぶ</div>
              <div className="flex items-center space-x-3">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.code)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition`}
                    style={{
                      backgroundColor: c.code,
                      borderColor: selectedColor === c.code ? "#111" : "#ddd",
                      boxShadow:
                        selectedColor === c.code
                          ? "0 0 0 4px rgba(0,0,0,0.06)"
                          : "none",
                    }}
                  />
                ))}
              </div>

              <div className="ml-4 text-sm font-semibold">
                {colors.find((c) => c.code === selectedColor)?.name}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: model list and price */}
        <div className="">
          <h3 className="text-2xl text-black font-light ">
            モデルを選ぶ (Select Model)
          </h3>

          <ul className="space-y-2.5">
            {models.map((model, idx) => {
              const active = selectedModel === model.name;
              return (
                <li
                  key={idx}
                  onClick={() => setSelectedModel(model.name)}
                  className={`flex justify-between items-center text-sm p-3 border-b cursor-pointer transition ${
                    active
                      ? "bg-black text-white"
                      : "bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span className={`font-medium ${active ? "font-bold" : ""}`}>
                    {model.name}
                  </span>
                  <span
                    className={`text-right whitespace-nowrap text-lg ${
                      active ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {model.price}
                    <span className="text-xs ml-1">円</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 text-xs text-gray-500">
            <p>
              ※上記価格は消費税込みのメーカー希望小売価格で、保険料、税金（除く消費税）、登録等に伴う費用、リサイクル料金は含まれておりません。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
