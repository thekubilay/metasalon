import * as THREE from 'three';
import Game from '../nazare/Game';
import PlayerInitialize from '../nazare/PlayerInitialize';
import {A, D, DIRECTIONS, S, W, Forward, Backward, Left, Right, ARROWS} from '@/utils/directions';
import {Player} from '@/types/Player';
import Physic from "@/nazare/Physic";

export default class PlayerRotation extends PlayerInitialize {
  game = {} as Game;
  walkDirection = new THREE.Vector3();
  rotateAngle = new THREE.Vector3(0, 1, 0);
  rotateQuarternion = new THREE.Quaternion();
  cameraTarget = new THREE.Vector3();
  runVelocity = 5;
  walkVelocity = 2;

  constructor(playerData: Player, self = false, game: Game) {
    super(playerData, self, game);
    this.game = game;
  }

  animate() {
    this.mixer?.update(this.game.delta);
    const direction = [...DIRECTIONS, ...ARROWS].some((key) => this.game.keyListener.keys[key]);
    const newAction = direction ? 'Run' : 'Idle';

    if (this.action !== newAction && this.clips.length) {
      const currentClip = THREE.AnimationClip.findByName(this.clips, this.action);
      const current = this.mixer?.clipAction(currentClip);

      const toPlayClip = THREE.AnimationClip.findByName(this.clips, newAction);
      const toPlayAction = this.mixer?.clipAction(toPlayClip);

      current?.fadeOut(0.2);
      toPlayAction?.reset().fadeIn(0.2).play();

      this.action = newAction;
    }
  }

  publish() {
    const args = {
      x: this.object?.position.x,
      y: this.object?.position.y,
      z: this.object?.position.z,
      heading: this.object?.rotation.y,
      pb: this.object?.rotation.x,
      action: this.action || "Idle",
    };

    /* publishing current position with other users*/
    this.game.multiplayer.updatePlayerData(args)
  }

  rotateAndMove(rotation: boolean, characterPhysic: any) {
    this.animate();
    const xDiff = Math.abs(characterPhysic.position.x) - Math.abs(this.object.position.x)
    const zDiff = Math.abs(characterPhysic.position.z) - Math.abs(this.object.position.z)

    if (xDiff > 2 || zDiff > 2){
      characterPhysic.position.x = 0
      characterPhysic.position.y = .5
      characterPhysic.position.z = 21.315925775403738
      this.object.position.x = characterPhysic.position.x
      this.object.position.z = characterPhysic.position.z
    }

    if (this.action !== 'Idle' && rotation) {
      // calculate towards camera direction
      const angleYCameraDirection = Math.atan2(
        this.game.camera.position.x - this.object.position.x,
        this.game.camera.position.z - this.object.position.z,
      );

      // diagonal movement angle offset
      const directionOffset = this.setMotion(this.game.keyListener.keys);

      // rotate model
      this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, angleYCameraDirection + directionOffset);
      this.object?.quaternion.rotateTowards(this.rotateQuarternion, 0.2);

      // calculate direction
      this.game.camera.getWorldDirection(this.walkDirection);
      this.walkDirection.y = 0;
      this.walkDirection.normalize();
      this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

      // run/walk velocity
      const velocity = this.action === 'Run' ? this.runVelocity : this.walkVelocity;

      // move model & camera
      const moveX = this.walkDirection.x * velocity * this.game.delta;
      const moveZ = this.walkDirection.z * velocity * this.game.delta;

      characterPhysic.position.x += moveX;
      characterPhysic.position.z += moveZ;

      // this.object.position.copy(characterPhysic.position)
      this.object.position.x = characterPhysic.position.x
      this.object.position.z = characterPhysic.position.z

      /* update camera target */
      this.game.camera.position.x += moveX;
      this.game.camera.position.z += moveZ;
      this.cameraTarget.x = this.object.position.x as number;
      this.cameraTarget.y = (this.object.position.y as number) + 3;
      this.cameraTarget.z = (this.object.position.z as number);
      this.game.orbit.target = this.cameraTarget;
    }

    this.publish();
  }

  setMotion(keys: any) {
    let offset = 0; // w
    if (keys[W] || keys[Forward]) {
      if (keys[A] || keys[Left]) {
        offset = Math.PI / 4; // w+a
      } else if (keys[D] || keys[Right]) {
        offset = -Math.PI / 4; // w+d
      }
    } else if (keys[S] || keys[Backward]) {
      if (keys[A] || keys[Left]) {
        offset = Math.PI / 4 + Math.PI / 2; // s+a
      } else if (keys[D] || keys[Right]) {
        offset = -Math.PI / 4 - Math.PI / 2; // s+d
      } else {
        offset = Math.PI; // s
      }
    } else if (keys[A] || keys[Left]) {
      offset = Math.PI / 2; // a
    } else if (keys[D] || keys[Right]) {
      offset = -Math.PI / 2; // d
    }

    return offset;
  }
}
