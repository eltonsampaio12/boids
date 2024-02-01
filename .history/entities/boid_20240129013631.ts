import { BoidBehavior } from "../strategies/boidBehavior";
import { getRandomPositionWithinScreen } from "../utils";

export class Boid {
  private position: THREE.Vector3;
  private velocity: THREE.Vector3;
  private acceleration: THREE.Vector3;
  private speedLimit: number;
  private perceptionRadius: number;
  private behaviors: BoidBehavior[] = [];
  private rotationAngle: number;

  constructor(
    velocity: THREE.Vector3,
    acceleration: THREE.Vector3,
    speedLimit: number,
    perceptionRadius: number
  ) {
    this.position = getRandomPositionWithinScreen(50, 15, 0, 10);
    this.velocity = velocity;
    this.acceleration = acceleration;
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
  addBehavior(behavior: BoidBehavior): void {
    this.behaviors.push(behavior);
  }

  update(neighbors?: Boid[]): void {
    for (const behavior of this.behaviors) {
      behavior.update(this, neighbors);
    }
  }

  neighbors(otherBoids: Array<{ boid: Boid; mesh: THREE.Mesh }>): Boid[] {
    const neighbors: Boid[] = [];

    for (let otherBoid of otherBoids) {
      const direction = otherBoid.boid.position
        .clone()
        .sub(this.position.clone());
      const distance = direction.lengthSq();

      if (distance < this.perceptionRadius) {
        neighbors.push(otherBoid.boid);
      }
    }
    return neighbors;
  }
}
