import * as THREE from 'three';
import Game from '@/nazare/Game';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';
import {AnimationClip} from 'three';

import {Player} from '@/types/Player';

export default class PlayerInitialize {
  playerData = {} as Player;
  self = false;
  object = new THREE.Object3D();
  clips = [] as AnimationClip[];
  mixer?: THREE.AnimationMixer;
  root?: THREE.Object3D;
  animDuration = 0.2;
  // nameTag: CSS2DObject;
  action = 'Idle';
  game = {} as Game;

  constructor(playerData: Player = {} as Player, self = false, game: Game) {
    this.game = game;
    this.self = self;
    this.playerData = playerData;
    // this.nameTag = createNameTag(this.playerData.charNickname as string, this.playerData.sessionID, this.self) as CSS2DObject
    // this.nameTag.position.y = this.nameTag.position.y + 2.1
    this.init();
  }

  init() {
    const model = this.playerData.charFilePath || "models/soldier.glb"
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(model, (gltf) => {

        const char: any = gltf.scene;

        // object.add(this.nameTag)

        char.name = this.playerData.charNickname;
        char.mixer = new THREE.AnimationMixer(char);
        // object.scale.set(0.1, 0.1, 0.1)
        this.root = char;
        this.mixer = char.mixer;
        this.clips = gltf.animations.filter((item) => item.name !== 'TPose');

        char.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.object = new THREE.Object3D();
        this.object.userData = this.playerData.charData as object;
        this.object.add(char);
        this.game.scene.add(this.object);

        const toPlayClip = THREE.AnimationClip.findByName(this.clips, 'Idle');
        const toPlayAction = this.mixer?.clipAction(toPlayClip);
        toPlayAction?.play();
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        // console.log(error)
      },
    );
  }

  animate(delta: number): void {
    this.mixer?.update(delta);

    if (this.clips.length) {
      if (this.action !== this.playerData.charData?.action) {
        const currentClip = THREE.AnimationClip.findByName(this.clips, this.action);
        const current = this.mixer?.clipAction(currentClip);

        const toPlayClip = THREE.AnimationClip.findByName(this.clips, this.playerData.charData?.action as string);
        const toPlayAction = this.mixer?.clipAction(toPlayClip);

        current?.fadeOut(0.2);
        toPlayAction?.reset().fadeIn(0.2).play();

        this.action = this.playerData.charData?.action as string;
      }

      this.object.position.set(
        this.playerData.charData?.x as number,
        this.playerData.charData?.y as number,
        this.playerData.charData?.z as number,
      );
      const euler = new THREE.Euler(
        this.playerData.charData?.pb as number,
        this.playerData.charData?.heading as number,
        this.playerData.charData?.pb as number,
      );
      this.object.quaternion.setFromEuler(euler);
    }
  }
}
