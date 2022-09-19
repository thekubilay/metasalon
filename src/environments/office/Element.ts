import * as THREE from "three";
import Loader from "@/nazare/Loader";
import {CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export default class Element {
  private vendor = new Loader()

  get officers(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load("characters/man.glb", (gltf) => {
          const npc: any = gltf.scene;
          npc.rotation.y = -Math.PI
          // npc.visible = false

          resolve([npc])
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
          building.scale.set(.022,.022,.022)
          building.rotation.y = -Math.PI / 2
          building.position.y = .5
          building.position.x = 1
          building.position.z = -6
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
          elements = [...officer, ...building]
          resolve(elements)
        })
      })
    })
  }
}