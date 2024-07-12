const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (_, res) => {
  res.send("websocket service for echo chat");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message) => {
    socket.emit("message", `${Date.now()} : ${{ message }}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
