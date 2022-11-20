<template>
  <div ref="world" id="world" class="stage-wrap pg">
    <Transition appear>
      <div id="popup" v-if="isControls" class="flex-column align-center justify-center">
        <div class="flex-column align-center" :class="{loading:isLoading}">
          <GameControls/>
          <Transition mode="out-in" name="slide-fade">
            <LoadingProgress v-if="isLoading" :percent="percentage" :text="progressTexts[currentProgressText]"/>
            <StartGameButton v-else @click="start()"/>
          </Transition>
        </div>
      </div>
    </Transition>

    <div class="menu flex justify-space-between">
      <button @click="restart()" class="restart">リスタート</button>
      <button @click="isControls = !isControls" class="controls">操作</button>
      <button @click="signout()" class="exit">ログアウト</button>
    </div>
    <PlayerCall v-if="Object.keys(world).length"/>
    <PlayerList v-if="Object.keys(world).length" :players="players"/>
    <DialogTeleport v-model="dialog"></DialogTeleport>
    <canvas ref="canvas" id="canvas" class="stage" tabindex="-1"></canvas>
  </div>
</template>

<script lang="ts" setup>
import PlayerCall from "@/components/player/PlayerCall.vue";
import PlayerList from "@/components/player/PlayerList.vue";
import DialogTeleport from "@/components/dialog/DialogTeleport.vue";

import {onBeforeMount, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {GameSettings} from "@/types/GameSetting";
import useStore from "@/store/useStore";
import useMultiplayer from "@/composables/useMultiplayer";

import Game from "@/nazare/Game";
import Entry from "@/environments/entry/Entry";
import GameControls from "@/components/GameControls.vue";
import LoadingProgress from "@/components/loadings/LoadingProgress.vue";
import StartGameButton from "@/components/buttons/StartGameButton.vue";
import useLoadings from "@/composables/useLoadings";
import * as THREE from "three";


const {myself} = useStore();
const {players, multiplayer, storage} = useMultiplayer("entry")
const {
  isLoading, isControls, percentage, currentProgressText, progressTexts,
} = useLoadings()
const router = useRouter()
const route = useRoute()
const world = ref<HTMLDivElement>({} as HTMLDivElement)
const canvas = ref<HTMLCanvasElement>({} as HTMLCanvasElement)
const game = new Game()
const entry = new Entry()
const dialog = ref<boolean>(true)
const gameOn = ref<boolean>(false)
const settings = {
  room: "entry",
  multiplayer: multiplayer,
  rotation: true,
  environments: [entry],
  camera: {
    position: [0, 20, 70],
  }
} as GameSettings


const restart = () => {
  game.physics.character.position.x = 0
  game.physics.character.position.y = .5
  game.physics.character.position.z = 21.315925775403738
  game.playerRotationClass.object.position.x = game.physics.character.position.x
  game.playerRotationClass.object.position.z = game.physics.character.position.z

  game.playerRotationClass.cameraTarget.x = game.playerRotationClass.object.position.x as number;
  game.playerRotationClass.cameraTarget.y = (game.playerRotationClass.object.position.y as number) + 4;
  game.playerRotationClass.cameraTarget.z = (game.playerRotationClass.object.position.z as number) + 8;

  game.camera.position.x = game.playerRotationClass.cameraTarget.x;
  game.camera.position.z = game.playerRotationClass.cameraTarget.z;

  game.orbit.target = new THREE.Vector3(
      game.playerRotationClass.object.position.x as number,
      game.playerRotationClass.object.position.y as number + 3,
      game.playerRotationClass.object.position.z as number
  );
  game.orbit.update()
  canvas.value.focus()
  game.playerRotationClass.object.rotation.y = 0
  game.playerRotationClass.object.rotation.x = 0
  game.playerRotationClass.object.rotation.z = 0
}

const reorbit = () => {
  game.playerRotationClass.cameraTarget.x = game.playerRotationClass.object.position.x as number;
  game.playerRotationClass.cameraTarget.y = (game.playerRotationClass.object.position.y as number) + 4;
  game.playerRotationClass.cameraTarget.z = (game.playerRotationClass.object.position.z as number) + 8;

  game.camera.position.x = game.playerRotationClass.cameraTarget.x;
  game.camera.position.z = game.playerRotationClass.cameraTarget.z;

  game.orbit.target = new THREE.Vector3(
      game.playerRotationClass.object.position.x as number - Math.PI /2,
      game.playerRotationClass.object.position.y as number + 3,
      game.playerRotationClass.object.position.z as number
  );
}

const signout = () => {
  router.push({name: "SignIn"})
}

const start = () => {
  isControls.value=false
  canvas.value.focus()
}

watch(canvas, val => {
  if (val) {
    setTimeout(() => {
      canvas.value.style.visibility = "visible"
    }, 1000)
  }
})

watch(isControls, val => {
  if (!val && !gameOn.value) {
    setTimeout(() => {
      entry.entryAnim(game)
      gameOn.value = true
    }, 500)
  }
})

watch(dialog, val => {
  if (!val) {
    game.settings.rotation = true
    setTimeout(() => {
      dialog.value = true
    }, 1000)
  }
})


onBeforeMount(() => {
  if(!window.location.hash) {
    window.location.href = window.location + '#loaded';
    window.location.reload();
  }
})


onMounted(async () => {
  if (storage){
    await game.start(settings)
  } else {
    await router.push({name: "SignIn", query:{office:route.params.id}})
  }
})


</script>
<style scoped>
.stage-wrap #popup {
  position: fixed;
  z-index: 10;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #1c32e2;
  backdrop-filter: blur(3px);
}

.stage-wrap #popup > div {
  height: 358px;
  background-color: white;
}

/* GAME INSIDE
==================*/

.stage-wrap .stage {
  position: relative;
  z-index: 1;
  visibility: hidden;
}


.stage-wrap .menu {
  position: fixed;
  z-index: 999;
  top: 5px;
  right: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 4px;
  border-radius: 6px;
}

.stage-wrap .menu button {
  border-radius: 4px;
  font-size: .7rem;
  color: #FFFFFF;
  padding: 0 5px;
  height: 30px
}

.stage-wrap .menu button.restart {
  background-color: #0652DD;
}

.stage-wrap .menu button.controls {
  background-color: #0652DD;
  margin-left: 5px;
}

.stage-wrap .menu button.exit {
  background-color: #e74c3c;
  margin-left: 5px;
}

</style>
