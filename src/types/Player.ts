import {MessageFrom, Message} from "@/types/Message"

interface CharacterInfo {
  charNickname: string,
  charFormat: string,
  charFilePath: string,
  charActive?: boolean,
}

interface CharData {
  x: 0
  y: 0
  z: 0
  pb: 0
  heading: 0
  action: string
  view?:string,
}

export interface Player extends Partial<CharacterInfo> {
  self: boolean,
  room: string,
  socketID: string | null,
  sessionID:string,
  audio?: boolean,
  view?:string,
  status?: string,
  charData?: CharData
  new_messages?: boolean
}
