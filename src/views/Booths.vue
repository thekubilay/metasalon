<template>
  <div class="stage-wrap pg" id="world">
    <!--    <Transition appear>-->
    <!--      <div id="popup" v-if="isControls" class="flex-column align-center justify-center">-->
    <!--        <div class="flex-column align-center" :class="{loading:isLoading}">-->
    <!--          <GameControls/>-->
    <!--          <Transition mode="out-in" name="slide-fade">-->
    <!--            <LoadingProgress v-if="isLoading" :percent="percentage" :text="progressTexts[currentProgressText]"/>-->
    <!--            <StartGameButton v-else @click="isControls=false"/>-->
    <!--          </Transition>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </Transition>-->

    <PlayerCall/>
    <PlayerMenu/>
    <PlayerList/>
    <PlayerRotationKeys/>
    <canvas ref="canvas" id="canvas" class="stage" tabindex="-1"></canvas>
  </div>
</template>

<script lang="ts" setup>
import GameControls from "@/components/GameControls.vue"
import LoadingProgress from "@/components/loadings/LoadingProgress.vue";
import StartGameButton from "@/components/buttons/StartGameButton.vue";
import PlayerCall from "@/components/player/PlayerCall.vue";
import PlayerMenu from "@/components/player/PlayerMenu.vue";
import PlayerList from "@/components/player/PlayerList.vue";
import PlayerRotationKeys from "@/components/player/PlayerRotationKeys.vue";

import {onBeforeUnmount, onMounted, watch} from "vue";
import {Player} from "@/types/Player";
import {SOCKET} from "@/plugins/socket";
import useStore from "@/store/useStore";
import useLoadings from "@/composables/useLoadings";
import {useIdGenerator} from "@/utils/useIdGenerator";
import {getCookie} from "@/utils/useCookie";

const {myself} = useStore();
const {
  isLoading, isControls, percentage, currentProgressText, progressTexts,
} = useLoadings()

let game: any, booths: any, environments: any;

onMounted(async () => {
  const nazare = await import("../nazare/Game")
  const basicEnv = await import("../environments/BasicEnv")
  const booth = await import("../environments/Booth")

  game = await new nazare.default()
  environments = await new basicEnv.default()
  booths = await new booth.default()

  nazareInit()
})

onBeforeUnmount(() => {
  nazareTerminate()
})

watch(isControls, val => {
  // if (!val) entry.entryAnim(game)
})

function nazareInit(): void {
  const settings = {
    canvas: "canvas",
    raycaster: true,
    lights: {
      pointLight: true,
      dirLight: true,
    },
  }

  game.environments = [booths, environments]
  game.start(settings)

  SOCKET.emit('join', "entry");

  multiplayerHandler()
  setTimeout(() => {
    myself.value = game.playerData as Player
    document.getElementById("canvas")!.style.visibility = "visible"
  }, 2000)

  return;
}

function multiplayerHandler() {
  game.socketEvents = {
    multiplayer: () => {
      const nazarev1: any = JSON.parse(sessionStorage.getItem("nazarev1") as string)
      const sessionId = getCookie("sessionId")

      SOCKET.connect()
      SOCKET.auth = {
        self: false,
        room: "office",
        sessionID: sessionId ? sessionId : useIdGenerator(),
        charNickname: nazarev1.charNickname,
        charFormat: nazarev1.charFormat,
        charFilePath: nazarev1.charFilePath,
        audio: true,
        charData: {
          x: 0,
          y: 0,
          z: 0,
          pb: 0,
          heading: 0,
          action: "Idle",
        }
      }

      SOCKET.on("self", data => {
        game.singleplayer(data)

        SOCKET.on("updateAll", data => {
          for (let i = data.length; i--;) {
            if (data[i].socketID !== game.playerData.socketID && data[i].room === "office") {
              const idx: number = game.playersInitClasses.findIndex((item: any) => item.playerData.socketID === data[i].socketID);
              if (idx >= 0) {
                game.playersInitClasses[idx].playerData = data[i];
              } else {
                game.setPlayerIntoGame(data[i]);
              }
            }
          }
        })
      })


      SOCKET.on("disconnected", data => {
        game.unsetPlayerFromGame(data.socketID)
      })

    },

    playerDataUpdate: (args: any) => {
      SOCKET.emit("update", args)
    }
  }
}

function nazareTerminate(): void {
  game.engine.stop()
  game.keyListener.stop()
  game.raycaster.stop()
  game.scene.children.forEach((mesh: any) => {
    mesh.removeFromParent()
  })
  return;
}

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
  visibility: hidden;
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
