/* eslint-disable no-undef */

const socket = io("/");
socket.on("start-stream", (data) => {
  document.getElementById("stream").src = data;
});
