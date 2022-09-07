import * as THREE from "three";
import Loader from "@/nazare/Loader";

export default class Ground {
  public vendor = new Loader()
  public treesL = new THREE.Mesh()
  public treesM = new THREE.Mesh()

  get mountain(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const mountain = [] as THREE.Mesh[];
      this.vendor.fbx({path: "forest/mountain.fbx"}).then((mesh: any) => {
        mesh.position.set(9.19, -6, -9.5)
        mesh.scale.set(4.2, 4.2, 4.2)
        mountain.push(mesh)
        resolve(mountain)
      })
    })
  }

  get rocks(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const rocks = [] as THREE.Mesh[];
      this.vendor.fbx({path: "forest/rock1.fbx"}).then((mesh: any) => {
        mesh.position.set(-7.6, -5, -2)
        mesh.scale.set(3.6, 3.6, 3.6)
        rocks.push(mesh)

        this.vendor.fbx({path: "forest/rock1.fbx"}).then((mesh: any) => {
          mesh.rotation.y = -3.3
          mesh.position.set(-16.1, -5, 8)
          mesh.scale.set(3.6, 3.6, 3.6)
          rocks.push(mesh)

          this.vendor.fbx({path: "forest/rock1.fbx"}).then((mesh: any) => {
            mesh.rotation.y = -2.5
            mesh.position.set(-5, -2.65, 3.6)
            mesh.scale.set(2, 2, 2)
            rocks.push(mesh)
            resolve(rocks)
          })
        })
      })
    })
  }

  get grass(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const grasses = [] as THREE.Mesh[]
      this.vendor.fbx({path: "forest/grasses2.fbx"}).then((mesh) => {
        const grass1 = mesh.clone()
        grass1.position.set(11, 0, 1)
        grass1.scale.set(1, 1, 1)
        grasses.push(grass1)

        const grass2 = mesh.clone()
        grass2.position.set(10.8, 0, -3.5)
        grass2.scale.set(1.05, 1.05, 1.05)
        grasses.push(grass2)

        const grass3 = mesh.clone()
        grass3.position.set(15, 0, .4)
        grass3.scale.set(1.02, 1.02, 1.02)
        grasses.push(grass3)

        const grass4 = mesh.clone()
        grass4.rotation.y = -3
        grass4.position.set(15, 0, 6.29)
        grass4.scale.set(1, 1, 1)
        grasses.push(grass4)

        const grass5 = mesh.clone()
        grass5.rotation.y = -1.5
        grass5.position.set(9, 0, 6.3)
        grass5.scale.set(1, 1, 1)
        grasses.push(grass5)

        const grass6 = mesh.clone()
        grass6.rotation.y = 2.4
        grass6.position.set(10.8, 0, 7.6)
        grass6.scale.set(1, 1, 1)
        grasses.push(grass6)

        const grass7 = mesh.clone()
        grass7.rotation.y = 2.4
        grass7.position.set(10.8, 0, -7.4)
        grass7.scale.set(1, 1, 1)
        grasses.push(grass7)

        const grass8 = mesh.clone()
        grass8.rotation.y = 3.7
        grass8.position.set(7, 0, -6.1)
        grass8.scale.set(1, 1, 1)
        grasses.push(grass8)

        const grass9 = mesh.clone()
        grass9.rotation.y = 3.7
        grass9.position.set(8.2, 0, -10.3)
        grass9.scale.set(1, 1, 1)
        grasses.push(grass9)

        const grass10 = mesh.clone()
        grass10.rotation.y = 3.7
        grass10.position.set(8.2, 0, -10.3)
        grass10.scale.set(1, 1, 1)
        grasses.push(grass10)

        const grass11 = mesh.clone()
        grass11.rotation.y = 19.3
        grass11.position.set(2.4, 0, -11)
        grass11.scale.set(1, 1, 1)
        grasses.push(grass11)

        const grass12 = mesh.clone()
        grass12.rotation.y = 17
        grass12.position.set(-3.5, 0, -9)
        grass12.scale.set(1, 1, 1)
        grasses.push(grass12)

        const grass13 = mesh.clone()
        grass13.rotation.y = 10
        grass13.position.set(-4.58, 0, -13.2)
        grass13.scale.set(1, 1, 1)
        grasses.push(grass13)

        const grass14 = mesh.clone()
        grass14.rotation.y = 6
        grass14.position.set(-8.7, 0, -13)
        grass14.scale.set(1, 1, 1)
        grasses.push(grass14)

        const grass15 = mesh.clone()
        grass15.rotation.y = 3
        grass15.position.set(-10, 0, -7)
        grass15.scale.set(1, 1, 1)
        grasses.push(grass15)

        const grass16 = mesh.clone()
        grass16.rotation.y = 2.4
        grass16.position.set(-15, 0, -9.3)
        grass16.scale.set(1, 1, 1)
        grasses.push(grass16)

        const grass17 = mesh.clone()
        grass17.rotation.y = -.2
        grass17.position.set(-16, 0, -6.1)
        grass17.scale.set(1, 1, 1)
        grasses.push(grass17)

        const grass18 = mesh.clone()
        grass18.rotation.y = -1.51
        grass18.position.set(-10, 0, -3.5)
        grass18.scale.set(1, 1, 1)
        grasses.push(grass18)

        const grass20 = mesh.clone()
        grass20.rotation.y = .4
        grass20.position.set(-11, 0, -.2)
        grass20.scale.set(1, 1, 1)
        grasses.push(grass20)

        const grass21 = mesh.clone()
        grass21.rotation.y = 1.74
        grass21.position.set(-16, 0, -.21)
        grass21.scale.set(1, 1, 1)
        grasses.push(grass21)

        const grass22 = mesh.clone()
        grass22.rotation.y = 3.7
        grass22.position.set(-11, 0, 5)
        grass22.scale.set(1, 1, 1)
        grasses.push(grass22)

        const grass23 = mesh.clone()
        grass23.rotation.y = 9.5
        grass23.position.set(-7, 0, 8.9)
        grass23.scale.set(1, 1, 1)
        grasses.push(grass23)

        // this.gui.add(grass23.position, "x", -30, 30).name("position x")
        // this.gui.add(grass23.position, "z", -30, 30).name("position z")
        // this.gui.add(grass23.rotation, "y", -30, 30).name("rotation y")

        resolve(grasses)
      })
    })
  }

  get forest(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const forest = [] as THREE.Mesh[];

      this.vendor.fbx({path: "forest/treesL.fbx"}).then((L) => {

        this.treesL = L
        const cornerTreeL1 = this.treesL.clone()
        cornerTreeL1.rotation.y = -4.12
        cornerTreeL1.position.set(16, 0, 16)
        cornerTreeL1.scale.set(3, 3, 3)
        forest.push(cornerTreeL1)

        const cornerTreeL2 = this.treesL.clone()
        cornerTreeL2.rotation.y = -9.3
        cornerTreeL2.position.set(-5, 0, 14.7)
        cornerTreeL2.scale.set(3, 3, 3)
        forest.push(cornerTreeL2)

        const cornerTreeL3 = this.treesL.clone()
        cornerTreeL3.rotation.y = -.6
        cornerTreeL3.position.set(4, 0, 17)
        cornerTreeL3.scale.set(2, 2, 2)
        forest.push(cornerTreeL3)

        const cornerTreeL4 = this.treesL.clone()
        cornerTreeL4.rotation.y = 1.09
        cornerTreeL4.position.set(-11.9, 0, 17)
        cornerTreeL4.scale.set(2.5, 2.5, 2.5)
        forest.push(cornerTreeL4)

        const cornerTreeL5 = this.treesL.clone()
        cornerTreeL5.rotation.y = 5.6
        cornerTreeL5.position.set(10, 0, 12)
        cornerTreeL5.scale.set(2.5, 2.5, 2.5)
        forest.push(cornerTreeL5)

        const cornerTreeL6 = this.treesL.clone()
        cornerTreeL6.rotation.y = 3
        cornerTreeL6.position.set(-16, 0, 10)
        cornerTreeL6.scale.set(2.7, 2.7, 2.7)
        forest.push(cornerTreeL6)

        const cornerTreeL7 = this.treesL.clone()
        cornerTreeL7.rotation.y = -4.1
        cornerTreeL7.position.set(16.5, 0, -6)
        cornerTreeL7.scale.set(3, 3, 3)
        forest.push(cornerTreeL7)

        const cornerTreeL8 = this.treesL.clone()
        cornerTreeL8.rotation.y = -4.1
        cornerTreeL8.position.set(4, 0, -15.2)
        cornerTreeL8.scale.set(3.2, 3.2, 3.2)
        forest.push(cornerTreeL8)

        const cornerTreeL9 = this.treesL.clone()
        cornerTreeL9.rotation.y = 4.8
        cornerTreeL9.position.set(-5, 0, -17.8)
        cornerTreeL9.scale.set(2.7, 2.7, 2.7)
        forest.push(cornerTreeL9)

        this.vendor.fbx({path: "forest/treesM.fbx"}).then((M) => {

          this.treesM = M
          const cornerTreeM1 = this.treesM.clone()
          cornerTreeM1.rotation.y = -4.12
          cornerTreeM1.position.set(12, 0, 15.5)
          cornerTreeM1.scale.set(2.5, 2.5, 2.5)
          forest.push(cornerTreeM1)

          const cornerTreeM2 = this.treesM.clone()
          cornerTreeM2.rotation.y = 4.3
          cornerTreeM2.position.set(13, 0, 6)
          cornerTreeM2.scale.set(3, 3, 3)
          forest.push(cornerTreeM2)

          const cornerTreeM3 = this.treesM.clone()
          cornerTreeM3.rotation.y = 4.3
          cornerTreeM3.position.set(-22, 0, 14.7)
          cornerTreeM3.scale.set(3, 3, 3)
          forest.push(cornerTreeM3)


          const cornerTreeM4 = this.treesM.clone()
          cornerTreeM4.rotation.y = 4.3
          cornerTreeM4.position.set(0, 0, 10)
          cornerTreeM4.scale.set(3, 3, 3)
          forest.push(cornerTreeM4)

          const cornerTreeM5 = this.treesM.clone()
          cornerTreeM5.rotation.y = 1.7
          cornerTreeM5.position.set(-7, 0, 12)
          cornerTreeM5.scale.set(2.5, 2.5, 2.5)
          forest.push(cornerTreeM5)

          const cornerTreeM6 = this.treesM.clone()
          cornerTreeM6.rotation.y = -4.12
          cornerTreeM6.position.set(12, 0, 15.5)
          cornerTreeM6.scale.set(2.3, 2.3, 2.3)
          forest.push(cornerTreeM6)

          const cornerTreeM7 = this.treesM.clone()
          cornerTreeM7.rotation.y = 5
          cornerTreeM7.position.set(14, 0, 4)
          cornerTreeM7.scale.set(2.3, 2.3, 2.3)
          forest.push(cornerTreeM7)

          const cornerTreeM8 = this.treesM.clone()
          cornerTreeM8.rotation.y = -13.2
          cornerTreeM8.position.set(15, 0, 2)
          cornerTreeM8.scale.set(2.7, 2.7, 2.7)
          forest.push(cornerTreeM8)

          const cornerTreeM9 = this.treesM.clone()
          cornerTreeM9.rotation.y = -13
          cornerTreeM9.position.set(-15, 0, -13.9)
          cornerTreeM9.scale.set(3, 3, 3)
          forest.push(cornerTreeM9)

          const cornerTreeM10 = this.treesM.clone()
          cornerTreeM10.rotation.y = -12
          cornerTreeM10.position.set(-14, 0, -9)
          cornerTreeM10.scale.set(3.3, 3.3, 3.3)
          forest.push(cornerTreeM10)

          resolve(forest)
        })

      })

    })
  }

  get ground(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const fields = [] as THREE.Mesh[]
      const grassLGeo = new THREE.BoxGeometry(40, 1, 40)
      const grassLMat = new THREE.MeshPhongMaterial({color: "#2ecc71"})
      const grassL = new THREE.Mesh(grassLGeo, grassLMat)

      grassL.position.y = -.5
      fields.push(grassL)

      const baseGeo = new THREE.CylinderGeometry(8, 8, .01, 5)
      const baseMat = new THREE.MeshPhongMaterial({color: "#f6e58d"})
      const base = new THREE.Mesh(baseGeo, baseMat)
      base.position.y = .01

      fields.push(base)

      resolve(fields)
    })
  }

  public publish(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      let data = [] as THREE.Mesh[]
      this.mountain.then((mountain) => {
        data = [...mountain]
        this.rocks.then(rocks => {
          data = [...data, ...rocks]
          this.grass.then(grasses => {
            data = [...data, ...grasses]
            this.forest.then(forest => {
              data = [...data, ...forest]
              this.ground.then(grounds => {
                data = [...data, ...grounds]
                resolve(data)
              })
            })
          })
        })
      })
    })
  }
}
