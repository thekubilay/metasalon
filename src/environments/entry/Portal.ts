import * as THREE from "three"
import Loader from "@/nazare/Loader";
import {characters} from "@/utils/characters";

export default class Portal {
  vendor = new Loader()

  get portals(): Promise<THREE.Mesh[]> {
    return new Promise<THREE.Mesh[]>((resolve) => {
      const portals = [] as THREE.Mesh[]
      this.vendor.fbx({path: "forest/door.fbx"}).then((mesh) => {
        mesh.scale.set(.015, .01, .01)
        mesh.children.forEach((child: any) => {
          child.name = "portal"
          child.userData.clickable = true
          child.userData.dblclick = function () {
            window.location.href = "/booths"
            return;
          }
        })

        const portal1 = mesh.clone()
        portal1.rotation.y = 1.26
        portal1.position.set(-7.4, 0, -1.59)
        portals.push(portal1)

        const portal2 = mesh.clone()
        portal2.rotation.y = 0
        portal2.position.set(-.5, 0, -7.44)
        portals.push(portal2)

        const portal3 = mesh.clone()
        portal3.rotation.y = -1.28
        portal3.position.set(7.1, 0, -2.67)
        portals.push(portal3)

        const portal4 = mesh.clone()
        portal4.rotation.y = 3.76
        portal4.position.set(4.7, 0, 5.78)
        portals.push(portal4)

        const portal5 = mesh.clone()
        portal5.rotation.y = -3.8
        portal5.position.set(-3.7, 0, 6.5)
        portals.push(portal5)
        resolve(portals)
      })

    })
  }

  public publish(): Promise<THREE.Mesh[]> {
    return new Promise<THREE.Mesh[]>((resolve) => {
      this.portals.then(meshes => {
        resolve(meshes)
      })
    })
  }
}
