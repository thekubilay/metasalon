import * as THREE from "three";
import Loader from "@/nazare/Loader";

export default class Sky {
  vendor = new Loader()

  get clouds(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const clouds = [] as THREE.Mesh[];
      this.vendor.fbx({path: "forest/cloud1.fbx"}).then((c1: any) => {
        c1.position.y = 8
        c1.position.z = -35
        c1.scale.set(2.5, 2.5, 2.5)
        clouds.push(c1)

        this.vendor.fbx({path: "forest/cloud4.fbx"}).then((c2: any) => {
          c2.position.y = -2
          c2.position.z = -42
          c2.position.x = 4
          c2.scale.set(3.7, 3.7, 3.7)
          clouds.push(c2)

          this.vendor.fbx({path: "forest/cloud5.fbx"}).then((c3: any) => {

            c3.rotation.x = -.5
            c3.rotation.z = -.2
            c3.position.y = 10
            c3.position.z = 0
            c3.position.x = -24
            c3.scale.set(3.7, 3.7, 3.7)
            clouds.push(c3)

            this.vendor.fbx({path: "forest/cloud4.fbx"}).then((mesh: any) => {

              mesh.position.y = 7
              mesh.position.z = 10
              mesh.position.x = 30
              mesh.scale.set(3.7, 3.7, 3.7)
              clouds.push(mesh)

              resolve(clouds)
            })
          })
        })
      })
    })
  }

  public publish(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      this.clouds.then((meshes) => {
        resolve([])
      })
    })
  }
}
