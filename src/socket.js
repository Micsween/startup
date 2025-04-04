import { io } from "socket.io-client";
//('http://localhost', {path: '/nodejs/socket.io'})
export class GameClient {
  constructor() {
    this.socket = io("/", {
      path: "/ws",
      withCredentials: true,
    });
  }

  sendMessage(message) {
    this.socket.send(message);
  }

  joinLobby(lobbyCode) {
    this.socket.emit("join lobby", lobbyCode);
  }

  leaveLobby(lobbyCode, username) {
    this.socket.emit("leave lobby", lobbyCode, username);
  }

  onMessage(callback) {
    this.socket.on("message", callback);
  }
  close() {
    this.socket.off("connect");
    this.socket.off("join lobby");
    this.socket.off("leave lobby");
  }
}
