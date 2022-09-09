import {Message, MessageFrom} from "@/types/Message";
import {SOCKET} from "@/plugins/socket";
import {Player} from "@/types/Player";
import {ref, shallowRef} from "vue";
import useStore from "@/store/useStore";

export default function () {
  const {myself, focusToCanvas} = useStore()
  const contact = ref<Player>({} as Player)
  const contactList = ref<Player[]>([])
  const component = shallowRef()
  const container = ref<MessageFrom[]>([])
  const messages = ref<Message[]>([])
  const message = ref<Message>({} as Message)
  const chatBox = ref<boolean>(false)
  const dialogBox = ref<boolean>(false)
  const username = ref<string>("")
  const news = ref<string[]>([])

  const initMessageSystem = (): void => {
    SOCKET.on("youHaveAMessage", data => {
      let messageFromIdx: number | undefined;
      messageFromIdx = container.value.findIndex(element => {
        return element.sessionID === data.fromSession
      })

      if (messageFromIdx >= 0) {
        container.value[messageFromIdx].messages.push(data)
        if (Object.keys(contact.value).length) {
          if (contact.value.sessionID === data.fromSession) {
            messages.value = container.value[messageFromIdx].messages
          } else {
            message.value = data
            unread(data)
          }
        } else {
          message.value = data
          unread(data)
        }
      } else {
        container.value.push({sessionID: data.fromSession, messages: [data]})
        if (Object.keys(contact.value).length) {
          if (contact.value.sessionID === data.fromSession) {
            messages.value.push(data)
          } else {
            message.value = data
            unread(data)
          }
        } else {
          message.value = data
          unread(data)
        }
      }

    })

    SOCKET.on("youHaveASelfMessage", data => {
      let messageFromIdx: number | undefined;
      messageFromIdx = container.value.findIndex(element => {
        return element.sessionID === data.toSession
      })

      if (messageFromIdx >= 0) {
        container.value[messageFromIdx].messages.push(data)
        messages.value = container.value[messageFromIdx].messages
      } else {
        container.value.push({sessionID: data.toSession, messages: [data]})
        messages.value.push(data)
      }
    })
  }

  const unread = (data: Message) => {
    for (const obj of contactList.value) {
      if (obj.sessionID === data.fromSession) {
        news.value.push(data.fromSession)
        break;
      }
    }
  }

  const toggle = (param: string): void => {
    if (param === "chat") {
      chatBox.value = !chatBox.value
      focusToCanvas.value = false
    } else {
      import("../components/dialog/DialogPlayerData.vue").then(val => {
        component.value = val.default;
      }).then(() => {
        dialogBox.value = true
        focusToCanvas.value = false
      })
    }
  }

  const save = () => {
    if (username.value.length) SOCKET.emit("updateInfo", username.value)
    dialogBox.value = false
  }

  const select = (data: Player): void => {
    if (myself.value.sessionID !== data.sessionID) {
      const from: MessageFrom = container.value.find(from => from.sessionID === data.sessionID) || {} as MessageFrom
      messages.value = Object.keys(from).length ? from.messages : []
      contact.value = data

      news.value = news.value.filter(item => {
        return item !== data.sessionID
      })
    }
  }


  return {
    component, dialogBox,
    contactList, contact, chatBox, news, messages, message,
    initMessageSystem, toggle, select, save,
  }
}
