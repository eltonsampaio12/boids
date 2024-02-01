import { getRandomPositionWithinScreen } from "../utils";

export class BoidBehavior {
  private name: string;
  private active: boolean;
  private weight: number;
  private stoppingDistance: number;
  private newPosition: THREE.Vector3;
  private lerpFactor: number;

  constructor(name: string) {
    this.name = name;
    this.active = false;
    this.weight = 0.1;
    this.stoppingDistance = 1;
    this.newPosition = getRandomPositionWithinScreen(200, 100, 10, 30);
    this.lerpFactor = 0.05;
  }

  getName(): string {
    return this.name;
  }
  getActive(): boolean {
    return this.active;
  }
  setActive(active: boolean): void {
    this.active = active;
  }
  getWeight(): number {
    return this.weight;
  }
  setWeight(weight: number): void {
    this.weight = weight;
  }

  getNewPosition(): THREE.Vector3 {
    return this.newPosition;
  }

  setNewPosition(newPosition: THREE.Vector3): void {
    this.newPosition = newPosition;
  }

  getLerpFactor(): number {
    return this.lerpFactor;
  }

  setLerpFactor(factor: number): void {
    this.lerpFactor = factor;
  }

  getStoppingDistance() {
    return this.stoppingDistance;
  }

  setStoppingDistance(distance: number): void {
    this.stoppingDistance = distance;
  }
}
