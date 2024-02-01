class Boid {
  private position: THREE.Vector3;
  private velocity: THREE.Vector3;
  private acceleration: THREE.Vector3;
  private speedLimit: number;
  private perceptionRadius: number;

  constructor(
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    acceleration: THREE.Vector3,
    speedLimit: number,
    perceptionRadius: number
  ) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.speedLimit = speedLimit;
    this.perceptionRadius = perceptionRadius;
  }
}
