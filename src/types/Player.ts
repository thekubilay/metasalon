import {MessageFrom, Message} from "@/types/Message"

interface CharData {
  x: 0
  y: 0
  z: 0
  pb: 0
  heading: 0
  action: string
  view?: string,
}

export default interface CharacterInfo {
  charNickname: string,
  charFormat: string,
  charFilePath: string,
  charRoom: string,
  key: string,
  charActive?: boolean,
}


export interface Player extends Partial<CharacterInfo> {
  self: boolean,
  socketID: string | null,
  sessionID: string,
  audio?: boolean,
  view?: string,
  status?: string,
  charData?: CharData
  room: string,
  withStaff: boolean,
  new_messages?: boolean
}
