
// import { useState, useEffect } from "react";
// import { AnimatePresence } from "framer-motion";
// import Loader from "./components/Loader";
// import Home from "./components/Home";

// export default function App() {
//   const [loading, setLoading] = useState(true);

//   // Safety fallback if loader somehow stuck or video fails completely
//   useEffect(() => {
//     const fallback = setTimeout(() => setLoading(false), 6900); // 10s safety net
//     return () => clearTimeout(fallback);
//   }, []);

//   // Assets we want preloaded before showing Home (hero poster / bg)
//   const assets = [
//     "/src/assets/images/hero-poster.jpg", // replace with your hero image path
//     "/src/assets/images/hero-thumb.jpg",
//   ];

//   return (
//     // <AnimatePresence mode="wait">
//     //   {loading ? (
//     //     <Loader
//     //       key="loader"
//     //       assetsToPreload={assets}
//     //       maxWait={900} // quick cap for preloading
//     //       onFinish={() => {
//     //         setLoading(false);
//     //       }}
//     //     />
//     //   ) : (
//     //     <Home key="home" />
//     //   )}
//     // </AnimatePresence>

//     <div>
//       <Home/>
//     </div>
//   );
// }



// import React, { useRef, useEffect, useCallback } from "react";
// import * as THREE from "three";

// const vertexShader = `
//     varying vec2 vUv;
    
//     void main() {
//         vUv = uv; 
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
//     }
// `;

// // Fluid Fragment Shader
// const fluidFragmentShader = `
//     uniform sampler2D uPrevTrails;
//     uniform vec2 uMouse;
//     uniform vec2 uPrevMouse;
//     uniform vec2 uResolution;
//     uniform float uDecay;
//     uniform bool uIsMoving;

//     varying vec2 vUv;

//     void main() {
//         vec4 prevState = texture2D(uPrevTrails, vUv);
//         float newValue = prevState.r * uDecay; 
        
//         if (uIsMoving) {
//             vec2 mouseDirection = uMouse - uPrevMouse;
//             float lineLength = length(mouseDirection);

//             if (lineLength > 0.001) {
//                 vec2 mouseDir = mouseDirection / lineLength;

//                 vec2 toPixel = vUv - uPrevMouse; 
//                 float projAlong = dot(toPixel, mouseDir);
//                 projAlong = clamp(projAlong, 0.0, lineLength);
                
//                 vec2 closestPoint = uPrevMouse + projAlong * mouseDir;
//                 float dist = length(vUv - closestPoint);
                
//                 float lineWidth = 0.09;
//                 float intensity = smoothstep(lineWidth, 0.0, dist) * 0.3; 
                
//                 newValue += intensity;
//             }
//         }
        
//         gl_FragColor = vec4(newValue, 0.0, 0.0, 1.0); 
//     }
// `;

// // Display Fragment Shader
// const displayFragmentShader = `
//     uniform sampler2D uFluid;
//     uniform sampler2D uTopTexture;
//     uniform sampler2D uBottomTexture;
//     uniform vec2 uResolution;
//     uniform float uDpr; 
//     uniform vec2 uTopTextureSize;
//     uniform vec2 uBottomTextureSize;

//     varying vec2 vUv;

//     // Custom function to handle texture aspect ratio and scaling (background-cover)
//     vec2 getCoverUV(vec2 uv, vec2 textureSize) {
//         if (textureSize.x < 1.0 || textureSize.y < 1.0) return uv; 
        
//         vec2 s = uResolution / textureSize;
//         float scale = max(s.x, s.y); 
        
//         vec2 scaledSize = textureSize * scale;
//         vec2 offset = (uResolution - scaledSize) * 0.5;
        
//         return (uv * uResolution - offset) / scaledSize;
//     }

//     void main() {
//         float fluid = texture2D(uFluid, vUv).r;
        
