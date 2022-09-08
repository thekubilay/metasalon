<template>
  <div ref="world" id="world" class="stage-wrap pg">
    <PlayerCall v-if="Object.keys(world).length"/>
    <PlayerMenu v-if="Object.keys(world).length"/>
    <PlayerList v-if="Object.keys(world).length" :players="players"/>
    <PlayerRotationKeys/>
    <canvas ref="canvas" id="canvas" class="stage" tabindex="-1"></canvas>
  </div>
</template>

<script lang="ts" setup>
import PlayerCall from "@/components/player/PlayerCall.vue";
import PlayerMenu from "@/components/player/PlayerMenu.vue";
import PlayerList from "@/components/player/PlayerList.vue";
import PlayerRotationKeys from "@/components/player/PlayerRotationKeys.vue";

import {nextTick, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import {Player} from "@/types/Player";
import {SOCKET} from "@/plugins/socket";
import useStore from "@/store/useStore";
import {useIdGenerator} from "@/utils/useIdGenerator";
import {getCookie} from "@/utils/useCookie";
import {useRouter} from "vue-router";

const {myself} = useStore();
const router = useRouter()
const world = ref<HTMLDivElement>({} as HTMLDivElement)
const players = ref<Player[]>([])
const nzwInfo: any = JSON.parse(sessionStorage.getItem("nazarev1") as string)
const multiplayer = reactive<any>({
  start: () => {
    const nazarev1: any = JSON.parse(sessionStorage.getItem("nazarev1") as string)
    const sessionId = getCookie("sessionId")
    SOCKET.connect()

    SOCKET.auth = {
      self: false,
      room: "entry",
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
    })

    SOCKET.on("updatePositions", data => {
      players.value = data
      for (let i = data.length; i--;) {
        if (data[i].socketID !== game.playerData.socketID && data[i].room === "entry") {
          const idx: number = game.playersInitClasses.findIndex((item: any) => item.playerData.socketID === data[i].socketID);
          if (idx >= 0) {
            game.playersInitClasses[idx].playerData = data[i];
          } else {
            game.setPlayerIntoGame(data[i]);
          }
        }
      }
    })

    SOCKET.on("disconnected", data => {
      game.unsetPlayerFromGame(data.socketID)
    })
  },
  playerDataUpdate: (args: any) => {
    SOCKET.emit("updatePosition", args)
  }
})

let game: any, entry: any;

onMounted(async () => {
  if (nzwInfo) {
    const nazare = await import("../nazare/Game")
    const initEntry = await import("../environments/entry/Init")
    game = await new nazare.default()
    entry = await new initEntry.default()
    nazareInit()
  } else {
    router.push({name: "SignIn"})
  }

})

onBeforeUnmount(() => {
  if (nzwInfo) nazareTerminate()
})

function nazareInit(): void {
  const settings = {
    raycaster: false,
    canvas: "canvas",
    lights: {
      // pointLight: true,
      dirLight: true,
      dirLightHelper: true,
    },
  }

  /* if no multiplayer then call game.singleplayer */
  game.environments = [entry]
  game.multiplayer = multiplayer
  game.start(settings)


  setTimeout(() => {
    myself.value = game.playerData as Player
    document.getElementById("canvas")!.style.visibility = "visible"
  }, 2000)

  return;
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
