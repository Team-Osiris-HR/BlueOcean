const Chatroom = require("../models/Chatroom.js");
const catchAsync = require("../utils/catchAsync.js");

exports.getAllRooms = catchAsync(async (req, res) => {
  const roomList = await Chatroom.find();
  res.status(200).json(roomList);
});

exports.getUserChats = catchAsync(async (req, res) => {
  const userChats = await Chatroom.find({ userOne: req.user._id });
  const userChats2 = await Chatroom.find({ userTwo: req.user._id });
  userChats = userChats.concat(userChats2);

  res.status(200).json(roomList);
});

exports.getOneUserChat = catchAsync(async (req, res) => {
  const chat = await Chatroom.find({ _id: req.params.chatId });

  if (!chat) {
    return res.sendStatus(400);
  }
  res.status(200).json(chat);
});

exports.createRoom = catchAsync(async (req, res) => {
  const room = await Chatroom.create(req.body);
  res.status(201).json(room); //if needed
});

exports.toggleRoom = catchAsync(async (req, res) => {
  const room = await Chatroom.findById(req.params.chatId);
  room.active = !room.active;
  room.save();
  res.sendStatus(200);
});

exports.deleteRoom = catchAsync(async (req, res) => {
  const room = await Chatroom.findByIdAndDelete(req.params.chatId);
  res.sendStatus(204);
});
