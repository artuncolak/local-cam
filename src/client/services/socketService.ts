import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:5000");
    this.socket.compress(true);
  }

  stream(image: string) {
    this.socket.emit("start-stream", image);
  }
}

export default new SocketService();
