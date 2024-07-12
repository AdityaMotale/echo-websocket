const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (_, res) => {
  res.send("echo websocket server");
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.emit("message", `${Date.now()}:${message}`);
  });

  socket.on("disconnect", () => {});
});

module.exports = server;
