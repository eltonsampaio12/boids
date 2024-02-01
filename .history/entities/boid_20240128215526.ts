import { getRandomPosition } from "../utils";

export class Boid {
  private position: THREE.Vector3;
  private velocity: THREE.Vector3;
  private acceleration: THREE.Vector3;
  private speedLimit: number;
  private perceptionRadius: number;

  constructor(
    velocity: THREE.Vector3,
    acceleration: THREE.Vector3,
    speedLimit: number,
    perceptionRadius: number
  ) {
    this.position = getRandomPosition(100, 100);
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.speedLimit = speedLimit;
    this.perceptionRadius = perceptionRadius;
  }

  getPosition(): THREE.Vector3 {
    return this.position.clone();
  }

  setPosition(newPosition: THREE.Vector3): void {
    this.position.copy(newPosition);
  }

  // Methods for getting and setting velocity
  getVelocity(): THREE.Vector3 {
    return this.velocity.clone();
  }

  setVelocity(newVelocity: THREE.Vector3): void {
    this.velocity.copy(newVelocity);
  }

  // Methods for getting and setting acceleration
  getAcceleration(): THREE.Vector3 {
    return this.acceleration.clone();
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
}
