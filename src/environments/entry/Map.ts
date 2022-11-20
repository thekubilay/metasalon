import * as THREE from "three";
import Loader from "@/nazare/Loader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import {GUI} from "dat.gui";
import Light from "@/nazare/Light";

export default class Map {
  vendor = new Loader()
  world: any;
  light = new Light()

  get map(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      this.vendor.glb({path: "entry/entryMap.glb"}).then((map: any) => {

        const mat = new THREE.MeshPhongMaterial({color: "#74b9ff", opacity: 0.04})

        for (let i = map.scene.children.length; i--;) {
          if (map.scene.children[i].name.includes("TeleporterLight")) {
            // map.scene.children[i].material = mat
            // map.scene.children[i].material.needsUpdate = true
            map.scene.children[i].material.color.set("#1ad")
            map.scene.children[i].material.opacity = .7
            map.scene.children[i].scale.y = 2
          }
        }

        for (let i = map.scene.children.length; i--;) {
          if (typeof map.scene.children[i].material === "object") {
            map.scene.children[i].material.roughness = .7
            map.scene.children[i].material.shininess = .3
          }
        }
        map.scene.rotation.set(0, 1.578, 0)
        map.scene.name = "world"
        this.world = map.scene
        resolve([map.scene])
      })
    })
  }

  get officers(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load("characters/woman.glb", (gltf) => {
          const text = this.createSpeechBox()
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

  get lightning(): any {
    const light1 = this.light.dirLight.clone();

    return [light1]
  }

  get limit(): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(15, 15, 2, 8, 4)
    const material = new THREE.MeshBasicMaterial({color: "#FFFFFF"})
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0 ,1, 0)
    // mesh.rotation.y = .5
    return mesh
  }

  private createSpeechBox(): CSS2DObject {
    const div = document.createElement("div");
    const span = document.createElement("span");
    div.className = "welcome flex align-center justify-center";
    div.setAttribute("id", "welcomeBubble")
    span.className = "text flex align-center justify-center"
    span.setAttribute("id", "welcomeText")
    div.append(span)
    return new CSS2DObject(div);
  }

  public update(): void {
    if (this.world){
      for (let i = this.world.children.length; i--;) {
        if (this.world.children[i].name.includes("TeleporterLight")) {
          this.world.children[i].rotation.y += 0.01
        }
      }
    }
  }

  public publish(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      let elements = []
      this.map.then((meshes) => {
        elements = [...meshes]
        this.officers.then(officer => {
          elements = [...meshes, ...officer, ...this.lightning]
          resolve(elements)
        })
      })
    })
  }
}
