<template>
  <transition>
    <div v-if="Object.keys(contact).length" ref="chat" class="player-chat outer">
      <div class="inner">
        <div class="header flex align-center column-1">
          <div class="player flex justify-space-between column-1">
            <h4 class="title flex align-center">{{ player.charNickname }}</h4>
            <button v-if="player.audio && myself.audio" @click="call()" id="call" class="flex align-center justify-center pointer">
              <i class="fa-solid fa-phone"></i>
            </button>

            <button @click="close()" id="close" class="flex align-center justify-center pointer">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div id="chatBody" class="body flex-column justify-start column-1" tabindex="0">
          <div v-for="(msg, idx) in messages" :key="idx" class="message flex align-center"
               :class="{local:msg.toSession === player.sessionID}">
            <span class="text">{{ msg.body }}</span>
            <span class="dt">{{ new Date(msg?.date).toLocaleTimeString("ja-JP").substring(0, 5) }}</span>
          </div>
        </div>
        <div class="footer flex align-center column-1">
          <input type="text" v-model="message" placeholder="メッセージ...">
          <button @click="sendViaButton()" id="send">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2a1 1 0 0 1 .894.553l9 18a1 1 0 0 1-1.11 1.423L12 20.024l-8.783 1.952a1 1 0 0 1-1.111-1.423l9-18A1 1 0 0 1 12 2zm1 16.198l6.166 1.37L13 7.236v10.962zM11 7.236L4.834 19.568 11 18.198V7.236z"
                fill="#0D0D0D"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, PropType, ref, watch} from "vue";
import {Player} from "@/types/Player";
import {Message} from "@/types/Message"
import useStore from "@/store/useStore";
import {SOCKET} from "@/plugins/socket";
import {onClickOutside} from "@vueuse/core";

interface Emit {
  (e: 'update:contact', contact: Player): void

  (e: 'update:receiver', receiver: { id: string, nickname: string } | null): void
}

const emit = defineEmits<Emit>()
const props = defineProps({
  contact: Object as PropType<Player>,
  messages: {type: Array as PropType<Message[]>, default: [] as Message[]}
})
const {myself} = useStore()
const chat = ref<HTMLDivElement>({} as HTMLDivElement)
const message = ref<string>("")
const instance = ref<Player>({} as Player)

onMounted(() => {
  nextTick(() => {
    if (props.contact) {
      setTimeout((): void => {
        scrollToLastMessage()
        window.addEventListener("keyup", sendViaKeyboard)
      }, 300)
    }
  })
})

const send = (): void => {
  SOCKET.emit("privateMessage", {
    toSocket: props.contact?.socketID,
    toSession: props.contact?.sessionID,
    fromSocket: myself.value.socketID,
    fromSession: myself.value.sessionID,
    name: myself.value.charNickname,
    body: message.value,
    date: new Date(),
    read: false,
  })

  message.value = ""
}

const close = (): void => {
  document.getElementById("stage")?.focus()
  emit("update:contact", {} as Player)
}

const scrollToLastMessage = (): void => {
  setTimeout((): void => {
    if (props.contact && Object.keys(props.contact).length) {
      const body: HTMLDivElement = document.getElementById("chatBody") as HTMLDivElement
      body.scrollTop = body.scrollHeight
    }
  }, 100)
}

const sendViaKeyboard = (e: KeyboardEvent): void => {
  if (e.key === "Enter" && message.value.length) {
    send()
    scrollToLastMessage()
  }
}


const sendViaButton = (): void => {
  if (!message.value.length) return;
  send()
  scrollToLastMessage()
}

const call = () => {
  SOCKET.emit("call", {
    socketID: props.contact?.socketID,
    sessionID: props.contact?.sessionID,
    to: props.contact?.charNickname,
    from: myself.value.charNickname,
    fromSocketID: myself.value.socketID
  })
}

onClickOutside(chat, (e: any): void => {
  close()
})


watch(() => props.contact, val => {
  if (val) {
    window.addEventListener("keyup", sendViaKeyboard)
    scrollToLastMessage()
  } else {
    window.removeEventListener("keyup", sendViaKeyboard)
  }
})


