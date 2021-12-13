const express = require("express");
const app = express();
const path = require("path");
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server);

const mongoose = require("mongoose");
const config = require("./db.config.js");

io.on("connection", (socket) => {
  console.log('Your socket ID: ', socket.id);
  socket.on('something', (msg) => {
    console.log(`${msg} ${socket.id}`)
  })
})

const db = config.DATABASE.replace("-PASSWORD-", config.DATABASE_PASSWORD);

mongoose.connect(db).then(() => {
  console.log("db connected");
});

app.use(express.static("dist"));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
