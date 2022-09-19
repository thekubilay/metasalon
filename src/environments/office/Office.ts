import gsap from "gsap";
import Map from "@/environments/office/Map";
import Element from "@/environments/office/Element";

export default class Office {
  private map = new Map()
  private element = new Element()

  public entryAnim(game: any): void {

  }

  public update(): void {
    // this.flag.update()
  }

  public publish(game: any): void {
    this.map.publish(game).then(meshes => {
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
