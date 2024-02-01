import { lerp } from "../lib/lerp";
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
  private color: string;
  private desiredRandomPosition: THREE.Vector3;

  constructor(speedLimit: number, perceptionRadius: number) {
    this.position = getRandomPositionWithinScreen(500, 500, 0, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.speedLimit = 2;
    this.perceptionRadius = perceptionRadius;
    this.rotationAngle = 0;
    this.color = "white";
    this.desiredRandomPosition = getRandomPositionWithinScreen(500, 500, 0, 0);
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

  getBehaviors(): BoidBehaviorStrategy[] {
    return this.behaviors;
  }

  getColor(): string {
    return this.color;
  }
  setColor(color: string) {
    this.color = color;
  }

  getDesiredRandomPosition(): THREE.Vector3 {
    return this.desiredRandomPosition;
  }

  setDesiredRandomPosition(randomPosition: THREE.Vector3) {
    this.desiredRandomPosition = randomPosition;
  }

  update(neighbors?: Boid[]): void {
    const targetAngle = Math.atan2(this.velocity.y, this.velocity.x);
    this.rotationAngle = lerp(this.rotationAngle, targetAngle, 0.1);
    this.setAcceleration(new THREE.Vector3(0, 0, 0));
    for (const behavior of this.behaviors) {
      behavior.update(this, neighbors);
    }
    this.getVelocity().clampLength(0, 1);
    this.getVelocity().add(this.getAcceleration());
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
      if (distance < this.perceptionRadius * this.perceptionRadius) {
        neighbors.push(otherBoid);
      }
    }
    return neighbors;
  }
}
