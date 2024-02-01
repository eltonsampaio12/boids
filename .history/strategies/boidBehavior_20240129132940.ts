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
    this.weight = 0.2;
    this.stoppingDistance = 1;
    this.newPosition = getRandomPositionWithinScreen(200, 100, 10, 30);
    this.lerpFactor = 0.05;
  }

  getName(): string {
    throw new Error("Method not implemented.");
  }
  getActive(): boolean {
    throw new Error("Method not implemented.");
  }
  setActive(active: boolean): void {
    throw new Error("Method not implemented.");
  }
  getWeight(): number {
    throw new Error("Method not implemented.");
  }
  setWeight(weight: number): void {
    throw new Error("Method not implemented.");
  }
}
