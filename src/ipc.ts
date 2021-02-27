import { ipcMain } from "electron";

import server from "./server";

ipcMain.on("start-server", async (event, arg) => {
  try {
    const serverDetails = await server.start();
    event.reply("response", serverDetails);
  } catch (error) {
    event.reply("error", error);
  }
});

ipcMain.on("stop-server", async (event, arg) => {
  //TODO: Yorum satırını sil
  try {
    //await server.stop();
    event.reply("response");
  } catch (error) {
    event.reply("error", error);
  }
});
