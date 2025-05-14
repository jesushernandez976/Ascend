import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from "https://cdn.skypack.dev/gsap@3.9.1";

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, .1, 100); 

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('three-canvas'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});


// Lighting
const light = new THREE.DirectionalLight(0xffffff, 7);
light.position.set(1, 1, 1);
scene.add(light);

// Soft ambient light for base lighting everywhere
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

// Strong directional light for shadows and depth
const dirLight = new THREE.DirectionalLight(0xffffff, .5);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

// Multiple point lights in corners of the room
const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
pointLight1.position.set(20, 20, 20);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
pointLight2.position.set(-20, 20, 20);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 1, 100);
pointLight3.position.set(20, 20, -20);
scene.add(pointLight3);

const pointLight4 = new THREE.PointLight(0xffffff, 1, 100);
pointLight4.position.set(-20, 20, -20);
scene.add(pointLight4);


const loader = new GLTFLoader();

loader.load('./public/fitness1.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.set(2, 2, 2);
  model.position.set(10, -30, 10);
  scene.add(model);

  model.traverse((node) => {
  if (node.isMesh) {
    node.castShadow = true;
    node.receiveShadow = true;
  }
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


  // Center camera on model
  const box = new THREE.Box3().setFromObject(model);
  const center = new THREE.Vector3();
  box.getCenter(center);
}, undefined, (error) => {
  console.error('An error occurred loading the GLB:', error);
});

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


gsap.to(camera.position, {
  x: 80,
  y: 0.1,
  z: -10,
  duration: 3,
  ease: "power3.out"
});

// const textureLoader = new THREE.TextureLoader();
// textureLoader.load('./public/background.jpg', (texture) => {
//   scene.background = texture;
// });

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  // controls.update(); // Required for damping
  renderer.render(scene, camera);

  const targetX = mouseX * 0.1;
  const targetY = mouseY * 0.1;

  camera.rotation.y = targetX;
  camera.rotation.x = targetY;

    const sensitivity = 0.5; // smaller = more subtle sway
  targetRotationY = mouseX * sensitivity;
  targetRotationX = mouseY * sensitivity;

  // Smoothly interpolate camera rotation
  camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.01;
  camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.01;
  

}

animate();
