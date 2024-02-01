import * as THREE from "three";
import { Boid } from "./entities/boid";
import {
  initializeBehaviors,
  initializeBoids,
  updateBoidsPerceptionRadius,
} from "./utils";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const NUM_BOIDS = 500;

const { boids, boidsMesh } = initializeBoids(NUM_BOIDS);

for (let i = 0; i < NUM_BOIDS; i++) {
  boidsMesh[i].position.copy(boids[i].getPosition());
  scene.add(boidsMesh[i]);
  initializeBehaviors(boids[i]);
}

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(200, 0, 500);

const boundaryGeometry = new THREE.SphereGeometry(150, 32, 32);
const boundaryMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  transparent: true,
  opacity: 0.2,
});
const boundaryMesh = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
scene.add(boundaryMesh);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const sliderPerceptionRadiusSlider = document.querySelector<HTMLInputElement>(
  "#perceptionRadiusSlider"
);
var output = document.querySelector<HTMLInputElement>("#perceptionRadiusValue");

if (sliderPerceptionRadiusSlider) {
  sliderPerceptionRadiusSlider.oninput = function () {
    const value: number = parseFloat(sliderPerceptionRadiusSlider.value);
    if (output && value) {
      output.innerHTML = String(value);
      updateBoidsPerceptionRadius(value, boids);
    }
  };
}

function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < NUM_BOIDS; i++) {
    boids[i].update(boids);
    const offsetAngle = -90 * (Math.PI / 180); // Convert degrees to radians
    const adjustedRotationAngle = boids[i].getRotationAngle() + offsetAngle;
    const euler = new THREE.Euler(0, 0, adjustedRotationAngle, "YXZ");
    boidsMesh[i].rotation.set(euler.x, euler.y, euler.z);
    boidsMesh[i].position.copy(boids[i].getPosition());
  }

  renderer.render(scene, camera);
}
animate();
