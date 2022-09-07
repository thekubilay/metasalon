import Loader from "@/nazare/Loader";
import * as THREE from "three";
import {GUI} from "dat.gui";

export default class Booth {
  vendor = new Loader()
  gui = new GUI()

  get booth1(): Promise<THREE.Mesh> {
    return new Promise((resolve) => {
      this.setMeshElement({
        path: "models/env/booth_1.fbx",
        name: "booth1",
        scale: [.75, .5, .5],
        rotation: [0, .67, 0],
        position: [2.5, -1.4, -6.6],
        video: {
          src: "videos/tanimachi.mp4",
          size: [10, 6, .2],
          rotation: 1.52,
          position: [.9, 8, 50]
        },
        poster: {
          img: "textures/tanimati.jpg",
          size: [4, 5, .1],
          rotation: 6.3,
          position: [-2.5, 6.2, 58],
          link: "https://app.reactool.jp/430972345",
        },

        brand: {
          img: "textures/brand.jpg",
          size: [2.7, 1.7, .1],
          rotation: 6.3,
          position: [-9, 10.6, 58.5]
        },
        depth: {
          scale: [1, 1, 1],
          rotation: [0, 5.6, 0],
          position: [2.5, 0, 15],
          path: "models/env/lamp.fbx",
          name: "booth1_lamp",
        }
      }).then((booth: THREE.Mesh) => {
        resolve(booth)
      })
    })
  }

  get booth2(): Promise<THREE.Mesh> {
    return new Promise((resolve) => {
      this.setMeshElement({
        path: "models/env/booth_2.fbx",
        name: "booth2",
        scale: [.75, .5, .5],
        rotation: [0, -.6, 0],
        position: [6.4, -1.4, 1],
        video: {
          src: "videos/kitasenri.mp4",
          size: [10, 6, .2],
          rotation: 1.52,
          position: [.9, 8, 50]
        },
        poster: {
          img: "textures/kitasenri.jpg",
          size: [4, 5, .1],
          rotation: 6.3,
          position: [-2.5, 6.2, 58],
          link: "https://app.reactool.jp/902154407"
        },

        brand: {
          img: "textures/brand.jpg",
          size: [2.7, 1.7, .1],
          rotation: 6.3,
          position: [-9, 10.6, 58.5]
        },
        depth: {
          scale: [1, 1, 1],
          rotation: [0, 5.6, 0],
          position: [2.5, 0, 15],
          path: "models/env/lamp.fbx",
          name: "booth1_lamp",
        }
      }).then((booth: THREE.Mesh) => {
        resolve(booth)
      })
    })
  }
  get booth3(): Promise<THREE.Mesh> {
    return new Promise((resolve) => {
      this.setMeshElement({
        path: "models/env/booth_3.fbx",
        name: "booth3",
        scale: [.75, .5, .5],
        rotation: [0, -1.85, 0],
        position: [.8, -1.4, 6.2],
        video: {
          src: "videos/matsuyamachi.mp4",
          size: [10, 6, .2],
          rotation: 1.52,
          position: [.9, 8, 50]
        },
        poster: {
          img: "textures/matsuyamachi.jpg",
          size: [4, 5, .1],
          rotation: 6.3,
          position: [-2.5, 6.2, 58],
          link: "https://app.reactool.jp/303512941"
        },

        brand: {
          img: "textures/brand.jpg",
          size: [2.7, 1.7, .1],
          rotation: 6.3,
          position: [-9, 10.6, 58.5]
        },
        depth: {
          scale: [1, 1, 1],
          rotation: [0, 5.6, 0],
          position: [2.5, 0, 15],
          path: "models/env/lamp.fbx",
          name: "booth1_lamp",
        }
      }).then((booth: THREE.Mesh) => {
        resolve(booth)
      })
    })
  }


  get booth4(): Promise<THREE.Mesh> {
    return new Promise((resolve) => {
      this.setMeshElement({
        path: "models/env/booth_4.fbx",
        name: "booth4",
        scale: [.75, .5, .5],
        rotation: [0, -3.1, 0],
        position: [-5.6, -1.4, 2],
        video: {
          src: "videos/fukushima.mp4",
          size: [10, 6, .2],
          rotation: 1.52,
          position: [.9, 8, 50]
        },
        poster: {
          img: "textures/osakafukushima.jpg",
          size: [4, 5, .1],
          rotation: 6.3,
          position: [-2.5, 6.2, 58],
          link: "https://app.reactool.jp/371140418"
        },

        brand: {
          img: "textures/brand.jpg",
          size: [2.7, 1.7, .1],
          rotation: 6.3,
          position: [-9, 10.6, 58.5]
        },
        depth: {
          scale: [1, 1, 1],
          rotation: [0, 5.6, 0],
          position: [2.5, 0, 15],
          path: "models/env/lamp.fbx",
          name: "booth1_lamp",
        }
      }).then((booth: THREE.Mesh) => {
        resolve(booth)
      })
    })
  }

