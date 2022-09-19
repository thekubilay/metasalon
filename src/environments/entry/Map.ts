import * as THREE from "three";
import Loader from "@/nazare/Loader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";

export default class Map {
  vendor = new Loader()

  get map(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      this.vendor.glb({path: "entry/entryMap.glb"}).then((map: any) => {
        for (let i = map.scene.children.length; i--;){
          if(typeof map.scene.children[i].material === "object"){
            map.scene.children[i].material.roughness = .7
            map.scene.children[i].material.shininess = .3
          }
        }
        map.scene.rotation.set(0, 1.578, 0)
        resolve([map.scene])
      })
    })
  }

  get officers(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load("characters/woman.glb", (gltf) => {
          const text = this.createCallButton()
          const npc: any = gltf.scene;
          npc.rotation.y = -Math.PI
          npc.position.x = 0.07
          npc.position.z = 0.6820
          npc.position.z = 8.9830

          text.position.y = 2

          npc.add(text)
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

  private createCallButton(): CSS2DObject {
    const div = document.createElement("div");
    div.className = "welcome flex align-center justify-center";
    div.textContent = "メタサロンへようこそ";
    return new CSS2DObject(div);
  }

  public publish(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      let elements = []
      this.map.then((meshes) => {
        elements = [...meshes]
        this.officers.then(officer => {
          elements = [...meshes, ...officer]
          resolve(elements)
        })
      })
    })
  }
}
