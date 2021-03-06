const User = require('../models/User.js');
const Chatroom = require('../models/Chatroom.js');
const Messages = require('../models/ChatMessage.js');
const Post = require('../models/Post.js');
const catchAsync = require('../utils/catchAsync.js');
const factory = require('./handlerFactory.js');

exports.getAllMessagesChatroom = catchAsync(async (req, res) => {
  const chatroom = await Chatroom.findById(req.chatroomId);
  let messages = await Messages.find({ chatroom });

  if (!messages) {
    return res.sendStatus(404);
  }
  res.status(200).json(messages);
});

exports.getAllMessages = factory.findAll(Messages);

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
