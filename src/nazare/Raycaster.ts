import * as THREE from 'three';

export default class Raycaster {
  mouse = new THREE.Vector3();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera();
  raycaster = new THREE.Raycaster();

  update(camera: THREE.PerspectiveCamera, scene: THREE.Scene): void {
    this.camera = camera;
    this.scene = scene;
  }

  move(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  click(event: MouseEvent): void {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) {
      intersects.forEach((mesh: any) => {
        if (mesh.object.userData.hasOwnProperty("clickable")) {
          // console.log(mesh.object.userData)
          // mesh.object.userData.dblclick();
          window.location.href = "/booths"
        }
      });
    }
  }

  start(): void {
    window.addEventListener('mousemove', this.move.bind(this), false);
    window.addEventListener('dblclick', this.click.bind(this));
  }

  stop(): void {
    window.removeEventListener('mousemove', this.move.bind(this));
    window.removeEventListener('dblclick', this.click.bind(this));
  }
}