//         vec2 topUV = getCoverUV(vUv, uTopTextureSize);
//         vec2 bottomUV = getCoverUV(vUv, uBottomTextureSize);
        
//         vec4 topColor = texture2D(uTopTexture, topUV);
//         vec4 bottomColor = texture2D(uBottomTexture, bottomUV);
        
//         float threshold = 0.02; 
//         float edgeWidth = 0.004 / uDpr; 
        
//         float t = smoothstep(threshold, threshold + edgeWidth, fluid);
        
//         vec4 finalColor = mix(topColor, bottomColor, t);
        
//         gl_FragColor = finalColor;
//     }
// `;

// // =======================================================================
// // 2. HEADER COMPONENT (Originally from src/components/Header.jsx)
// // =======================================================================
// const Header = ({ fontRighteous }) => {
//   return (
//     // Navigation Bar (fixed)
//     <nav className="fixed top-0 w-full px-2 flex justify-between items-start z-20">
//      <div className="w-full h-15 flex p-10 items-center justify-between">
//            <div className="w-13 h-13">
//              <img className="w-full h-full" src="/src/assets/BMW.png" alt="" />
//            </div>
//            <div>
//              <ul className='flex font-["poly"] gap-15'>
//                <li>Home</li>
//                <li>Models</li>
//                <li>Electric</li>
//                <li>Innovation</li>
//                <li>Contact</li>
//              </ul>
//            </div>
//            <div>
//              <button className="bg-red-600 flex items-center justify-center gap-3 text-white px-6 p-2 rounded-sm">
//                Test Drive
//              {/* <IoCarSport size={22} /> */}
//              </button>
//            </div>
//          </div>
//     </nav>
//   );
// };

// // =======================================================================
// // 3. FOOTER COMPONENT (Originally from src/components/Footer.jsx)
// // =======================================================================
// const Footer = () => {
//   return (
//     // Footer-like Element (fixed)
//     <div className="fixed bottom-0 w-full p-8 flex justify-between items-end z-20">
//       <p className="text-white text-xs font-semibold tracking-wider">Explore</p>
//       <p className="text-white text-xs font-semibold tracking-wider">
//         Scroll Down
//       </p>
//     </div>
//   );
// };

// // =======================================================================
// // 4. FLUID HERO COMPONENT (Originally from src/components/FluidHero.jsx)
// // Uses the local shader constants defined above.
// // =======================================================================

// // Global WebGL state variables
// const size = 500;
// const pingPongTargets = [
//   new THREE.WebGLRenderTarget(size, size, {
//     minFilter: THREE.LinearFilter,
//     magFilter: THREE.LinearFilter,
//     format: THREE.RGBAFormat,
//     type: THREE.FloatType,
//   }),
//   new THREE.WebGLRenderTarget(size, size, {
//     minFilter: THREE.LinearFilter,
//     magFilter: THREE.LinearFilter,
//     format: THREE.RGBAFormat,
//     type: THREE.FloatType,
//   }),
// ];
// let currentTarget = 0;

// // Utility function to create placeholder textures
// const createPlaceholderTexture = (color) => {
//   const canvas = document.createElement("canvas");
//   canvas.width = 512;
//   canvas.height = 512;
//   const ctx = canvas.getContext("2d");
//   ctx.fillStyle = color;
//   ctx.fillRect(0, 0, 512, 512);
//   const texture = new THREE.CanvasTexture(canvas);
//   texture.minFilter = THREE.LinearFilter;
//   return texture;
// };
// const topTexture = createPlaceholderTexture("#0000ff"); // Blue Placeholder
// const bottomTexture = createPlaceholderTexture("#ff0000"); // Red Placeholder

// const FluidHero = ({ topImagePath, bottomImagePath }) => {
//   const canvasRef = useRef(null);
//   const uniformsRef = useRef({});

//   // Mouse state for uniforms
//   const mouse = useRef(new THREE.Vector2(0.5, 0.5));
//   const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));
//   const isMoving = useRef(false);
//   const lastMoveTime = useRef(0);

