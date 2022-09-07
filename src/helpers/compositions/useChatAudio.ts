import {Peer} from "peerjs";
import {SOCKET} from "@/plugins/socket";
import ringTone from "@/assets/sounds/ringtone.mp3"
import {ref} from "vue";
import useStore from "@/store/useStore";

export default function () {

  const {myself} = useStore()
  const ring = ref<any>()
  const decline = ref<HTMLButtonElement>({} as HTMLButtonElement)
  const answer = ref<HTMLButtonElement>({} as HTMLButtonElement)
  const peer = ref(new Peer());
  let peers: any = []
  const constraints = {audio: true, video: false}
  const streaming = ref<MediaStream>({} as MediaStream);
  const called = ref<boolean>(false);
  const incoming = ref<boolean>(false);
  const outgoing = ref<boolean>(false);
  const oncall = ref<boolean>(false);
  const mute = ref<boolean>(false);
  const mic = ref<boolean>(true);
  const audioWith = ref<string>("");
  const callData = ref<any>()

  // window.setInterval((function(){
  //   var start = Date.now();
  //   var textNode = document.createTextNode('0');
  //   document.getElementById('seconds').appendChild(textNode);
  //   return function() {
  //     textNode.data = Math.floor((Date.now()-start)/1000);
  //   };
  // }()), 1000);

  const createRemoteAudioElement = (stream: MediaStream): void => {
    let audio: HTMLAudioElement = document.createElement("audio") as HTMLAudioElement;
    audio.srcObject = stream
    audio.classList.add("audio_elem")
    audio.muted = false
    audio.autoplay = true
    document.getElementById("player_call")?.append(audio)
  }

  const initAudioChat = (sessionID: string): void => {
    peer.value = new Peer(sessionID)
    peer.value.on("open", (id) => {
      console.log("peer connected.")
    })

    SOCKET.on("youHaveAnAudioCall", data => {
      audioWith.value = data.from
      callData.value = data
      myself.value.audio = false
      SOCKET.emit('closeOrOpenAudio', {audio: false});
      ring.value.play();
    })

    SOCKET.on("youMadeACall", data => {
      callData.value = data
      audioWith.value = data.to
      outgoing.value = true
      startAudioCall(data.sessionID)
      myself.value.audio = false
      SOCKET.emit('closeOrOpenAudio', {audio: false});
      ring.value.play();
    })

    SOCKET.on("callOn", data => {
      ring.value.pause();
      ring.value.currentTime = 0;
      oncall.value = true
      outgoing.value = false
      incoming.value = false
    })

    SOCKET.on("callOnSelf", data => {
      ring.value.pause();
      ring.value.currentTime = 0;
      oncall.value = true
      outgoing.value = false
      incoming.value = false
    })

    SOCKET.on("callOver", data => {
      endAudioCall()
    })

    SOCKET.on("callOverSelf", data => {
      endAudioCall()
    })

    /* start empty call */
    answerAudioCall()
    ring.value = new Audio(ringTone);
  }

  const startAudioCall = (sessionID: string): void => {
    myself.value.audio = false
    SOCKET.emit('updateAudio', {audio: false});
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      streaming.value = stream
      const call = peer.value.call(sessionID, stream)
      call.on('stream', (remote) => {
        if (!peers.includes(call.peer)) {
          createRemoteAudioElement(remote)
          peers.push(call.peer)
        }
      })
    }).catch((err) => {
      console.log("unable to connect because " + err)
    })
  }

  const answerAudioCall = (): void => {
    peer.value.on('call', function (call) {
      if (!peers.length) {
        incoming.value = true
        /* answer call */
        setTimeout(() => {
          answer.value.addEventListener("click", () => {
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
              streaming.value = stream
              emitAnswer()
              call.answer(stream)
              call.on('stream', (remote) => {
                if (!peers.includes(call.peer)) {
                  createRemoteAudioElement(remote)
                  peers.push(call.peer)
                }
              })
            }).catch((err) => {
              console.log("unable to connect because " + err)
            })
          })
        }, 200)
      }
    });
  }

  const muteAudioCall = () => {
    mute.value = !mute.value
    const elements = document.getElementsByClassName("audio_elem") as HTMLCollectionOf<HTMLAudioElement> || []
    Array.from(elements).forEach(element => {
      element.muted = mute.value
    })
  }

  const micAudioCall = () => {
    mic.value = !mic.value
    streaming.value.getAudioTracks()[0].enabled = mic.value
  }

  const emitDecline = () => {
    if (incoming.value || called.value) {
      SOCKET.emit("declineCall", {socketID: callData.value.fromSocketID})
    } else {
      if (callData.value)
        SOCKET.emit("declineCall", {socketID: callData.value.socketID})
    }
  }

  const emitAnswer = () => {
    if (incoming.value) {
      called.value = true
      SOCKET.emit("answerCall", {socketID: callData.value.fromSocketID})
    } else {
      SOCKET.emit("answerCall", {socketID: callData.value.socketID})
    }
  }

  const endAudioCall = (): void => {
    ring.value.pause();
    ring.value.currentTime = 0;
    myself.value.audio = true
    SOCKET.emit("closeOrOpenAudio", {audio: true})
    if (oncall.value || outgoing.value || incoming.value) {
      if (oncall.value) {
        streaming.value?.getAudioTracks().forEach(tracks => {
          tracks.stop()
          // peer.value.on("close", () => {
          //   console.log("call ended")
          // })
        })
      }

      oncall.value = false
      outgoing.value = false
      incoming.value = false
      called.value = false

      peer.value.on("close", () => {
        console.log("call ended")
      })
    }

    peers = []
    const elements = document.getElementsByClassName("audio_elem") as HTMLCollectionOf<HTMLAudioElement> || []
    Array.from(elements).forEach(element => {
      element.remove()
    })
  }


  return {
    decline, answer,
    incoming, outgoing, oncall, audioWith,
    mute, mic,
    muteAudioCall, micAudioCall,
    initAudioChat, answerAudioCall, emitDecline,
  }
}
