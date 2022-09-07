export interface Message {
  // id: "",
  toSocket: string,
  toSession: string,
  fromSocket: string,
  fromSession: string,
  name: string,
  body: string,
  date: Date,
  read: boolean,
}

export interface MessageFrom {
  sessionID: string,
  messages: Message[],
  notification?: boolean,
}
