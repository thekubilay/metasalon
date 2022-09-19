<template>
  <div ref="world" id="world" class="stage-wrap pg">
    <PlayerCall v-if="Object.keys(world).length"/>
    <PlayerList v-if="Object.keys(world).length" :players="players"/>
    <canvas ref="canvas" id="canvas" class="stage" tabindex="-1"></canvas>
    <iframe ref="reactool" class="reactool" :src="src"></iframe>
    <button @click="resize()" id="resize" class="resize"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button>
  </div>
</template>

<script lang="ts" setup>
import PlayerCall from "@/components/player/PlayerCall.vue";
import PlayerList from "@/components/player/PlayerList.vue";

import {onBeforeUnmount, onMounted, ref} from "vue";
import useStore from "@/store/useStore";
import {useRoute, useRouter} from "vue-router";
import useMultiplayer from "@/composables/useMultiplayer";
import Game from "@/nazare/Game";
import Office from "@/environments/office/Office";
import {GameSettings} from "@/types/GameSetting";
import CharacterInfo, {Player} from "@/types/Player";
import {SOCKET} from "@/plugins/socket";

const route = useRoute()
const router = useRouter()
const room = route.params.id as string
const src = ref<string>("https://app.reactool.jp/"+room.split("$")[1])
const small = ref<boolean>(false)
const {myself} = useStore();
const {players, multiplayer, storage} = useMultiplayer(route.params.id as string, false)
const world = ref<HTMLDivElement>({} as HTMLDivElement)
const game = new Game()
const office = new Office()
const reactool = ref<any>({})

const settings = {
  tags: true,
  camera: {
    near: .1,
    position: [0, 2, 8]
  },
  orbit: {
    minDistance: 5,
    maxDistance: 5,
  },
  rotation: false,
  multiplayer: multiplayer,
  environments: [office]
} as GameSettings

onMounted(async () => {
  if (storage){
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    } else {
      await game.start(settings)
    }
  } else {
    router.push({name: "SignIn", query:{office:route.params.id}})
  }
})

onBeforeUnmount(() => {

})


const resize = () => {
  small.value = !small.value
  const resize = document.getElementById("resize") as HTMLButtonElement
  if (!small.value){
    reactool.value.style.top = "5px"
    reactool.value.style.left = "5px"
    reactool.value.style.transform = "scale(.3) translate(-115%, -115%)"
  } else {
    reactool.value.style.top = "50%"
    reactool.value.style.left = "50%"
    reactool.value.style.transform = "scale(1) translate(-50%, -50%)"
  }

}

const updateFrame = () => {
  console.log("ok")
  // SOCKET.emit()
}


</script>
<style scoped>
.stage-wrap #popup {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1c32e2;
  backdrop-filter: blur(3px);
}

.stage-wrap #popup > div {
  height: 358px;
  background-color: white;
  /* transition: 0.4s 2.0s; */
}

/* #popup > div.loading {
  height: 400px;
} */

/* Transitions */
.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.7s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}


/* GAME INSIDE
==================*/

.stage-wrap .stage {
  position: relative;
  z-index: 1;
  /*visibility: hidden;*/
}

.stage-wrap .reactool {
  z-index: 99;
  width: 90%;
  height: 90%;
  left: 5px;
  top: 5px;
  transform: scale(.3) translate(-115%, -115%);
  position: absolute;

}

.stage-wrap button.resize {
  position: absolute;
  z-index: 100;
  top: 12px;
  left: 16px;
  width: 50px;
  height: 40px;
  background-color: #ffffff;
  color: #3742fa;
}

.stage-wrap .stage .char-nickname {
  z-index: 2;
}

.stage-wrap button.exit {
  position: absolute;
  z-index: 2;
  width: 40px;
  height: 40px;
  top: 10px;
  right: 10px;
  outline: 0;
  border: 0;
  background-color: #FFFFFF;
}

.stage-wrap button.exit span.bar {
  height: 2px;
  width: 24px;
  background-color: #000000;
  position: relative;
}

.stage-wrap button.exit span.bar:nth-child(1) {
  top: -5px;
}

.stage-wrap button.exit span.bar:nth-child(3) {
  bottom: -5px;
}

</style>
