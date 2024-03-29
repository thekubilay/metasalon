import gsap from "gsap";
import Sky from "@/environments/entry/Sky";
import Flag from "@/environments/entry/Flag";
import Ground from "@/environments/entry/Ground";
import Portal from "@/environments/entry/Portal";

export default class Init {
  public sky = new Sky()
  public ground = new Ground()
  public flag = new Flag()
  public portal = new Portal()

  public entryAnim(game: any): void {
    // document.getElementById("canvas")!.focus()
    // let x = 0
    // const tl = gsap.timeline();
    // tl.to(game.camera.position, {
    //   duration: 8.5,
    //   onUpdate: () => {
    //     x += .7
    //     if (x < 360) {
    //       game.camera.position.x = game.camera.position.x = 40 * Math.sin(-x * Math.PI / 180)
    //       game.camera.position.z = game.camera.position.z = 70 * Math.cos(-x * Math.PI / 180)
    //     }
    //   }
    // })
    //
    // tl.to(game.camera.position, {
    //   x: 0, y: 3, z: 10, duration: 3.3
    // })
    //
    // tl.to(game.camera.position, {
    //   x: 0, y: 4, z: 7, duration: 1.5, onComplete: () => {
    //     game.orbit.enableRotate = true;
    //     game.orbit.enableRotate = true;
    //     game.orbit.maxDistance = 10
    //     /* user rotation listener starts */
    //     game.keyListener.start()
    //   }
    // })
  }

  public update(): void {
    // this.flag.update()
  }

  public publish(game: any): void {
    // this.sky.publish().then(meshes => {
    //   meshes.forEach((mesh: any) => {
    //     game.scene.add(mesh)
    //   })
    // })

    this.ground.publish().then(meshes => {
      meshes.forEach((mesh: any) => {
        game.scene.add(mesh)
      })
    })


    // this.flag.publish().then(meshes => {
    //   meshes.forEach((mesh: any) => {
    //     game.scene.add(mesh)
    //   })
    // })

    this.portal.publish().then(meshes => {
      meshes.forEach((mesh: any) => {
        game.scene.add(mesh)
      })
    })
  }
}
