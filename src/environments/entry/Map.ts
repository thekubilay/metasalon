import * as THREE from "three";
import Loader from "@/nazare/Loader";

export default class Map {
  vendor = new Loader()

  get map(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const clouds = [] as THREE.Mesh[];
      this.vendor.glb({path: "entry/map.glb"}).then((map: any) => {
        // map.scale.set(.75, .75, .75)
        // map.material.shininess = 0.3
        // console.log(map)
        // map.texture.roughness = .5
        // map.children.forEach(mesh => {
        //   if (typeof mesh.material === "object")
        //     mesh.material.shininess = .3
        //     mesh.material.roughness = .8
        // })
        map.scene.children[2].material.roughness = .8
        map.scene.children[2].material.shininess = .2
        console.log(map.scene)
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
