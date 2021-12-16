const express = require("express");
const app = express();
const path = require("path");
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server);

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./db.config.js");

io.on("connection", (socket) => {
  console.log('Your socket ID: ', socket.id);
  socket.on('send', (messageObj, room) => {
    console.log('server', room);
    io.emit("receive", messageObj)
    //io.broadcast.to(room).emit("receive", messageObj)
  })
  socket.on('joinRoom', room => {
    socket.join(room)
    console.log(`you joined the room ${room}`)
  })
  socket.on('disconnect', () => {
    console.log('disconnect');
  })
})
const userRouter = require("./routes/userRoutes.js");
const postRouter = require("./routes/postRoutes.js");
const chatroomRouter = require("./routes/chatroomRoutes.js");

const db = config.DATABASE.replace("-PASSWORD-", config.DATABASE_PASSWORD);

mongoose.connect(db).then(() => {
  console.log("db connected");
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/chatrooms", chatroomRouter);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
