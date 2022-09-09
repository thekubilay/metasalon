import * as THREE from "three";
import Loader from "@/nazare/Loader";

export default class Element {
  private vendor = new Loader()

  get spinner(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const pointLight = new THREE.PointLight("#f9ca24", 2, .5)
      const pointLightHelper = new THREE.PointLightHelper(pointLight, .5);

      const geometry = new THREE.CylinderGeometry(1, 1, .35, 32, 1, false, 0)
      const material = new THREE.MeshPhongMaterial({color: "", side: THREE.DoubleSide})
      const spinner = new THREE.Mesh(geometry, material)
      const beltGeo =  new THREE.CylinderGeometry(1.05, 1.05, .18, 32, 1, true, 0)
      const beltMat = new THREE.MeshPhongMaterial({color: "#f6e58d", side: THREE.DoubleSide})
      const belt = new THREE.Mesh(beltGeo, beltMat)



      spinner.position.z = -5
      belt.position.z = -5
      belt.material.map = new THREE.TextureLoader().load("images/name.png")


      this.vendor.fbx({path: "models/portal.fbx"}).then(portal => {
        const geometry = new THREE.CylinderGeometry(.8,.55, .5, 32, 1, true)
        const material = new THREE.MeshStandardMaterial({color:"#f6e58d", transparent:true, side:THREE.DoubleSide, opacity:.6})
        const beam = new THREE.Mesh(geometry, material)

        beam.position.y = .2
        beam.position.z = -5

        pointLight.position.y = .1
        pointLight.position.z = -5
        pointLight.rotation.x = -Math.PI / 2

        pointLightHelper.position.y = .2
        pointLightHelper.position.z = -5

        portal.children[0].children[0].removeFromParent()
        portal.scale.set(0.005, 0.005, 0.005)
        portal.position.y = .2
        portal.position.z = -5
        portal.add(beam)

        resolve([spinner, belt, beam, pointLight, pointLightHelper, portal])
      })

    })
  }

  public update(): void {

  }

  public publish(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      let elements = [] as THREE.Mesh[]
      this.spinner.then((spinner) => {
        elements = [...spinner]
        resolve(elements)
      })
    })
  }
}