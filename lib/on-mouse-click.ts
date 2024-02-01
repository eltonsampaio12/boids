import * as THREE from "three";

export function onMouseClick(
  event: MouseEvent,
  mouse: THREE.Vector2,
  raycaster: THREE.Raycaster,
  scene: THREE.Scene,
  camera: THREE.Camera
) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Find intersections
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    // Log the position of the first intersected object
    console.log("Mouse clicked at:", intersects[0].point);
  }
}
