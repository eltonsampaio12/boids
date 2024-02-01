import * as THREE from "three";
import { Boid } from "./entities/boid";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { onMouseClick } from "./lib/on-mouse-click";
import { initializeBoids } from "./lib/initialize-boids";
import { initializeBehaviors } from "./lib/initialize-behaviors";
import { updateBehavior } from "./lib/update-behavior";
import { updateBoidsPerceptionRadius } from "./lib/update-boids-perception-radius";
import { setupSliderBehaviors } from "./sliders";

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

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(200, 0, 500);

const sliderPerceptionRadiusSlider = document.querySelector<HTMLInputElement>(
  "#perceptionRadiusSlider"
);
const perceptionRadiusValue = document.querySelector<HTMLInputElement>(
  "#perceptionRadiusValue"
);

if (sliderPerceptionRadiusSlider) {
  sliderPerceptionRadiusSlider.oninput = function () {
    const value: number = parseFloat(sliderPerceptionRadiusSlider.value);
    if (perceptionRadiusValue && value) {
      perceptionRadiusValue.innerHTML = String(value);
      updateBoidsPerceptionRadius(value, boids);
    }
  };
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const controls = new OrbitControls(camera, renderer.domElement);
controls.mouseButtons = {
  LEFT: THREE.MOUSE.PAN,
  //MIDDLE: THREE.MOUSE.DOLLY,
  // RIGHT: THREE.MOUSE.PAN
};
controls.enableRotate = false;
controls.update();

window.addEventListener("click", (event) => {
  onMouseClick(event, mouse, raycaster, scene, camera);
});

setupSliderBehaviors(boids);

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
