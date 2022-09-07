import * as THREE from "three";
import Loader from "@/nazare/Loader";
import {GUI} from "dat.gui";


export default class BasicEnv {
  gui = new GUI()
  vendor = new Loader()

  ground(segments = 40): THREE.Mesh {
    let geometry, material, mesh;

    geometry = new THREE.PlaneGeometry(120, 120, segments, segments);
    material = new THREE.MeshPhongMaterial({color: "#fcf7e9"})
    mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -Math.PI / 2
    return mesh
  }

  cloud() {
    return new Promise(resolve => {
      this.vendor.mtl({
        path: "models/env/cloud.mtl",
        obj: "models/env/cloud.obj",
        name: "cloud"
      }).then((mesh: any) => {
        mesh.color = "#FFFFFF"
        mesh.scale.set(1, 1, 1)
        mesh.position.set(0, 10, -60)
        mesh.clickFlg = true


        this.gui.add(mesh.rotation, "x", -10, 10).name("booth rot x")
        this.gui.add(mesh.rotation, "y", -10, 10).name("booth rot y")
        this.gui.add(mesh.rotation, "z", -10, 10).name("booth rot z")

        this.gui.add(mesh.position, "x", -100, 20).name("booth pos x")
        this.gui.add(mesh.position, "y", -100, 20).name("booth pos y")
        this.gui.add(mesh.position, "z", -100, 20).name("booth pos z")

        resolve(mesh)
      })
    })
  }

  park(): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(8, 8, .05, 5, 5, false, 0, 6.283185307179586)
    const material = new THREE.MeshPhongMaterial({color: "#27ae60", side: THREE.DoubleSide})
    const park = new THREE.Mesh(geometry, material)
    park.name = "park"
    park.position.y = .01

    const bg = new THREE.CircleGeometry(1.5, 32, 0, 6.283185307179586)
    const bm = new THREE.MeshPhongMaterial({color: "#f5f6fa"})
    const bmh = new THREE.Mesh(bg, bm)
    bmh.name = "beam"
    bmh.rotation.x = -Math.PI / 2;
    bmh.position.y = .03

    const brg = new THREE.RingGeometry(1.45, 2, 64)
    const brm = new THREE.MeshPhongMaterial({color: "#353b48", side: THREE.DoubleSide})
    const brgmh = new THREE.Mesh(brg, brm)
    brgmh.name = "beam_ring"
    brgmh.rotation.x = -Math.PI / 2;
    brgmh.position.y = .05

    park.add(bmh)
    park.add(brgmh)

    this.vendor.fbx({
      path: "models/env/bank.fbx",
      name: "bank"
    }).then((bank: any) => {
      bank.scale.set(.3, .3, .3)
      bank.rotation.set(0, -2.22, 0)
      bank.position.set(-2, 0, -2)
      bank.clickFlg = true

      this.vendor.fbx({
        path: "models/env/street_lamp.fbx",
        name: "street_lamp"
      }).then((mesh: any) => {
        mesh.scale.set(1, 1, 1)
        mesh.rotation.set(0, 0, 0)
        mesh.position.set(1.2, 0, 1.2)
        bank.add(mesh)

        park.add(bank)
      })
    })

    this.vendor.fbx({
      path: "models/env/bank.fbx",
      name: "bank"
    }).then((bank: any) => {
      bank.scale.set(.3, .3, .3)
      bank.rotation.set(0, .3, 0)
      bank.position.set(.5, 0, 3)
      bank.clickFlg = true


      this.vendor.fbx({
        path: "models/env/street_lamp.fbx",
        name: "street_lamp"
      }).then((mesh: any) => {
        mesh.scale.set(1, 1, 1)
        mesh.rotation.set(0, 0, 0)
        mesh.position.set(1.2, 0, 1.2)
        bank.add(mesh)

        park.add(bank)
      })
    })

    this.vendor.fbx({
      path: "models/env/bank.fbx",
      name: "bank"
    }).then((bank: any) => {
      bank.scale.set(.3, .3, .3)
      bank.rotation.set(0, -.97, 0)
      bank.position.set(-2.71, 0, 1.5)
      bank.clickFlg = true

      this.vendor.fbx({
        path: "models/env/street_lamp.fbx",
        name: "street_lamp"
      }).then((mesh: any) => {
        mesh.scale.set(1, 1, 1)
        mesh.rotation.set(0, 0, 0)
        mesh.position.set(1.2, 0, 1.2)
        bank.add(mesh)

        park.add(bank)
      })
    })

    this.vendor.fbx({
      path: "models/env/halka.fbx",
      name: "ring"
    }).then((parent: any) => {
      parent.scale.set(.07, .07, .07)
      parent.rotation.set(0, -4.2, 0)
      parent.position.set(-2.7, -.3, -1)

      this.vendor.fbx({
        path: "models/env/halka.fbx",
        name: "tent"
      }).then((mesh: any) => {
        mesh.scale.set(.6, .6, .6)
        mesh.rotation.set(0, -5.5, 0)
        mesh.position.set(21, 1.7, 27)

        parent.add(mesh)
        park.add(parent)
      })
    })

    this.vendor.fbx({
      path: "models/env/cadir_b.fbx",
      name: "tent"
    }).then((mesh: any) => {
      mesh.scale.set(.15, .15, .15)
      mesh.rotation.set(0, -7.4, 0)
      mesh.position.set(-.2, 0, 5)
      park.add(mesh)
    })


    return park;
  }

  update(): void {

  }

  publish(game: any): void {
    game.scene.add(this.ground())
    game.scene.add(this.park())
  }
}
