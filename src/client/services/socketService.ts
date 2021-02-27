import { io } from "socket.io-client";

class SocketService {
  private socket;

  constructor() {
    this.socket = io("http://localhost:5000");
  }

  startStream(image: string) {
    this.socket.emit("start-stream", image);
  }
}

export default new SocketService();
