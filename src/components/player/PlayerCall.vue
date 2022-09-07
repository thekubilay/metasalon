<template>
  <div id="player_call" class="flex" :class="{pulse:outgoing||incoming, on:outgoing||incoming||oncall}">
    <div class="header flex align-center">
      <i class="fa-solid fa-circle-user"></i>
      <div class="context">
        <p class="name">{{ audioWith }}</p>
        <p v-if="incoming || outgoing" class="incoming">呼出中...</p>
        <p v-if="oncall" class="time">電話中</p>
      </div>
    </div>
    <div class="footer flex align-center">
      <div v-if="oncall" class="settings flex-column justify-space-between">
        <button @click="muteAudioCall()" class="mute block" :class="{active:!mute}"><i class="fa-solid fa-volume-xmark"></i></button>
        <button @click="micAudioCall()" class="mic block" :class="{active:mic}"><i class="fa-solid fa-microphone-lines-slash"></i></button>
      </div>
      <div class="actions flex align-center">

        <button v-if="outgoing || oncall || incoming" @click="emitDecline()" ref="decline" class="decline pointer"><i class="fa-solid fa-phone-slash"></i></button>
        <button v-if="incoming" ref="answer" class="answer pointer"><i class="fa-solid fa-phone"></i></button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import useChatAudio from "@/helpers/compositions/useChatAudio";
import {nextTick, onBeforeUnmount, onMounted} from "vue";
import useStore from "@/store/useStore";
import {SOCKET} from "@/plugins/socket";

const {myself} = useStore()
const {
  decline, answer,
  incoming, outgoing, oncall, audioWith,
  mute, mic,
  muteAudioCall, micAudioCall,
  initAudioChat, emitDecline
} = useChatAudio()

onMounted((): void => {
  nextTick((): void => {
    setTimeout(() => {
      initAudioChat(myself.value.sessionID)
      SOCKET.on("disconnected", data => {
        emitDecline()
      })
    },2000)
  })
})

onBeforeUnmount(() : void =>{
  emitDecline()
})

</script>
<style>
#player_call {
  position: fixed;
  z-index: 3;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -120px);
  width: auto;
  border-radius: 16px;
  font-family: sans-serif;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 6px;
  height: 80px;
  transition: .4s ease-in-out;
}

#player_call.pulse {
  animation: animate 1.5s ease-in-out infinite
}
#player_call.on {
  transform: translate(-50%, 0);
}

#player_call .header {
  margin-right: 30px;
}

#player_call .header i {
  font-size: 3.6rem;
  border: 6px solid transparent;
  border-radius: 50%;
  transition: .3s ease-in-out;
  background: none;
  color: #c5cdd7;
}

#player_call.oncall .header i {
  color: #3742fa;
  background-color: #FFFFFF;
  border-color: #2ecc71;
  box-shadow: rgba(46, 204, 113, 1) 0px 0px 5px 0px;
}

#player_call .header .context {
  margin-left: 5px;
  font-size: .8rem;
  color: #d3cdcd;
}

/*
* =============
* FOOTER
* =============
*/
#player_call .footer,
#player_call .footer .settings,
#player_call .footer .actions,
#player_call .footer .actions button {
  height: 100%;
}

#player_call .footer .settings {
  height: 95%;
  margin-right: 6px;
}
#player_call .footer .settings button {
  border-radius: 10px;
  outline: none;
  border: none;
  height: 48%;
  width: 30px;
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  color: #8591b0;
}

#player_call .footer .settings button.active {
  color: #FFFFFF;
  background-color: #3742fa;
}


#player_call .footer .actions button {
  outline: none;
  border: none;
  width: 56px;
  border-radius: 14px;
  height: 95%;
  font-size: 1.5rem;
  color: #FFFFFF;
}

#player_call .footer .actions button.decline {
  background-color: #e74c3c;
  box-shadow: rgba(231, 76, 60, 1) 0px 0px 10px 0px;
}

#player_call .footer .actions button.answer {
  background-color: #2ecc71;
  box-shadow: rgba(46, 204, 113, 1) 0px 0px 5px 0px;
  margin-left: 8px;
  margin-right: 2px;
}

/*
* =============
* PULSE
* =============
*/
@keyframes animate {
  0% {
    box-shadow: none;
  }
  20% {
    box-shadow: rgba(255, 255, 255, .5) 0px 0px 0px 3px;
  }

  40% {
    box-shadow: rgba(255, 255, 255, .5) 0px 0px 0px 3px, rgba(255, 255, 255, .3) 0px 0px 0px 6px;
  }

  60% {
    box-shadow: rgba(255, 255, 255, .5) 0px 0px 0px 3px, rgba(255, 255, 255, .3) 0px 0px 0px 6px, rgba(255, 255, 255, .1) 0px 0px 0px 9px;
  }

  80% {
    box-shadow: rgba(255, 255, 255, .5) 0px 0px 0px 3px, rgba(255, 255, 255, .3) 0px 0px 0px 6px, rgba(255, 255, 255, .1) 0px 0px 0px 9px, rgba(255, 255, 255, .08) 0px 0px 0px 12px;
  }

  100% {
    box-shadow: rgba(255, 255, 255, .5) 0px 0px 0px 3px, rgba(255, 255, 255, .3) 0px 0px 0px 6px, rgba(255, 255, 255, .1) 0px 0px 0px 9px, rgba(255, 255, 255, .08) 0px 0px 0px 12px, rgba(255, 255, 255, .05) 0px 0px 0px 15px;
  }
}
</style>
