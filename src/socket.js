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

  leaveLobby(lobbyCode) {
    this.socket.emit("leave lobby", lobbyCode);
  }

  onMessage(callback) {
    this.socket.on("message", callback);
  }
}

// socket.send("Hello from the client!");
// socket.on("message", (message) => {
//   console.log(message);
// });
