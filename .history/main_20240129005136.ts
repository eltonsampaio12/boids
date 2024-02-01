import * as THREE from "three";
import { Boid } from "./entities/boid";
import { initializeBehaviors, initializeBoids } from "./utils";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const boids: Array<{ boid: Boid; mesh: THREE.Mesh }> = initializeBoids(10);

// Add boid meshes to the scene using a for loop
for (const { boid, mesh } of boids) {
  mesh.position.copy(boid.getPosition());
  scene.add(mesh);

  initializeBehaviors(boid);
}

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(0, 20, 100);

controls.update();
function animate() {
  requestAnimationFrame(animate);
  for (const { boid, mesh } of boids) {
    boid.update();
    const offsetAngle = -90 * (Math.PI / 180); // Convert degrees to radians
    const adjustedRotationAngle = boid.getRotationAngle() + offsetAngle;
    const euler = new THREE.Euler(0, 0, adjustedRotationAngle, "YXZ");
    mesh.rotation.set(euler.x, euler.y, euler.z);
    mesh.position.copy(boid.getPosition());
  }
  renderer.render(scene, camera);
}
animate();
