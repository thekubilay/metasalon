import * as THREE from "three";
import Loader from "@/nazare/Loader";
import {CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import Light from "@/nazare/Light";

export default class Element {
  private vendor = new Loader()
  public light = new Light();

  get lightning(): any {
    const light1 = this.light.dirLight.clone();

    light1.position.set(0, 50, 30)
    light1.intensity = .5

    const light2 = this.light.dirLight.clone();
    light2.position.set(300, 60, 30)
    light2.intensity = .5

    // const light3 = this.light.dirLight.clone();
    // light3.position.set(0, 10, 10)
    // light3.intensity = .3

    // const helpers2 = new THREE.DirectionalLightHelper(light2, 5);

    return [light1, light2]
  }

  get officers(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load("/characters/man4.glb", (gltf) => {
          const officer: any = gltf.scene;
          officer.rotation.y = -2.5
          officer.position.x = -2
          resolve([officer])

        },
        (xhr) => {
          // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          // console.log(error)
        },
      );
    })
  }

  get building3D(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load("building3d.glb", (gltf) => {
          const building: any = gltf.scene;
          building.scale.set(.022, .022, .022)
          building.rotation.y = -Math.PI / 2
          building.position.set(.03, .7, .3)
        building.roughness = 1
        building.shininess = .1
          resolve([building])
        },
        (xhr) => {
          // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          // console.log(error)
        },
      );
    })
  }

  private createCallButton(): CSS2DObject {
    const div = document.createElement("div");
    div.className = "callButton";
    div.textContent = "営業マンを呼ぶ";
    return new CSS2DObject(div);
  }

  public update(): void {

  }

  public publish(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      let elements = [] as THREE.Mesh[]
      this.officers.then((officer) => {
        elements = [...officer]
        this.building3D.then((building) => {
          elements = [...officer, ...building, ...this.lightning]
          resolve(elements)
        })
      })
    })
  }
}