//   const topTextureSize = useRef(new THREE.Vector2(1, 1));
//   const bottomTextureSize = useRef(new THREE.Vector2(1, 1));

//   // Image Loading Logic
//   const loadImage = useCallback((url, textureSizeVector) => {
//     if (!url) return;
//     const img = new Image();
//     img.crossOrigin = "Anonymous";

//     img.onload = function () {
//       const originalWidth = img.width;
//       const originalHeight = img.height;
//       textureSizeVector.current.set(originalWidth, originalHeight);

//       const maxSize = 4096;
//       let newWidth = originalWidth;
//       let newHeight = originalHeight;

//       if (originalWidth > maxSize || originalHeight > maxSize) {
//         if (originalWidth > originalHeight) {
//           newWidth = maxSize;
//           newHeight = Math.floor(originalHeight * (maxSize / originalWidth));
//         } else {
//           newHeight = maxSize;
//           newWidth = Math.floor(originalWidth * (maxSize / originalHeight));
//         }
//       }

//       const canvas = document.createElement("canvas");
//       canvas.width = newWidth;
//       canvas.height = newHeight;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, newWidth, newHeight);

//       const newTexture = new THREE.CanvasTexture(canvas);
//       newTexture.minFilter = THREE.LinearFilter;
//       newTexture.magFilter = THREE.LinearFilter;

//       if (url.includes("top")) {
//         if (uniformsRef.current.display)
//           uniformsRef.current.display.uTopTexture.value = newTexture;
//       } else {
//         if (uniformsRef.current.display)
//           uniformsRef.current.display.uBottomTexture.value = newTexture;
//       }
//     };

//     img.onerror = (err) => {
//       console.error(`Error loading image ${url}:`, err);
//     };

//     img.src = url;
//   }, []);

//   // Animation Loop
//   const animate = useCallback((renderer, scene, simScene, camera) => {
//     if (!uniformsRef.current.trails || !uniformsRef.current.display) return;

//     // Time-based isMoving reset logic
//     if (isMoving.current && performance.now() - lastMoveTime.current > 50) {
//       isMoving.current = false;
//     }

//     // Ping-Pong Logic
//     const prevTarget = pingPongTargets[currentTarget];
//     currentTarget = (currentTarget + 1) % 2;
//     const currentRenderTarget = pingPongTargets[currentTarget];

//     // 1. Trail Simulation Update
//     uniformsRef.current.trails.uPrevTrails.value = prevTarget.texture;
//     uniformsRef.current.trails.uMouse.value.copy(mouse.current);
//     uniformsRef.current.trails.uPrevMouse.value.copy(prevMouse.current);
//     uniformsRef.current.trails.uIsMoving.value = isMoving.current;

//     renderer.setRenderTarget(currentRenderTarget);
//     renderer.render(simScene, camera);

//     // Update previous mouse position for the next frame
//     prevMouse.current.copy(mouse.current);

//     // 2. Display Render (To screen)
//     uniformsRef.current.display.uFluid.value = currentRenderTarget.texture;

//     renderer.setRenderTarget(null);
//     renderer.render(scene, camera);

//     // Request next frame
//     uniformsRef.current.rafId = requestAnimationFrame(() =>
//       animate(renderer, scene, simScene, camera)
//     );
//   }, []);

//   // Effect for Initialization (runs once)
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     // Renderer Setup
//     const renderer = new THREE.WebGLRenderer({
//       canvas,
//       antialias: true,
//       precision: "highp",
//     });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     const scene = new THREE.Scene();
//     const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

//     // Trails Material Setup (uses local shader constants)
//     const trailsMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         uPrevTrails: { value: null },
//         uMouse: { value: mouse.current },
//         uPrevMouse: { value: prevMouse.current },
//         uResolution: { value: new THREE.Vector2(size, size) },
//         uDecay: { value: 0.97 },
//         uIsMoving: { value: false },
//       },
//       vertexShader,
//       fragmentShader: fluidFragmentShader,
//     });

