import {Player} from "@/types/Player";
import {User} from "@/types/User";
import {Message} from "@/types/Message";

interface State {
  stageLoading: number,
  user: User
  myself: Player,
  other: Player,
  focusToCanvas: boolean
  currentPlayerChatSession: Player|null,
  openWithNewMessage: Message|null
}
export function state(): State {
  return {
    stageLoading: 0,
    user: {} as User,
    myself: {} as Player,
    other: {} as Player,
    focusToCanvas: true,
    currentPlayerChatSession: null,
    openWithNewMessage: null,
  }
}
