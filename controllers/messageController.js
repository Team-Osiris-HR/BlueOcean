const User = require('../models/User.js');
const Chatroom = require('../models/Chatroom.js');
const Messages = require('../models/ChatMessage.js');
const catchAsync = require('../utils/catchAsync.js');

exports.getAllMessagesChatroom = catchAsync(async (req, res) => {
  const messages = await Messages.find({chatroom: req.chatroomId});
  for (let i = 0; i < messages.length; i++) {
    const user = await User.findById(messages[i].user);
    messages[i].name = user.name;
  }

  if (!messages) {
    return res.sendStatus(404);
  }
  res.status(200).json(messages);
});

exports.getAllMessages = catchAsync(async (req, res) => {
  const messages = await Messages.find();
  res.status(200).json(messages);
});

exports.postMessage = catchAsync(async (req, res) => {
  let newMessage = {};
  newMessage.chatroom = req.chatroomId;
  newMessage.user = req.user;
  newMessage.name = req.user.name;
  newMessage.message = req.body.message;
  const message = await Messages.create(newMessage);

  if (!message) {
    return res.sendStatus(500);
  }
  res.status(200).json(message);
});

exports.editMessage = catchAsync(async (req, res) => {
  const message = await Messages.findByIdAndUpdate(req.params.messageId, req.body, {
    // return new document
    new: true,
  });

  if (!message) {
    return res.sendStatus(404);
  }
  res.status(200).json(message);
});

exports.deleteMessage = catchAsync(async (req, res) => {
  const message = await Messages.findByIdAndDelete(req.params.messageId);

  if (!message) {
    return res.sendStatus(400);
  }
  res.sendStatus(204);
});