// import React, { useRef, useEffect, useCallback } from "react";
// import * as THREE from "three";
// import {
//   vertexShader,
//   fluidFragmentShader,
//   displayFragmentShader,
// } from "../components/shaders";

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
// const topTexture = createPlaceholderTexture("#0000ff");
// const bottomTexture = createPlaceholderTexture("#ff0000");

// const FluidHero = ({ topImagePath, bottomImagePath }) => {
//   const canvasRef = useRef(null);
//   const uniformsRef = useRef({});
//   const mouse = useRef(new THREE.Vector2(0.5, 0.5));
//   const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));
//   const isMoving = useRef(false);
//   const lastMoveTime = useRef(0);
//   const topTextureSize = useRef(new THREE.Vector2(1, 1));
//   const bottomTextureSize = useRef(new THREE.Vector2(1, 1));

//   const loadImage = useCallback((url, textureSizeVector) => {
//     if (!url) return;
//     const img = new Image();
//     img.crossOrigin = "Anonymous";

//     img.onload = () => {
//       textureSizeVector.current.set(img.width, img.height);
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, img.width, img.height);
//       const newTexture = new THREE.CanvasTexture(canvas);
//       newTexture.minFilter = THREE.LinearFilter;
//       if (url.includes("top") && uniformsRef.current.display)
//         uniformsRef.current.display.uTopTexture.value = newTexture;
//       else if (uniformsRef.current.display)
//         uniformsRef.current.display.uBottomTexture.value = newTexture;
//     };
//     img.src = url;
//   }, []);

//   const animate = useCallback((renderer, scene, simScene, camera) => {
//     if (!uniformsRef.current.trails || !uniformsRef.current.display) return;
//     if (isMoving.current && performance.now() - lastMoveTime.current > 50)
//       isMoving.current = false;

//     const prevTarget = pingPongTargets[currentTarget];
//     currentTarget = (currentTarget + 1) % 2;
//     const currentRenderTarget = pingPongTargets[currentTarget];

//     uniformsRef.current.trails.uPrevTrails.value = prevTarget.texture;
//     uniformsRef.current.trails.uMouse.value.copy(mouse.current);
//     uniformsRef.current.trails.uPrevMouse.value.copy(prevMouse.current);
//     uniformsRef.current.trails.uIsMoving.value = isMoving.current;

//     renderer.setRenderTarget(currentRenderTarget);
//     renderer.render(simScene, camera);

//     prevMouse.current.copy(mouse.current);

//     uniformsRef.current.display.uFluid.value = currentRenderTarget.texture;
//     renderer.setRenderTarget(null);
//     renderer.render(scene, camera);

//     uniformsRef.current.rafId = requestAnimationFrame(() =>
//       animate(renderer, scene, simScene, camera)
//     );
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const renderer = new THREE.WebGLRenderer({
//       canvas,
//       antialias: true,
//       precision: "highp",
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     const scene = new THREE.Scene();
//     const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

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

//     uniformsRef.current = {
//       trails: trailsMaterial.uniforms,
//       display: displayMaterial.uniforms,
//     };

//     loadImage(topImagePath, topTextureSize);
//     loadImage(bottomImagePath, bottomTextureSize);

//     const planeGeometry = new THREE.PlaneGeometry(2, 2);
//     const displayMesh = new THREE.Mesh(planeGeometry, displayMaterial);
//     scene.add(displayMesh);

//     const simMesh = new THREE.Mesh(planeGeometry, trailsMaterial);
//     const simScene = new THREE.Scene();
//     simScene.add(simMesh);

//     renderer.setRenderTarget(pingPongTargets[0]);
//     renderer.clear();
//     renderer.setRenderTarget(pingPongTargets[1]);
//     renderer.clear();
//     renderer.setRenderTarget(null);

//     const onMouseMove = (e) => {
//       const rect = canvas.getBoundingClientRect();
//       mouse.current.x = (e.clientX - rect.left) / rect.width;
//       mouse.current.y = 1 - (e.clientY - rect.top) / rect.height;
//       isMoving.current = true;
//       lastMoveTime.current = performance.now();
//     };

//     const onTouchMove = (e) => {
//       if (e.touches.length > 0) {
//         e.preventDefault();
//         const rect = canvas.getBoundingClientRect();
//         mouse.current.x = (e.touches[0].clientX - rect.left) / rect.width;
//         mouse.current.y = 1 - (e.touches[0].clientY - rect.top) / rect.height;
//         isMoving.current = true;
//         lastMoveTime.current = performance.now();
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

//     animate(renderer, scene, simScene, camera);

//     return () => {
//       cancelAnimationFrame(uniformsRef.current.rafId);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("resize", onWindowResize);
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
//     />
//   );
// };

// export default FluidHero;




import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import {
  vertexShader,
  fluidFragmentShader,
  displayFragmentShader,
} from "../components/shaders";

const size = 500;
const pingPongTargets = [
  new THREE.WebGLRenderTarget(size, size, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  }),
  new THREE.WebGLRenderTarget(size, size, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  }),
];
let currentTarget = 0;

