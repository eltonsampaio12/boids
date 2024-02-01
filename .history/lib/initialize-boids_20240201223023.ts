import { Boid } from "../entities/boid";
import * as THREE from "three";

export function initializeBoids(num: number): {
  boids: Boid[];
  boidsMesh: THREE.Mesh[];
} {
  const triangleGeometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    0,
    5, // top vertex
    -1.5,
    -1.5, // bottom-left vertex
    1.5,
    -1.5, // bottom-right vertex
  ]);

  triangleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertices, 2)
  );

  const triangleMaterial = new THREE.MeshBasicMaterial({ color: "#abede0" }); // White color
  const boids: Boid[] = [];
  const boidsMesh: THREE.Mesh[] = [];

  for (let i = 0; i < num; i++) {
    const boid = new Boid(2, 50);
    const boidMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
    boidMesh.rotation.set(0, 0, 0);
    boids.push(boid);
    boidsMesh.push(boidMesh);
  }

  return { boids, boidsMesh };
}
