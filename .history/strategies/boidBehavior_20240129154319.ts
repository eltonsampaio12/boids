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
    this.weight = 0.008;
    this.stoppingDistance = 1;
    this.newPosition = getRandomPositionWithinScreen(300, 300, -300, 300);
    this.lerpFactor = 0.01;
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
