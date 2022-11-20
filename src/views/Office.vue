<template>
  <div ref="world" id="world" class="stage-wrap pg">
    <Transition appear>
      <div id="popup" v-if="isControls" class="flex-column align-center justify-center">
        <div class="flex-column align-center" :class="{loading:isLoading}">
          <GameControls/>
          <Transition mode="out-in" name="slide-fade">
            <LoadingProgress :percent="percentage" :text="progressTexts[currentProgressText]"/>
          </Transition>
        </div>
      </div>
    </Transition>

    <div class="reactool">
      <button @click="reactool()" class="flex align-center"><img src="@/assets/logo.svg" alt="reactool"><Icon style="margin-left: 5px" icon="ClickIcon" color="#000" /></button>
    </div>

    <div class="menu flex justify-space-between">
      <button @click="toLobby()" class="lobby">エントリー世界へ</button>
      <button @click="signout()" class="exit">ログアウト</button>
    </div>

    <PlayerCall v-if="Object.keys(world).length"/>
    <PlayerList v-if="Object.keys(world).length" :players="players"/>
    <canvas ref="canvas" id="canvas" class="stage" tabindex="-1"></canvas>
  </div>
</template>

<script lang="ts" setup>
import PlayerCall from "@/components/player/PlayerCall.vue";
import PlayerList from "@/components/player/PlayerList.vue";

import {onBeforeMount, onBeforeUnmount, onMounted, ref, watch} from "vue";
import useStore from "@/store/useStore";
import {useRoute, useRouter} from "vue-router";
import useMultiplayer from "@/composables/useMultiplayer";
import Game from "@/nazare/Game";
import Office from "@/environments/office/Office";
import {GameSettings} from "@/types/GameSetting";
import useLoadings from "@/composables/useLoadings";
import * as THREE from "three";
import GameControls from "@/components/GameControls.vue";
import LoadingProgress from "@/components/loadings/LoadingProgress.vue";
import StartGameButton from "@/components/buttons/StartGameButton.vue";
import Icon from "@/components/icons/Icon.vue";

const route = useRoute()
const router = useRouter()
const {
  isLoading, isControls, percentage, currentProgressText, progressTexts,
} = useLoadings()
const room = route.params.id as string
const {myself} = useStore();
const {players, multiplayer, storage} = useMultiplayer(route.params.id as string, false)
const world = ref<HTMLDivElement>({} as HTMLDivElement)
const canvas = ref<HTMLCanvasElement>({} as HTMLCanvasElement)
const game = new Game();
const office = new Office();

const settings = {
  tags: true,
  camera: {
    near: .1,
    position: [0, 2, 8]
  },
  orbit: {
    minDistance: 2,
    maxDistance: 5,
  },
  rotation: false,
  multiplayer: multiplayer,
  environments: [office]
} as GameSettings

const reactool = () => {
  window.open("https://app.reactool.jp/"+window.location.pathname.split("$")[1].split("#")[0])
}

const signout = () => {
  router.push({name: "SignIn"}).then(() => {
    sessionStorage.removeItem("nzrstr")
  })
}

const toLobby = () => {
  router.push({name: "Entry"})
}

watch(canvas, val => {
  if (val) {
    setTimeout(() => {
      canvas.value.style.visibility = "visible"
      game.orbit.enableZoom = true;
      game.orbit.enableRotate = true;
      game.orbit.target = new THREE.Vector3(0,2,0);
      game.orbit.update()
    }, 1000)
  }
})

watch(isControls, val => {
  if (!val) {
    setTimeout(() => {
      office.entryAnim(game)
    }, 500)
  }
})

watch(percentage, val => {
  if (val > 98){
    isControls.value = false
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



/* GAME INSIDE
==================*/

.stage-wrap .stage {
  position: relative;
  z-index: 1;
  visibility: hidden;
}

.stage-wrap .reactool {
  position: fixed;
  z-index: 9;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 4px;
  width: 120px;
  border-radius: 6px;
  top: 5px;
  left: 5px;
}

.stage-wrap .reactool button {
  border-radius: 4px;
  font-size: .7rem;
  color: #FFFFFF;
  padding: 5px;
  height: 30px;
  background-color: #FFFFFF;
}
.stage-wrap .reactool button img {
  width: 100%;
  height: 100%;
}

.stage-wrap .menu {
  position: fixed;
  z-index: 9;
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

.stage-wrap .menu button.lobby {
  background-color: #0652DD;
}

.stage-wrap .menu button.exit {
  background-color: #e74c3c;
  margin-left: 5px;
}

</style>
