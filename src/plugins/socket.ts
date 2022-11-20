import Socket from "socket.io-client";

// const URL = "https://192.168.11.13:5000";
const URL = "https://multiplayer.nazareworlds.com:5000";
export const SOCKET = Socket(URL, {autoConnect: false})
