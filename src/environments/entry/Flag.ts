import * as THREE from "three";

export default class Flag {
  flags = [] as THREE.Mesh[]

  private get salons(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      const flags = [] as THREE.Mesh[]

      for (let i = 1; i <= 5; i++) {
        if (i === 1) {
          const f = {
            rotation: {x: 0, y: -2.46, z: 0},
            position: {x: 8, y: 6.5, z: 10},
            frontSrc: "forest/tennouji_poster.jpg",
            backSrc: "forest/fukushima_poster.jpg",
            segW: 6.3,
            segH: 7.5,
          };
          const flag = Flag.createFlag(f)

          flags.push(flag)
        } else if (i === 2) {
          const f = {
            rotation: {x: 0, y: 1.2, z: 0},
            position: {x: -12.2, y: 6.5, z: -3.5},
            frontSrc: "forest/tanimachi_poster.jpg",
            backSrc: "forest/fukushima_poster.jpg",
            segW: 6.3,
            segH: 7.5,
          };
          const flag = Flag.createFlag(f)
          flags.push(flag)
        } else if (i === 3) {
          const f = {
            rotation: {x: 0, y: 0, z: 0},
            position: {x: 0, y: 6.5, z: -12.5},
            frontSrc: "forest/matsuyamachi_poster.jpg",
            backSrc: "forest/fukushima_poster.jpg",

            segW: 6.3,
            segH: 7.5,
          };
          const flag = Flag.createFlag(f,)
          flags.push(flag)
        } else if (i === 4) {
          const f = {
            rotation: {x: 0, y: -1.3, z: 0},
            position: {x: 12, y: 6.5, z: -3.4},
            frontSrc: "forest/kitasenri_poster.jpg",
            backSrc: "forest/fukushima_poster.jpg",
            segW: 6.3,
            segH: 7.5,
          };
          const flag = Flag.createFlag(f,)
          flags.push(flag)
          resolve(flags)
        } else if (i === 5) {
          const f = {
            rotation: {x: 0, y: -3.78, z: 0},
            position: {x: -7, y: 6.5, z: 10.1},
            frontSrc: "forest/fukushima_poster.jpg",
            backSrc: "forest/fukushima_poster.jpg",
            segW: 6.3,
            segH: 7.5,
          };
          const flag = Flag.createFlag(f,)
          flags.push(flag)
          resolve(flags)
        }
      }
    })
  }

  private static createFlag(f: any): THREE.Mesh {
    const textureF = new THREE.TextureLoader().load(f.frontSrc)
    const textureB = new THREE.TextureLoader().load(f.backSrc)

    const geometry = new THREE.PlaneBufferGeometry(f.segW, f.segH, f.segW, f.segH)
    const materials = [
      new THREE.MeshBasicMaterial({color: new THREE.Color("#fff"), map: textureF, side: THREE.FrontSide}),
      new THREE.MeshBasicMaterial({color: new THREE.Color("#fff"), map: textureB, side: THREE.BackSide})
    ];

    const material = new THREE.MeshBasicMaterial({color: new THREE.Color("#fff"), map: textureF, side: THREE.DoubleSide})

    const flag = new THREE.Mesh(geometry, material)

    // flag.material.map = new THREE.TextureLoader().load(f.frontSrc)
    flag.rotation.set(f.rotation.x, f.rotation.y, f.rotation.z)
    flag.position.set(f.position.x, f.position.y, f.position.z)
    flag.userData = {
      segW: f.segW,
      segH: f.segH
    }
    return flag
  }


  public update(): void {
    const swing = .3
    const speed = .2
    const horizontal = .3
    const vertical = 2

    this.flags.forEach((mesh: THREE.Mesh) => {
      const positionAttribute = mesh.geometry.getAttribute('position');

      /* deprecated */
      // for (let i = 0; i < positionAttribute.count; i++) {
      //   const x = positionAttribute.getX(i);
      //   const value = 0.2 * Math.sin(x * .2 + this.elapsedTime);
      //   positionAttribute.setZ(i, value);
      // }

      for (let x = 0; x < mesh.userData.segW + 1; x++) {
        for (let y = 0; y < mesh.userData.segW + 1; y++) {
          const index = x + y * (mesh.userData.segH + 1);
          const time = Date.now() * speed / 50;
          const value = Math.sin(vertical * x + horizontal * y - time) * swing * x / 5
          positionAttribute.setZ(index, value);
        }
      }

      positionAttribute.needsUpdate = true;

    })
  }

  public publish(): Promise<THREE.Mesh[]> {
    return new Promise((resolve) => {
      this.salons.then((meshes) => {
        this.flags = meshes
        resolve(meshes)
      })
    })
  }
}
