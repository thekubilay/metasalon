import gsap from "gsap";
import Element from "@/environments/office/Element";

export default class Office {
  public element = new Element()

  public entryAnim(game: any): void {

  }

  public update(): void {
    // this.flag.update()
  }

  public publish(game: any): void {
    this.element.publish().then(meshes => {
      meshes.forEach((mesh: any) => {
        game.scene.add(mesh)
      })
    })
  }
}
