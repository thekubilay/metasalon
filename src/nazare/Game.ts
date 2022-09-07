import * as THREE from 'three';

import WebGL from '@/nazare/WebGL';
import Mesh from '@/nazare/Mesh';
import Raycaster from '@/nazare/Raycaster';
import KeyListener from '@/nazare/KeyListener';
import PlayerInitialize from '@/nazare/PlayerInitialize';
import PlayerRotation from '@/nazare/PlayerRotation';
import {GameSettings} from '@/types/GameSetting';
import {Player} from '@/types/Player';
import Engine from "@/nazare/Engine";

export default class Game extends WebGL {
  multiplayer: null | { start: () => void, playerDataUpdate: (args: any) => void } = null;
  playerData = {} as Player;
  playerRotationClass = {} as PlayerRotation;
  playersInitClasses = [] as PlayerInitialize[];

  environments: any[] = [];
  keyListener = new KeyListener();
  raycaster = new Raycaster();
  // physics = new MeshPhysic(this);
  meshes = new Mesh();
  engine = new Engine()

  constructor() {
    super();
  }

  start(settings: GameSettings) {
    super.init(settings).then(() => {
      this.engine.start();
      this.meshes.create(this);
      this.keyListener.start();
      this.renderer.render(this.scene, this.camera);

      if (this.multiplayer) {
        this.multiplayer.start();
      }

      if (settings.raycaster) {
        this.raycaster.start()
      }

    });
  }

  singleplayer(data: Player | null): void {
    if (data) this.playerData = data
    this.playerRotationClass = new PlayerRotation(this.playerData, true, this);
    this.render();

  }

  setPlayerIntoGame(player: Player) {
    /* player contains character information etc. */
    this.playersInitClasses.push(new PlayerInitialize(player, false, this));
  }

  unsetPlayerFromGame(socketID: string) {
    /* already created player class loop */
    const character = this.playersInitClasses.find((playerInitialize) => {
      return playerInitialize.object.userData.socketID === socketID;
    });

    // character?.nameTag?.removeFromParent();
    character?.object.removeFromParent();
    this.scene.remove(character?.object as THREE.Object3D);
  }

  setTimes(): void {
    this.delta = this.clock.getDelta();
    this.elapsedTime = this.clock.getElapsedTime();
  }

  setRotationOnSelf(): void {
    /* self rotate */
    this.playerRotationClass.rotateAndMove();
  }

  setRotationOnOtherPlayers(): void {
    /* players x,y rotate update */
    if (this.multiplayer){
      for (let i = this.playersInitClasses.length; i--;) {
        this.playersInitClasses[i].animate(this.delta);
      }
    }
  }

  setRaycaster(): void {
    if (this.settings.raycaster) this.raycaster.update(this.camera, this.scene);
  }

  render() {
    this.engine.inLoop(() => {

      this.delta = this.clock.getDelta();
      this.elapsedTime = this.clock.getElapsedTime();

      this.playerRotationClass.rotateAndMove();

      for (let i = this.playersInitClasses.length; i--;) {
        this.playersInitClasses[i].animate(this.delta);
      }

      this.raycaster.update(this.camera, this.scene);

      this.orbit.update()
      this.renderer.render(this.scene, this.camera)
      // this.tag.render(this.scene, this.camera)
    })
  }
}
