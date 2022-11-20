import gsap from "gsap";
import Map from "@/environments/office/Map";
import Element from "@/environments/office/Element";
import * as THREE from "three";

export default class Office {
  private map = new Map()
  private element = new Element()

  public entryAnim(game: any): void {
    game.orbit.enableZoom = true;
    game.orbit.enableRotate = true;
  }

  public update(): void {
    // this.flag.update()
  }

  public publish(game: any): void {
    this.map.publish().then(meshes => {
      meshes.forEach((mesh: any) => {
        game.scene.add(mesh)
      })
    })
    this.element.publish().then(meshes => {
      meshes.forEach((mesh: any) => {
        game.scene.add(mesh)
      })
    })
  }
}
