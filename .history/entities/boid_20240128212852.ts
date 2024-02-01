class Boid {
  private _position: THREE.Vector3;
  private _velocity: THREE.Vector3;
  private _acceleration: THREE.Vector3;
  private _speedLimit: number;
  private _perceptionRadius: number;

  constructor(
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    acceleration: THREE.Vector3,
    speedLimit: number,
    perceptionRadius: number
  ) {
    this._position = position;
    this._velocity = velocity;
    this._acceleration = acceleration;
    this._speedLimit = speedLimit;
    this._perceptionRadius = perceptionRadius;
  }
}