//     // Display Material Setup (uses local shader constants)
//     const displayMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         uFluid: { value: null },
//         uTopTexture: { value: topTexture },
//         uBottomTexture: { value: bottomTexture },
//         uResolution: {
//           value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//         },
//         uDpr: { value: window.devicePixelRatio },
//         uTopTextureSize: { value: topTextureSize.current },
//         uBottomTextureSize: { value: bottomTextureSize.current },
//       },
//       vertexShader,
//       fragmentShader: displayFragmentShader,
//     });

//     // Store uniforms for access in animate loop
//     uniformsRef.current = {
//       trails: trailsMaterial.uniforms,
//       display: displayMaterial.uniforms,
//     };

//     // Load Images
//     loadImage(topImagePath, topTextureSize);
//     loadImage(bottomImagePath, bottomTextureSize);

//     // Meshes
//     const planeGeometry = new THREE.PlaneGeometry(2, 2);
//     const displayMesh = new THREE.Mesh(planeGeometry, displayMaterial);
//     scene.add(displayMesh);

//     const simMesh = new THREE.Mesh(planeGeometry, trailsMaterial);
//     const simScene = new THREE.Scene();
//     simScene.add(simMesh);

//     // Initial Clear
//     renderer.setRenderTarget(pingPongTargets[0]);
//     renderer.clear();
//     renderer.setRenderTarget(pingPongTargets[1]);
//     renderer.clear();
//     renderer.setRenderTarget(null);

//     // Event Handler Setup
//     const onMouseMove = (event) => {
//       const canvasRect = canvas.getBoundingClientRect();
//       if (
//         event.clientX >= canvasRect.left &&
//         event.clientX <= canvasRect.right &&
//         event.clientY >= canvasRect.top &&
//         event.clientY <= canvasRect.bottom
//       ) {
//         mouse.current.x = (event.clientX - canvasRect.left) / canvasRect.width;
//         mouse.current.y =
//           1 - (event.clientY - canvasRect.top) / canvasRect.height;
//         isMoving.current = true;
//         lastMoveTime.current = performance.now();
//       } else {
//         isMoving.current = false;
//       }
//     };

//     const onTouchMove = (event) => {
//       if (event.touches.length > 0) {
//         event.preventDefault();
//         const canvasRect = canvas.getBoundingClientRect();
//         const touchX = event.touches[0].clientX;
//         const touchY = event.touches[0].clientY;

//         if (
//           touchX >= canvasRect.left &&
//           touchX <= canvasRect.right &&
//           touchY >= canvasRect.top &&
//           touchY <= canvasRect.bottom
//         ) {
//           mouse.current.x = (touchX - canvasRect.left) / canvasRect.width;
//           mouse.current.y = 1 - (touchY - canvasRect.top) / canvasRect.height;
//           isMoving.current = true;
//           lastMoveTime.current = performance.now();
//         } else {
//           isMoving.current = false;
//         }
//       }
//     };

//     const onWindowResize = () => {
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//       uniformsRef.current.display.uResolution.value.set(
//         window.innerWidth,
//         window.innerHeight
//       );
//       uniformsRef.current.display.uDpr.value = window.devicePixelRatio;
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("touchmove", onTouchMove, { passive: false });
//     window.addEventListener("resize", onWindowResize);

//     // Start Animation Loop
//     animate(renderer, scene, simScene, camera);

