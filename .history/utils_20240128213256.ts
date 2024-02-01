import * as THREE from "three";

export function getRandomPosition(min: number, max: number): THREE.Vector3 {
  const x = Math.random() * (max - min) + min;
  const y = Math.random() * (max - min) + min;
  const z = Math.random() * (max - min) + min;

  return new THREE.Vector3(x, y, z);
}
