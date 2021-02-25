import ipcService from "./ipcService";

class ServerService {
  async start(): Promise<number> {
    const port = await ipcService("start-server");
    return port;
  }
}

export default new ServerService();
