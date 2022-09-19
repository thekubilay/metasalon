<template>
  <teleport to="body">

    <MessageNotification :message="message"/>

    <component v-model="dialogBox" :is="component">
      <div class="form">
        <div class="row">
          <label class="input-wrapper flex-column">
            <span class="title block" style="font-size: .7rem; margin-bottom: 5px; padding-left: 4px">ユーザー名</span>
            <input style="height: 40px; border-radius: 8px; border: 1px solid #dcdde1; padding-left: 5px" type="text" v-model="username">
          </label>
        </div>
        <div style="margin-top:14px;" class="actions column-1 flex justify-space-between">
          <button @click="dialogBox=false" class="close flex align-center justify-center pointer">中止</button>
          <button @click="save()" style="background-color: #3742fa" class="submit flex align-center justify-center pointer">登録</button>
        </div>
      </div>
    </component>

    <div class="players">

      <PlayerChat v-model:contact="contact" :messages="messages"/>

      <div v-if="chatBox" class="list">
        <div class="container">
          <div v-for="(ctc, idx) in contactList" :key="idx" class="actions flex align-center player">
            <button @click="select(ctc)"
                    class="chat flex align-center relative"
                    :class="{self:myself.sessionID === ctc.sessionID}">
              <span class="name-txt block">{{ ctc.charNickname }}</span>
            </button>
            <button @click="toggle('dialog')" class="edit flex align-center relative"
                    :class="{self:myself.sessionID === ctc.sessionID}">
              <span v-if="myself.sessionID !== ctc.sessionID && news.includes(ctc.sessionID)"
                    class="new-message"></span>
              <span v-if="myself.sessionID === ctc.sessionID" class="flex align-center justify-center myself pointer">
              <i class="fas fa-pen"></i></span>
            </button>
          </div>
        </div>
      </div>
      <button @click="toggle('chat')" class="open flex align-center justify-center pointer">
        プレイヤー <span class="chip flex align-center justify-center">{{ contactList.length }}</span>
      </button>

    </div>
  </teleport>
</template>

<script lang="ts" setup>

import MessageNotification from "@/components/notifications/MessageNotification.vue";
import PlayerChat from "@/components/player/PlayerChat.vue";
import {nextTick, onMounted, PropType, ref, shallowRef, watch} from "vue";
import {Player} from "@/types/Player";
import useStore from "@/store/useStore";
import ChatMessage from "@/composables/useChatMessage";
import {SOCKET} from "@/plugins/socket";


const props = defineProps({
  players: Array as PropType<Player[]>
})
const {myself} = useStore()
const {
  component, dialogBox,
  contactList, contact, chatBox, news, messages, message, username,
  initMessageSystem, toggle, select, save,
} = ChatMessage()

onMounted((): void => {
  nextTick(() => {
    initMessageSystem()
  })
})

watch(myself, val => {
  username.value = val.charNickname || ""
})

watch(() => props.players, val => {
  contactList.value = val as Player[]
})

</script>

<style>
.players {
  position: fixed;
  border-radius: 10px;
  max-height: 90%;
  width: 100%;
  max-width: 144px;
  z-index: 99;
  right: 10px;
  bottom: 10px;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 4px;
}

/* player */
.players button.open {
  width: 100%;
  min-width: 100%;
  height: 40px;
  border: 0;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
  padding: 0 10px;
  font-weight: 500;
}

.players button.open span.chip {
  background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
  width: 20px;
  height: 20px;
  color: #FFFFFF;
  margin-top: 2px;
  padding-bottom: 1px;
  border-radius: 50%;
  font-size: .6rem;
  margin-left: 6px;
}

/* player */
.players .container .player {
  transition: .3s ease-in-out;
  border-radius: 6px;
  margin-bottom: 5px;
  padding: 5px 4px;
  background-color: rgba(255, 255, 255, 0.75);
}

.players .container .player.self {
  pointer-events: none;
  background-color: rgba(255, 255, 255, 0.2);
}

.players .container .player:hover:not(.self) {
  background-color: rgba(255, 255, 255, 1);
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}


.players .container .player {
}

.players .container .player .chat,
.players .container .player .edit {
  outline: 0;
  border: 0;
}

.players .container .player .chat {
  width: 70%;
}

.players .container .player .edit {
  width: 30%;
  padding-bottom: 1px;
}

.players .container .player .edit i {
  padding: 4px 8px;
  position: relative;
  font-size: .6rem;
}

.players .container .player .chat span.name-txt {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
  margin-right: 10px;
}

.players .container .player span.myself {
  position: relative;
  top: 2px;
  background: #3742fa;
  padding: 1px 4px 2px;
  border-radius: 35px;
  color: #FFFFFF;
  font-size: .55rem;
  margin-right: 10px;
  margin-left: auto;
}

.players .container .player span.new-message {
  margin-left: auto;
  width: 8px;
  border-radius: 50%;
  height: 8px;
}

.players .container .player span.new-message {
  width: 8px;
  height: 8px;
  background-color: rgba(72, 132, 238, 0.94);
  border-radius: 50%;
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: rgba(72, 132, 238, 0.5) 0px 7px 29px 0px;
}

</style>
