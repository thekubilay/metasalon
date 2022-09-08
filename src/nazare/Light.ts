import * as THREE from 'three';

class Light {
  ambientLight = new THREE.AmbientLight('#404040', 1);
  dirLight = {} as THREE.DirectionalLight;
  pointLight = {} as THREE.PointLight;

  constructor() {
    this.set_dirLight()
    this.set_pointLight()
  }

  get dirLightHelper(): THREE.DirectionalLightHelper {
    return new THREE.DirectionalLightHelper(this.dirLight, 2);
  }

  get pointLightHelper(): THREE.PointLightHelper {
    return new THREE.PointLightHelper(this.pointLight, 1);
  }


  public set_dirLight(options = {}): void {
    const settings = Object.assign(
      {
        color: '#FFFFFF',
        intensity: 2,
        position: [0, 20, -40],
        castShadow: true,
        shadowCameraTop: 50,
        shadowCameraBottom: -50,
        shadowCameraLeft: -50,
        shadowCameraRight: 50,
        shadowCameraNear: 0.1,
        shadowCameraFar: 100,
        shadowMapSizeWidth: 4096,
        shadowMapSizeHeight: 4096,
      },
      options,
    );


    this.dirLight = new THREE.DirectionalLight(0xffffff, 2);
    this.dirLight.position.set(settings.position[0], settings.position[1], settings.position[2]);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.camera.top = settings.shadowCameraTop;
    this.dirLight.shadow.camera.bottom = settings.shadowCameraBottom;
    this.dirLight.shadow.camera.left = settings.shadowCameraLeft;
    this.dirLight.shadow.camera.right = settings.shadowCameraRight;
    this.dirLight.shadow.camera.near = settings.shadowCameraNear;
    this.dirLight.shadow.camera.far = settings.shadowCameraFar;
    this.dirLight.shadow.mapSize.width = settings.shadowMapSizeWidth;
    this.dirLight.shadow.mapSize.height = settings.shadowMapSizeHeight;
    return;
  }

  public set_pointLight(options = {}): void {
    const settings = Object.assign(
      {
        color: '#FFFFFF',
        intensity: 0.2,
        distance: 1,
        position: [0, 35, 0],
        castShadow: false,
        shadowCameraNear: 0.1,
      },
      options,
    );

    this.pointLight = new THREE.PointLight(settings.color, settings.intensity, settings.distance);
    this.pointLight.position.set(settings.position[0], settings.position[1], settings.position[2]);
    this.pointLight.castShadow = false;
    this.pointLight.shadow.camera.near = 0.1;

    return;
  }
}

export default Light;
