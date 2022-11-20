import * as THREE from "three";
import Loader from "@/nazare/Loader";

export default class Map {
  vendor = new Loader()
  room = ""

  get map(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      this.vendor.glb({path: "officeMap.glb"}).then((map: any) => {
        let j = 0;
        for (let i = map.scene.children.length; i--;) {
          // if (map.scene.children[i].name.includes("Light")){
          // map.scene.children[i].intensity = .2
          // }
          // if (map.scene.children[i].name.includes("Poster")) {
          //   let path = ""
          //   if (window.location.pathname.split("$")[1].split("#")[0] === "527218328") {
          //     const texture = new THREE.TextureLoader().load("images/tennouji_poster.jpg");
          //     map.scene.children[i].children[0].material = new THREE.MeshBasicMaterial({
          //       map: texture,
          //       side: THREE.DoubleSide
          //     })
          //   }
          // }
          if (typeof map.scene.children[i].material === "object") {
            map.scene.children[i].material.roughness = .7
            map.scene.children[i].material.shininess = .3
          }
          j += 1
        }

        if (j === map.scene.children.length)
          resolve([map.scene])
      })
    })
  }

  get posters(): THREE.Mesh[] {
    let loc = window.location.pathname.split("$")[1].split("#")[0]
    let path = ""

    if (loc === "527218328")
      path = "images/tennouji_poster.jpg"
    else if (loc === "902154407")
      path = "images/kitasenri_poster.jpg"
    else if (loc === "303512941")
      path = "images/matsuyamachi_poster.jpg"
    else if (loc === "430972345")
      path = "images/tanimachi_poster.jpg"
    else if (loc === "371140418")
      path = "images/fukushima_poster.jpg"

    const texture = new THREE.TextureLoader().load(path);
    const geometry = new THREE.PlaneGeometry(2.7, 3.53);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    })

    const poster1 = new THREE.Mesh(geometry, material)
    poster1.position.x = 5.8
    poster1.position.y = 2.93
    poster1.position.z = -5.7

    poster1.rotation.y = -.77

    const poster2 = poster1.clone()
    poster2.position.x = -5.7
    poster2.position.z = 5.7

    poster2.rotation.y = 2.3

    const poster3 = poster1.clone()
    poster3.position.x = 5.7
    poster3.position.z = 5.7

    poster3.rotation.y = -2.3

    const poster4 = poster1.clone()
    poster4.position.x = -5.7
    poster4.position.z = -5.7

    poster4.rotation.y = 7.1

    return [poster1, poster2, poster3, poster4]
  }

  public publish(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      this.map.then((meshes) => {
        resolve([...meshes, ...this.posters])
      })
    })
  }
}
