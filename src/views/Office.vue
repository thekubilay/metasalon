<template>
  <div ref="world" id="world" class="stage-wrap pg">
    <PlayerCall v-if="Object.keys(world).length"/>
    <PlayerList v-if="Object.keys(world).length" :players="players"/>
    <canvas ref="canvas" id="canvas" class="stage" tabindex="-1"></canvas>
  </div>
</template>

<script lang="ts" setup>
import PlayerCall from "@/components/player/PlayerCall.vue";
import PlayerList from "@/components/player/PlayerList.vue";

import {onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import useStore from "@/store/useStore";
import {useRouter} from "vue-router";
import useMultiplayer from "@/composables/useMultiplayer";
import Game from "@/nazare/Game";
import Office from "@/environments/office/Office";
import {GameSettings} from "@/types/GameSetting";
import {Player} from "@/types/Player";

const {myself} = useStore();
const {players, multiplayer} = useMultiplayer("office")
const router = useRouter()
const world = ref<HTMLDivElement>({} as HTMLDivElement)
const game = new Game()
const office = new Office()

const settings = {
  multiplayer: multiplayer,
  environments: [office]
} as GameSettings

onMounted(async () => {
  await game.start(settings)

})

onBeforeUnmount(() => {

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
