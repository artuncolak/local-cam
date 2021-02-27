import ejs from "ejs";
import express, { Express } from "express";
import getPort from "get-port";
import { Server as HttpServer } from "http";
import { networkInterfaces } from "os";
import path from "path";

interface ServerDetails {
  address: string;
  port: number;
}

class Server {
  private app: Express;
  private server: HttpServer;

  constructor() {
    this.app = express();
    this.app.set("view engine", "ejs");
    this.app.engine("ejs", ejs.__express);
    this.app.set("views", path.join(__dirname, "/views"));
    this.app.get("/", (req, res) => {
      res.render("home");
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

  stop() {
    if (!this.server) {
      throw new Error("Server is not started");
    }
    this.server.close();
    this.server = null;
  }

  async start(): Promise<ServerDetails> {
    if (this.server) {
      throw new Error("Server is already started");
    }

    const address = this.getAddress();

    if (!address) {
      throw new Error("LAN cannot be established");
    }

    const PORT = await getPort({ port: 5000 });
    this.server = this.app.listen(PORT);
    return { address, port: PORT };
  }
}

export default new Server();
