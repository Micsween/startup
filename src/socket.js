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

  createLobby(lobbyCode, username) {
    this.socket.emit("create lobby", lobbyCode, username);
  }

  getLobbies() {
    console.log("getting lobbies");
    this.socket.emit("get lobbies");
  }

  joinLobby(lobbyCode) {
    this.socket.emit("join lobby", lobbyCode);
  }

  leaveLobby(lobbyCode, username) {
    this.socket.emit("leave lobby", lobbyCode, username);
  }

  loadState(gameCode) {
    this.socket.emit("load state", gameCode);
  }

  playCard(gameCode, card) {
    this.socket.emit("play card", gameCode, card);
  }
  drawCard(gameCode) {
    this.socket.emit("draw card", gameCode);
  }
  startGame(gameCode) {
    this.socket.emit("start game", gameCode);
  }
  endGame(gameCode, winner) {
    this.socket.emit("end game", gameCode, winner);
  }

  close() {
    this.socket.off("connect");
    this.socket.off("join lobby");
    this.socket.off("leave lobby");
  }
}