watch(() => props.messages, value => {
  scrollToLastMessage()
}, {deep: true})

</script>

<style>
.player-chat {
  position: fixed;
  bottom: 0;
  right: 150px;
  width: 290px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  min-height: 396px;
  max-height: 80%;
  z-index: 2;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

/* header*/
.player-chat .inner {
  background-color: #f5f6fa;
  border-radius: 10px;
  height: 100%;
}

.player-chat .header {
  position: relative;
  z-index: 2;
  height: 49px;
  width: 100%;
  padding: 10px;
  border-radius: 14px;
  background-color: #FFFFFF;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 3px 5px;
}

.player-chat .header h4.title {
  font-weight: 500;
}

.player-chat .header button {
  outline: 0;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 0;
  color: #FFFFFF;
  background: none;
  font-size: 1rem;
}

.player-chat .header button#call {
  margin-left: auto;
  margin-right: 6px;
  color: #2ecc71;
}

.player-chat .header button#close {
  color: #e74c3c;
  font-size: 1.4rem;
}

.player-chat .header button:active {
  transform: translateY(1px);
}

.player-chat .header button:hover {
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}

/* body */
.player-chat .body {
  position: relative;
  z-index: 1;
  height: 275px;
  overflow: scroll;
  padding-top: 5px;
}

.player-chat .body .message {
  font-size: .7rem;
  position: relative;
  margin-bottom: 20px;
  min-height: 34px;
}

.player-chat .body .message span.text {
  padding: 7px 10px 8px 10px;
  border-radius: 14px;
  max-width: 90%;
}

.player-chat .body .message.local span.text {
  margin-left: auto;
  background-color: #4884ee;
  color: #FFFFFF;
  margin-right: 10px;
}

.player-chat .body .message.local span.dt {
  position: absolute;
  right: 10px;
  font-size: .55rem;
  background-color: #4884ee;
  border-radius: 35px;
  color: #FFFFFF;
  padding: 1px 6px 2px 6px;
  border: 1px solid #FFFFFF;
}

.player-chat .body .message:not(.local) .text {
  margin-right: auto;
  background-color: #dcdde1;
  color: #556080;
  margin-left: 10px;
}

.player-chat .body .message:not(.local) span.dt {
  position: absolute;
  left: 10px;
  font-size: .55rem;
  color: #556080;
}

.player-chat .body .message span.dt {
  bottom: -12px;
}


.player-chat .footer {
  position: relative;
  z-index: 2;
  height: 64px;
  padding: 10px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px -3px 5px;
}

.player-chat .footer input {
  height: 40px;
  background-color: #f5f6fa;
  width: calc(100% - 50px);
  padding: 0 14px 1px 10px;
  border-radius: 35px;
  border: 1px solid #E7ECED;
  outline: 0;
}

.player-chat .footer input::placeholder {
  font-size: .7rem;
}

.player-chat .footer button#send {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  outline: 0;
  border: 0;
  background-color: #4884ee;
  margin-left: 10px;
}

.player-chat .footer button#send svg {
  transform: rotateZ(90deg);
  position: relative;
  top: 2px;
  left: 1px;
  width: 20px;
  height: 20px;
}

.player-chat .footer button#send svg path {
  fill: #FFFFFF;
}

@media not all and (min-resolution:.001dpcm) {
  @media {
    .player-chat {
      position: fixed;
      bottom: 10px;
      right: 160px;
      width: 290px;
      padding: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 14px;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      min-height: 396px;
      max-height: 80%;
      z-index: 2;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .player-chat .header button {
      outline: 0;
      width: 30px;
      height: 30px;
      border-radius: 10px;
      border: 0;
      color: #FFFFFF;
      background: none;
      font-size: 1rem;
    }

    .player-chat .header button#call {
      margin-left: auto;
      margin-right: 6px;
      color: #2ecc71;
      padding-top: 4px;
    }

    .player-chat .header button#close {
      color: #e74c3c;
      font-size: 1.4rem;
    }
    .player-chat .header button#close i {
      position: relative;
      top: -2px;
    }
  }
}


/* footer */
</style>
