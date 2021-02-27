import ipcService from "./ipcService";

interface ServerDetails {
  address: string;
  port: number;
}

class ServerService {
  async start(): Promise<ServerDetails> {
    const serverDetails = await ipcService("start-server");
    return serverDetails;
  }

  async stop(): Promise<void> {
    await ipcService("stop-server");
  }
}

export default new ServerService();
