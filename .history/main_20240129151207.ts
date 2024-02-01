import * as THREE from "three";
import { Boid } from "./entities/boid";
import { initializeBehaviors, initializeBoids } from "./utils";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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

function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < NUM_BOIDS; i++) {
    boidsMesh[i].lookAt(boids[i].getVelocity());
    boids[i].update(boids);
    const offsetAngle = -90 * (Math.PI / 180); // Convert degrees to radians
  }

  renderer.render(scene, camera);
}
animate();