import { ipcRenderer } from "electron";

function ipcService(channel): Promise<any> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(channel);
    ipcRenderer.on("response", (event, data) => {
      resolve(data);
    });
  });
}

export default ipcService;
