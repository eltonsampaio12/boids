import * as THREE from "three";
import { Boid } from "./entities/boid";

export function getRandomPosition(min: number, max: number): THREE.Vector3 {
  const x = Math.random() * (max - min) + min;
  const y = Math.random() * (max - min) + min;
  const z = Math.random() * (max - min) + min;

  return new THREE.Vector3(x, y, z);
}

export function initializeBoids(
  num: number
): Array<{ boid: Boid; mesh: THREE.Mesh }> {
  const boidGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boidMaterial = new THREE.MeshBasicMaterial({ color: 0x0ff00 });
  const boids: Array<{ boid: Boid; mesh: THREE.Mesh }> = [];

  for (let i = 0; i < num; i++) {
    const boid = new Boid(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(),
      3,
      5
    );

    const boidMesh = new THREE.Mesh(boidGeometry, boidMaterial);
    boids.push({ boid, mesh: boidMesh });
  }

  return boids;
}
