import { BoidBehaviorStrategy } from "../strategies/boidBehaviorStrategy";
import { getRandomPositionWithinScreen } from "../utils";
import * as THREE from "three";

export class Boid {
  private position: THREE.Vector3;
  private velocity: THREE.Vector3;
  private acceleration: THREE.Vector3;
  private speedLimit: number;
  private perceptionRadius: number;
  private behaviors: BoidBehaviorStrategy[] = [];
  private rotationAngle: number;

  constructor(speedLimit: number, perceptionRadius: number) {
    this.position = getRandomPositionWithinScreen(50, 15, 0, 10);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.speedLimit = speedLimit;
    this.perceptionRadius = perceptionRadius;
    this.rotationAngle = 0;
  }

  getPosition(): THREE.Vector3 {
    return this.position;
  }

  setPosition(newPosition: THREE.Vector3): void {
    this.position.copy(newPosition);
  }

  // Methods for getting and setting velocity
  getVelocity(): THREE.Vector3 {
    return this.velocity;
  }

  setVelocity(newVelocity: THREE.Vector3): void {
    this.velocity.copy(newVelocity);
  }

  // Methods for getting and setting acceleration
  getAcceleration(): THREE.Vector3 {
    return this.acceleration;
  }

  setAcceleration(newAcceleration: THREE.Vector3): void {
    this.acceleration.copy(newAcceleration);
  }

  // Getter and setter for speedLimit
  getSpeedLimit(): number {
    return this.speedLimit;
  }

  setSpeedLimit(newSpeedLimit: number): void {
    this.speedLimit = newSpeedLimit;
  }

  // Getter and setter for perceptionRadius
  getPerceptionRadius(): number {
    return this.perceptionRadius;
  }

  setPerceptionRadius(newPerceptionRadius: number): void {
    this.perceptionRadius = newPerceptionRadius;
  }

  getRotationAngle(): number {
    return this.rotationAngle;
  }
  setRotation(angle: number): void {
    this.rotationAngle = angle;
  }
  addBehavior(behavior: BoidBehaviorStrategy): void {
    this.behaviors.push(behavior);
  }

  update(neighbors?: Boid[]): void {
    this.getAcceleration().set(0, 0, 0);

    for (const behavior of this.behaviors) {
      behavior.update(this, neighbors);
      this.getAcceleration().clampLength(0, this.speedLimit);
      this.getVelocity().add(this.getAcceleration());
    }
    this.getPosition().add(this.getVelocity());
  }

  neighbors(otherBoids: Boid[]): Boid[] {
    const neighbors: Boid[] = [];

    for (let otherBoid of otherBoids) {
      if (otherBoid == this) continue;
      const direction = otherBoid
        .getPosition()
        .clone()
        .sub(this.position.clone());
      const distance = direction.lengthSq();
      if (distance < this.perceptionRadius) {
        neighbors.push(otherBoid);
      }
    }
    return neighbors;
  }
}
