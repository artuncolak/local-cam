import express, { Express } from "express";
import path from "path";
import getPort from "get-port";
import ejs from "ejs";

export default class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.set("view engine", "ejs");
    this.app.engine("ejs", ejs.__express);
    this.app.set("views", path.join(__dirname, "/views"));
    this.app.get("/", (req, res) => {
      res.render("home");
    });
  }

  async start(): Promise<number> {
    const PORT = await getPort({ port: 5000 });
    this.app.listen(PORT, () => console.log("Listening"));
    return PORT;
  }
}
