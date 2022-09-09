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

      /* create environments */
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
    this.playerRotationClass.rotateAndMove(this.settings.rotation = true);
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

  private render() {
    this.engine.inLoop(() => {
      this.setTimes()
      this.setRotationOnSelf()
      this.setRotationOnOtherPlayers()
      this.setRaycaster()

      this.orbit.update()
      this.renderer.render(this.scene, this.camera)
      // this.tag.render(this.scene, this.camera)
    })
  }
}
