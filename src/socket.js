import { io } from "socket.io-client";
const URL = "http://localhost:4000";
export const socket = io({
  withCredentials: true,
});

// socket.on("message", (message) => {
//   console.log(message);
// });