//     // Cleanup function
//     return () => {
//       cancelAnimationFrame(uniformsRef.current.rafId);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("resize", onWindowResize);
//       // Dispose Three.js objects to prevent memory leaks
//       renderer.dispose();
//       trailsMaterial.dispose();
//       displayMaterial.dispose();
//       planeGeometry.dispose();
//       topTexture.dispose();
//       bottomTexture.dispose();
//       pingPongTargets[0].dispose();
//       pingPongTargets[1].dispose();
//     };
//   }, [loadImage, animate, topImagePath, bottomImagePath]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute top-0 left-0 w-full h-full z-10"
//       id="hero-canvas"
//     />
//   );
// };

// // =======================================================================
// // 5. MAIN APP COMPONENT (The primary export)
// // =======================================================================
// const App = () => {
//   // अपनी इमेज फ़ाइलों के पाथ को यहाँ परिभाषित करें
//   const TOP_IMAGE_PATH = "/portrait_top.jpg";
//   const BOTTOM_IMAGE_PATH = "/portrait_bottom.jpg";

//   // Custom Font Classes (Tailwind.config.js mein define karna pad sakta hai)
//   const fontMono = "font-['DM_Mono']";
//   const fontRighteous = "font-['Righteous']";

//   return (
//     <div className={`relative w-screen h-screen overflow-hidden ${fontMono}`}>
//       {/* 1. WebGL Canvas Component */}
//       <FluidHero
//         topImagePath={TOP_IMAGE_PATH}
//         bottomImagePath={BOTTOM_IMAGE_PATH}
//       />

//       {/* 2. Navigation Bar (Header Component) */}
//       <Header fontRighteous={fontRighteous} />

//       {/* 3. Hero Content (optional overlay content) */}
//       <div className="hero absolute w-full h-full z-10 pointer-events-none">
//         {/* Your main content can go here */}
//       </div>

//       {/* 4. Footer-like Element (Footer Component) */}
//       <Footer />
//     </div>
//   );
// };

// export default App;



// import React from "react";
// import FluidHero from "./components/FluidHero";


// const App = () => {
//   const TOP_IMAGE_PATH = "/src/assets/top.jpg";
//   const BOTTOM_IMAGE_PATH =
//     "/src/assets/bottom.jpg";

//   const fontMono = "font-['DM_Mono']";
//   const fontRighteous = "font-['Righteous']";

//   return (
//     <div className={`relative w-screen h-screen overflow-hidden ${fontMono}`}>
      
      
//       <FluidHero
//         topImagePath={TOP_IMAGE_PATH}
//         bottomImagePath={BOTTOM_IMAGE_PATH}
//         />
      
//       <div className="hero absolute w-full h-full z-10 pointer-events-none"></div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import useLenis from "./components/useLenis"; // <<-- import hook
import Loader from "./components/Loader";
import FluidHero from "./components/FluidHero";
import Home from "./components/Home";
import TOP_IMAGE from "./assets/top.jpg";
import BOTTOM_IMAGE from "./assets/bottom.jpg";
import LocomotiveScroll from "locomotive-scroll";

export default function App() {

  const locomotiveScroll = new LocomotiveScroll();

  useLenis(); // <<-- initialize smooth scrolling

  const [loading, setLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const fallback = setTimeout(() => setLoading(false), 7000);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setShowHero(true), 100);
      return () => clearTimeout(t);
    }
  }, [loading]);

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      {/* background visual — absolute so it's behind page flow */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showHero ? "opacity-100" : "opacity-0"
        } z-0 pointer-events-none`}
      >
        <FluidHero
          topImagePath={TOP_IMAGE}
          bottomImagePath={BOTTOM_IMAGE}
          isTopVideo={false}
        />
      </div>

      {/* Main content in normal flow (Home contains sections stacked vertically) */}
      {showHero && (
        <div>
          <Home />
        </div>
      )}

      {/* Loader overlay above everything while loading */}
      {loading && (
        <div className="fixed inset-0 z-30">
          <Loader
            assetsToPreload={[TOP_IMAGE, BOTTOM_IMAGE]}
            maxWait={900}
            onFinish={() => setLoading(false)}
          />
        </div>
      )}
    </div>
  );
}