const FluidHero = ({ topImagePath, bottomImagePath }) => {
  const canvasRef = useRef(null);
  const uniformsRef = useRef({});
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const isMoving = useRef(false);
  const lastMoveTime = useRef(0);
  const topTextureSize = useRef(new THREE.Vector2(1, 1));
  const bottomTextureSize = useRef(new THREE.Vector2(1, 1));

  // Load image as THREE.Texture
  const loadImageTexture = useCallback((url, isTop) => {
    if (!url) return;
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "Anonymous";
    loader.load(url, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      if (isTop) {
        uniformsRef.current.display.uTopTexture.value = texture;
        topTextureSize.current.set(texture.image.width, texture.image.height);
      } else {
        uniformsRef.current.display.uBottomTexture.value = texture;
        bottomTextureSize.current.set(
          texture.image.width,
          texture.image.height
        );
      }
    });
  }, []);

  // Animation loop
  const animate = useCallback((renderer, scene, simScene, camera) => {
    if (!uniformsRef.current.trails || !uniformsRef.current.display) return;

    if (isMoving.current && performance.now() - lastMoveTime.current > 50)
      isMoving.current = false;

    const prevTarget = pingPongTargets[currentTarget];
    currentTarget = (currentTarget + 1) % 2;
    const currentRenderTarget = pingPongTargets[currentTarget];

    // Update trails
    uniformsRef.current.trails.uPrevTrails.value = prevTarget.texture;
    uniformsRef.current.trails.uMouse.value.copy(mouse.current);
    uniformsRef.current.trails.uPrevMouse.value.copy(prevMouse.current);
    uniformsRef.current.trails.uIsMoving.value = isMoving.current;

    renderer.setRenderTarget(currentRenderTarget);
    renderer.render(simScene, camera);

    prevMouse.current.copy(mouse.current);

    // Display render
    uniformsRef.current.display.uFluid.value = currentRenderTarget.texture;
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);

    uniformsRef.current.rafId = requestAnimationFrame(() =>
      animate(renderer, scene, simScene, camera)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      precision: "highp",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Trails Material
    const trailsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPrevTrails: { value: null },
        uMouse: { value: mouse.current },
        uPrevMouse: { value: prevMouse.current },
        uResolution: { value: new THREE.Vector2(size, size) },
        uDecay: { value: 0.97 },
        uIsMoving: { value: false },
      },
      vertexShader,
      fragmentShader: fluidFragmentShader,
    });

    // Display Material
    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uFluid: { value: null },
        uTopTexture: { value: null }, // initially null
        uBottomTexture: { value: null }, // initially null
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uDpr: { value: window.devicePixelRatio },
        uTopTextureSize: { value: topTextureSize.current },
        uBottomTextureSize: { value: bottomTextureSize.current },
      },
      vertexShader,
      fragmentShader: displayFragmentShader,
    });

    uniformsRef.current = {
      trails: trailsMaterial.uniforms,
      display: displayMaterial.uniforms,
    };

    // Load images
    loadImageTexture(topImagePath, true);
    loadImageTexture(bottomImagePath, false);

    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const displayMesh = new THREE.Mesh(planeGeometry, displayMaterial);
    scene.add(displayMesh);

    const simMesh = new THREE.Mesh(planeGeometry, trailsMaterial);
    const simScene = new THREE.Scene();
    simScene.add(simMesh);

    // Clear ping-pong targets
    renderer.setRenderTarget(pingPongTargets[0]);
    renderer.clear();
    renderer.setRenderTarget(pingPongTargets[1]);
    renderer.clear();
    renderer.setRenderTarget(null);

    // Mouse & touch
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = 1 - (e.clientY - rect.top) / rect.height;
      isMoving.current = true;
      lastMoveTime.current = performance.now();
    };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        mouse.current.x = (e.touches[0].clientX - rect.left) / rect.width;
        mouse.current.y = 1 - (e.touches[0].clientY - rect.top) / rect.height;
        isMoving.current = true;
        lastMoveTime.current = performance.now();
      }
    };
    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniformsRef.current.display.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
      uniformsRef.current.display.uDpr.value = window.devicePixelRatio;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", onWindowResize);

    animate(renderer, scene, simScene, camera);

    return () => {
      cancelAnimationFrame(uniformsRef.current.rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      trailsMaterial.dispose();
      displayMaterial.dispose();
      planeGeometry.dispose();
      pingPongTargets[0].dispose();
      pingPongTargets[1].dispose();
    };
  }, [animate, topImagePath, bottomImagePath, loadImageTexture]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-10"
    />
  );
};

export default FluidHero;
