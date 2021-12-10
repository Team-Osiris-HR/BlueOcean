const User = require('../models/User.js');
const Chatroom = require('../models/Chatroom.js');
const Messages = require('../models/ChatMessage.js');
const catchAsync = require('../utils/catchAsync.js');

exports.getAllMessagesChatroom = catchAsync(async (req, res, next) => {
  const messages = await Messages.find({chatroom: req.chatroomId});

  if (!messages) {
    return res.sendStatus(404);
  }
  res.status(200).json(messages);
});

exports.editMessage = catchAsync(async (req, res, next) => {
  const message = await Messages.findByIdAndUpdate(req.params.messageId, req.body, {
    // return new document
    new: true,
  });

  if (!message) {
    return res.sendStatus(404);
  }
  res.status(200).json(message);
});