  get booth5(): Promise<THREE.Mesh> {
    return new Promise((resolve) => {
      this.setMeshElement({
        path: "models/env/booth_5.fbx",
        name: "booth3",
        scale: [.75, .5, .5],
        rotation: [0, -4.37, 0],
        position: [-5.3, -1.4, -4],
        video: {
          src: "videos/tennouji.mp4",
          size: [10, 6, .2],
          rotation: 1.52,
          position: [.9, 8, 50]
        },
        poster: {
          img: "textures/tenojikatsuyama.jpg",
          size: [4, 5, .1],
          rotation: 6.3,
          position: [-2.5, 6.2, 58],
          link: "https://app.reactool.jp/527218328"
        },

        brand: {
          img: "textures/brand.jpg",
          size: [2.7, 1.7, .1],
          rotation: 6.3,
          position: [-9, 10.6, 58.5]
        },
        depth: {
          scale: [1, 1, 1],
          rotation: [0, 5.6, 0],
          position: [2.5, 0, 15],
          path: "models/env/lamp.fbx",
          name: "booth1_lamp",
        }
      }).then((booth: THREE.Mesh) => {
        resolve(booth)
      })
    })
  }

  setVideo(options: any) {
    let element: HTMLVideoElement;

    element = document.createElement("video")
    element.muted = true
    element.setAttribute("src", options.src)
    element.setAttribute("loop", "")
    element.setAttribute("autoplay", "")
    element.play()

    const texture = new THREE.VideoTexture(element)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter


    const geometry = new THREE.BoxGeometry(options.size[0], options.size[1], options.size[2])

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
      toneMapped: false
    })

    const video = new THREE.Mesh(geometry, material)

    video.rotation.y = 1.52
    video.position.set(options.position[0], options.position[1], options.position[2])

    return video
  }

  setBrand(options: any) {
    const texture = new THREE.TextureLoader().load(options.img);
    const geometry = new THREE.BoxGeometry(options.size[0], options.size[1], options.size[2])
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
    })
    const brand = new THREE.Mesh(geometry, material)

    brand.rotation.y = options.rotation
    brand.position.set(options.position[0], options.position[1], options.position[2])

    return brand
  }

  setPoster(options: any) {
    const texture = new THREE.TextureLoader().load(options.img);
    const geometry = new THREE.BoxGeometry(4, 5, .1)
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
    })

    const poster = new THREE.Mesh(geometry, material)
    poster.name = "poster"
    poster.userData = {link: options?.link || ""}
    poster.rotation.y = options.rotation
    poster.position.set(options.position[0], options.position[1], options.position[2])

    return poster
  }

  setMeshElement(args: any): Promise<THREE.Mesh> {
    return new Promise((resolve, reject) => {
      this.vendor.fbx(args).then((booth) => {
        booth.scale.set(args.scale[0], args.scale[1], args.scale[2])
        booth.rotation.set(args.rotation[0], args.rotation[1], args.rotation[2])
        booth.position.set(args.position[0], args.position[1], args.position[2])

        if (args.hasOwnProperty("depth")) {
          this.vendor.fbx(args.depth).then((lamp) => {
            lamp.scale.set(args.depth.scale[0], args.depth.scale[1], args.depth.scale[2])
            lamp.rotation.set(args.depth.rotation[0], args.depth.rotation[1], args.depth.rotation[2])
            lamp.position.set(args.depth.position[0], args.depth.position[1], args.depth.position[2])

            booth.add(this.setVideo(args.video))
            booth.add(this.setPoster(args.poster))
            booth.add(this.setBrand(args.brand))
            booth.add(lamp)

            // this.gui.add(mesh.rotation, "x", -10, 10).name("rotation x")
            // this.gui.add(mesh.rotation, "y", -10, 10).name("rotation y")
            // this.gui.add(mesh.rotation, "z", -10, 10).name("rotation z")
            //
            // this.gui.add(mesh.position, "x", -100, 100).name("position x")
            // this.gui.add(mesh.position, "y", -100, 100).name("position y")
            // this.gui.add(mesh.position, "z", -100, 100).name("position z")
            //
            // this.gui.add(mesh.scale, "x", -100, 20).name("scale x")
            // this.gui.add(mesh.scale, "y", -100, 20).name("scale y")
            // this.gui.add(mesh.scale, "z", -100, 20).name("scale z")

            resolve(booth)
          })
        }
      })
    })
  }

  update(): void {

  }

  publish(game: any): void {
    this.booth1.then(mesh => {
      game.scene.add(mesh)

    })
    this.booth2.then(mesh => {
      game.scene.add(mesh)
    })

    this.booth3.then(mesh => {
      game.scene.add(mesh)
    })

    this.booth4.then(mesh => {
      game.scene.add(mesh)
    })

    this.booth5.then(mesh => {
      game.scene.add(mesh)
    })
  }
}
