import * as THREE from "three";
import { Boid } from "./entities/boid";

export function getRandomPosition(min: number, max: number): THREE.Vector3 {
  const x = Math.random() * (max - min) + min;
  const y = Math.random() * (max - min) + min;
  const z = Math.random() * (max - min) + min;

  return new THREE.Vector3(x, y, z);
}

export function initializeBoids(
  scene: THREE.Scene
): Array<{ boid: Boid; mesh: THREE.Mesh }> {
  const boidGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boidMaterial = new THREE.MeshBasicMaterial({ color: 0x0ff00 });
  const boids: Array<{ boid: Boid; mesh: THREE.Mesh }> = [];

  for (let i = 0; i < 10; i++) {
    const randomPosition = getRandomPosition(-50, 50);
    const boid = new Boid(
      randomPosition,
      new THREE.Vector3(),
      new THREE.Vector3(),
      5,
      10
    );

    const boidMesh = new THREE.Mesh(boidGeometry, boidMaterial);
    boidMesh.position.copy(boid.getPosition());
    scene.add(boidMesh); // Add the mesh to the scene

    boids.push({ boid, mesh: boidMesh });
  }

  return boids;
}
