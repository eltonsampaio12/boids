import { Boid } from "../entities/boid";
import { getRandomPositionWithinScreen } from "../utils";
import { BoidBehaviorStrategy } from "./boidBehaviorStrategy";

export class AlignmentBehavior implements BoidBehaviorStrategy {
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
  update(boid: Boid, neighbors?: Boid[] | undefined): void {
    throw new Error("Method not implemented.");
  }
}
