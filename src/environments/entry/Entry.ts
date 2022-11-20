import gsap from "gsap";
import Map from "@/environments/entry/Map";
import Flag from "@/environments/entry/Flag";
import * as THREE from "three";

export default class Entry {
  private map = new Map()
  private flag = new Flag()

  public entryAnim(game: any): void {
    /* update camera target */
    const cameraTarget = new THREE.Vector3();
    cameraTarget.x = game.playerRotationClass.object.position.x as number;
    cameraTarget.y = (game.playerRotationClass.object.position.y as number) + 4;
    cameraTarget.z = (game.playerRotationClass.object.position.z as number) + 8;


    const tl = gsap.timeline();

    tl.to(game.camera.position, {
      x: cameraTarget.x, y: cameraTarget.y, z: cameraTarget.z, duration: 3.3, onComplete: () => {

        game.camera.position.x = cameraTarget.x;
        game.camera.position.z = cameraTarget.z;

        game.orbit.enableZoom = true;
        game.orbit.enableRotate = true;
        game.orbit.maxDistance = 20;
        game.orbit.target = new THREE.Vector3(
          game.playerRotationClass.object.position.x as number,
          game.playerRotationClass.object.position.y as number + 3 ,
          game.playerRotationClass.object.position.z as number
        );
        game.orbit.update()
        game.keyListener.start()
        document.getElementById("canvas")?.focus()
      }
    })
  }

  public greetings(): void {
    let j = 0;
    const texts = [
      "ブランズメタサロンへようこそ",
      "周りにある黄色のテレポートに入ると",
      "マンションサロンへ飛ぶことができます",
    ]
    setTimeout(() => {
      const welcomeText = document.getElementById("welcomeText") as HTMLSpanElement;

      setTimeout(() => {
        welcomeText.textContent = texts[j]
        setTimeout(() => {
          welcomeText.style.opacity = "1"
          if (j === 2) j = 0
          else j += 1
        }, 500)
      }, 500)
    }, 2000)


    setTimeout(() => {
      const welcomeText = document.getElementById("welcomeText") as HTMLSpanElement;
      setInterval((): void => {
        welcomeText.style.opacity = "0"
        setTimeout(() => {
          welcomeText.textContent = texts[j]
          setTimeout(() => {
            welcomeText.style.opacity = "1"
            if (j === 2) j = 0
            else j += 1
          }, 500)
        }, 500)
      }, 3000)
    }, 2000)
  }

  public update(): void {
    this.flag.update()
    this.map.update()
  }

  public publish(game: any): void {
    this.map.publish().then(meshes => {
      meshes.forEach((mesh: any) => {
        game.scene.add(mesh)
      })
      this.greetings()
    })


    this.flag.publish().then(meshes => {
      meshes.forEach((mesh: any) => {
        game.scene.add(mesh)
      })
    })
  }
}
