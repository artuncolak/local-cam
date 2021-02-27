import cors from "cors";
import ejs from "ejs";
import express, { Express } from "express";
import getPort from "get-port";
import { Server as HttpServer } from "http";
import { networkInterfaces } from "os";
import path from "path";
import { Server as SocketServer } from "socket.io";

interface ServerDetails {
  address: string;
  port: number;
}

class Server {
  private app: Express;
  private httpServer: HttpServer;
  private io: SocketServer;
  private port: number;

  constructor() {
    this.app = express();
    this.app.set("view engine", "ejs");
    this.app.engine("ejs", ejs.__express);
    this.app.set("views", path.join(__dirname, "/views"));
    this.app.get("/", (req, res) => {
      res.render("home");
    });

    this.httpServer = new HttpServer(this.app);
    this.io = new SocketServer(this.httpServer, {
      cors: {
        origin: "*",
      },
    });

    this.openSocket();
  }

  private openSocket(): void {
    this.io.on("connection", (socket) => {
      socket.on("start-stream", (data) => {
        socket.broadcast.emit("start-stream", data);
      });
      console.log("Socket Connected!");
    });
  }

  private getAddress(): string {
    const nets = networkInterfaces();
    let address;

    if (nets.Ethernet) {
      nets.Ethernet.forEach((item) => {
        if (item.family === "IPv4" && !item.internal) {
          address = item.address;
        }
      });
    } else if (nets.Wifi) {
      nets.Wifi.forEach((item) => {
        if (item.family === "IPv4" && !item.internal) {
          address = item.address;
        }
      });
    }

    return address;
  }

  // stop() {
  //   if (!this.httpServer) {
  //     throw new Error("Server is not started");
  //   }
  //   this.server.close();
  //   this.server = null;
  // }

  async start(): Promise<ServerDetails> {
    const address = this.getAddress();

    if (!address) {
      throw new Error("LAN cannot be established");
    }

    if (!this.port) {
      this.port = await getPort({ port: 5000 });
    }

    this.httpServer.listen(this.port);
    return { address, port: this.port };
  }
}

export default new Server();
