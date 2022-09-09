import {SOCKET} from "@/plugins/socket";
import {reactive, ref} from "vue";
import {getCookie} from "@/utils/useCookie";
import {useIdGenerator} from "@/utils/useIdGenerator";
import CharacterInfo, {Player} from "@/types/Player";
import {MultiplayerSetting} from "@/types/GameSetting";
import useStore from "@/store/useStore";

export default function (room:string) {
  const {myself} = useStore()
  const players = ref<Player[]>([])
  const storage = JSON.parse(sessionStorage.getItem("nzrsto") as string) as CharacterInfo
  const sessionId = getCookie("sessionId")

  const multiplayer = reactive<MultiplayerSetting>({
    start: (game: any): void => {
      SOCKET.connect()

      SOCKET.auth = {
        self: false,
        room: "office",
        sessionID: sessionId ? sessionId : useIdGenerator(),
        charNickname: storage.charNickname,
        charFormat: storage.charFormat,
        charFilePath: storage.charFilePath,
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
        myself.value = data
        game.singleplayer(data)
      })

      SOCKET.on("updatePositions", data => {
        players.value = data
        for (let i = data.length; i--;) {
          if (data[i].socketID !== game.playerData.socketID && data[i].room === room) {
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
    updatePlayerData: (args: any): void => {
      SOCKET.emit("updatePosition", args)
    }
  })
  return {
    players, multiplayer
  }
}