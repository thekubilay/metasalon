import * as THREE from "three";
import Loader from "@/nazare/Loader";
import {TextureLoader} from "three";

export default class Map {
  vendor = new Loader()
  room = ""
  get map(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      this.vendor.glb({path: "officeMap.glb"}).then((map: any) => {

        for (let i = map.scene.children.length; i--;){
          if (map.scene.children[i].name.includes("Light")){
            map.scene.children[i].intensity = .3
          }
          // if (map.scene.children[i].name.includes("Poster")){
          //   let path = ""
          //   if (window.location.pathname.split("$")[1] === "527218238"){
          //     path = "/images/tennouji_poster.jpg"
          //   }
          //
          //   map.scene.children[i].children[0].material.map = new TextureLoader().load(path)
          //   map.scene.children[i].children[0].material.side = THREE.DoubleSide
          //   console.log(map.scene.children[i].children[0].material)
          // }
          if(typeof map.scene.children[i].material === "object"){
            map.scene.children[i].material.roughness = .7
            map.scene.children[i].material.shininess = .3
          }
        }

        for (let i = map.scene.children.length; i--;){
          if (map.scene.children[i].name.includes("Monitor")){
            map.scene.children[i].removeFromParent()
          }
        }
        resolve([map.scene])
      })
    })
  }

  public publish(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      this.map.then((meshes) => {
        resolve(meshes)
      })
    })
  }
}
