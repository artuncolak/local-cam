import ejs from "ejs";
import express, { Express } from "express";
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
    this.app.use("/static", express.static(path.join(__dirname, "public")));

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
      socket.on("start-stream", async (data) => {
        socket.broadcast.emit("start-stream", data);
      });
    });
  }

  private getAddress(): string {
    const nets = networkInterfaces();
    const results = Object.create(null);

    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === "IPv4" && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
        }
      }
    }

    return results[Object.keys(results)[0]];
  }

  stop() {
    this.httpServer.close();
  }

  async start(): Promise<ServerDetails> {
    const address = this.getAddress();

    console.log(address);

    if (!address) {
      throw new Error("LAN cannot be established");
    }

    if (!this.port) {
      this.port = 5000;
    }

    this.httpServer.listen(this.port);
    return { address, port: this.port };
  }
}

export default new Server();
