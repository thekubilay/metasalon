import * as THREE from 'three';

import WebGL from '@/nazare/WebGL';
import Mesh from '@/nazare/Mesh';
import Raycaster from '@/nazare/Raycaster';
import KeyListener from '@/nazare/KeyListener';
import PlayerInitialize from '@/nazare/PlayerInitialize';
import PlayerRotation from '@/nazare/PlayerRotation';
import Engine from "@/nazare/Engine";

import {GameSettings} from '@/types/GameSetting';
import {Player} from '@/types/Player';
import {MultiplayerSetting} from "@/types/GameSetting";

export default class Game extends WebGL {
  private isMultiplayerOn = false
  private raycaster = new Raycaster();
  // physics = new MeshPhysic(this);
  private meshes = new Mesh();
  private teleportAlert = false;

  public multiplayer = {} as MultiplayerSetting;
  public keyListener = new KeyListener();
  public environments: any[] = [];
  public playerData = {} as Player;
  public engine = new Engine()
  public playerRotationClass = {} as PlayerRotation;
  public playersInitClasses = [] as PlayerInitialize[];


  constructor() {
    super();
  }

  public start(settings: GameSettings): void {
    super.init(settings).then(() => {

      this.engine.start();

      this.keyListener.start();
      this.renderer.render(this.scene, this.camera);

      /* set environments */
      this.environments = settings?.environments || []
      this.meshes.create(this);

      /* set multiplayer ability*/
      this.multiplayer = settings?.multiplayer || {} as MultiplayerSetting

      if (Object.keys(this.multiplayer).length) {
        this.isMultiplayerOn = true
        this.multiplayer?.start(this)
      }

      if (settings.raycaster) this.raycaster.start()

    });
  }

  public singleplayer(data: Player | null): void {
    if (data) this.playerData = data
    this.playerRotationClass = new PlayerRotation(this.playerData, true, this);
    this.render();
  }

  public setPlayerIntoGame(player: Player) {
    /* player contains character information etc. */
    this.playersInitClasses.push(new PlayerInitialize(player, false, this));
  }

  public unsetPlayerFromGame(socketID: string) {
    /* already created player extract from scene */
    const character = this.playersInitClasses.find((playerInitialize) => {
      return playerInitialize.object.userData.socketID === socketID;
    });

    // character?.nameTag?.removeFromParent();
    character?.object.removeFromParent();
    this.scene.remove(character?.object as THREE.Object3D);
  }

  private setTimes(): void {
    this.delta = this.clock.getDelta();
    this.elapsedTime = this.clock.getElapsedTime();
  }

  private setRotationOnSelf(): void {
    /* self rotate */
    this.playerRotationClass.rotateAndMove(this.settings.rotation);
  }

  private setRotationOnOtherPlayers(): void {
    /* players x,y rotate update */
    if (this.isMultiplayerOn) {
      for (let i = this.playersInitClasses.length; i--;) {
        this.playersInitClasses[i].animate(this.delta);
      }
    }
  }

  private setRaycaster(): void {
    if (this.settings.raycaster) this.raycaster.update(this.camera, this.scene);
  }

  private setTeleportData(salonName: string, teleportID: string): void {
    // console.log(salonName)
    this.settings.rotation = false
    const teleport = document.getElementById("dt") as HTMLDivElement
    const pTag = document.getElementById("mapText") as HTMLParagraphElement
    pTag.children[0].textContent = "ブランズ" + salonName + "のマンションサロンへ"
    pTag.setAttribute("data-teleport", teleportID)
    teleport.style.display = "flex"
    this.teleportAlert = true
  }

  private setTeleportMachine(coords: { x: number, z: number }): void {
    // if (this.teleportAlert) return
    if ((coords.x >= 4.7 && coords.x <= 5.5) && (coords.z >= 6.5 && coords.z <= 7.5)) {
      if (!this.teleportAlert) {
        this.setTeleportData("天王寺勝山", "527218328")
      }
    } else if ((coords.x >= 7.7 && coords.x <= 8.6) && (coords.z <= -2.6 && coords.z >= -3.1)) {
      if (!this.teleportAlert) {
        this.setTeleportData("北千里", "902154407")
      }
    } else if ((coords.x <= -.1 && coords.x >= -.5) && (coords.z <= -8.5 && coords.z >= -9.1)) {
      if (!this.teleportAlert) {
        this.setTeleportData("大阪松屋町", "303512941")
      }
    } else if ((coords.x <= -8 && coords.x >= -8.5) && (coords.z <= -2.4 && coords.z >= -2.9)) {
      if (!this.teleportAlert) {
        this.setTeleportData("タワー谷町四丁目", "430972345")
      }
    } else if ((coords.x <= -4.3 && coords.x >= -5.1) && (coords.z >= 6.9 && coords.z <= 7.4)) {
      if (!this.teleportAlert) {
        this.setTeleportData("大阪福島", "371140418")
      }
    } else {
      this.teleportAlert = false
    }
  }

  private render() {
    this.renderer.setAnimationLoop(() => {
      this.setTimes()
      this.setRotationOnSelf()
      this.setRotationOnOtherPlayers()
      this.setRaycaster()
      this.setTeleportMachine({
        x: this.playerRotationClass.object.position.x,
        z: this.playerRotationClass.object.position.z
      })

      this.environments.forEach(env => {
        env.update()
      })
      this.orbit.update()
      this.renderer.render(this.scene, this.camera)
      this.tag.render(this.scene, this.camera)

    })
    // this.engine.inLoop(() => {
    //   this.setTimes()
    //   this.setRotationOnSelf()
    //   this.setRotationOnOtherPlayers()
    //   this.setRaycaster()
    //
    //   this.orbit.update()
    //   this.renderer.render(this.scene, this.camera)
    //   // this.tag.render(this.scene, this.camera)
    // })
  }
}
