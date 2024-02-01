import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { initializeBoids } from "./lib/initialize-boids";
import { initializeBehaviors } from "./lib/initialize-behaviors";
import { setupSliderBehaviors } from "./sliders";
import { updateBehavior } from "./lib/update-behavior";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const NUM_BOIDS = 100;

const { boids, boidsMesh } = initializeBoids(NUM_BOIDS);

for (let i = 0; i < NUM_BOIDS; i++) {
  boidsMesh[i].position.copy(boids[i].getPosition());
  scene.add(boidsMesh[i]);
  initializeBehaviors(boids[i]);
}

setupSliderBehaviors(boids);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(200, 0, 500);

//const raycaster = new THREE.Raycaster();
//const mouse = new THREE.Vector2();

const controls = new OrbitControls(camera, renderer.domElement);
controls.mouseButtons = {
  LEFT: THREE.MOUSE.PAN,
  //MIDDLE: THREE.MOUSE.DOLLY,
  // RIGHT: THREE.MOUSE.PAN
};
controls.enableRotate = false;
controls.update();

function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < NUM_BOIDS; i++) {
    boids[i].update(boids);
    const offsetAngle = -90 * (Math.PI / 180); // Convert degrees to radians
    const adjustedRotationAngle = boids[i].getRotationAngle() + offsetAngle;
    const euler = new THREE.Euler(0, 0, adjustedRotationAngle, "YXZ");
    boidsMesh[i].rotation.set(euler.x, euler.y, euler.z);
    boidsMesh[i].position.copy(boids[i].getPosition());
    //boidsMesh[i].material.color.set(boids[i].getColor());
  }

  renderer.render(scene, camera);
}
animate();
