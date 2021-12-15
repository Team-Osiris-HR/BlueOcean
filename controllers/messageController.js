const User = require('../models/User.js');
const Chatroom = require('../models/Chatroom.js');
const Messages = require('../models/ChatMessage.js');
const Post = require('../models/Post.js');
const catchAsync = require('../utils/catchAsync.js');
const factory = require('./handlerFactory.js');

exports.getAllMessagesChatroom = catchAsync(async (req, res) => {
  const chatroom = await Chatroom.find({ product: req.chatroomId });
  let messages = await Messages.find({ chatroom });
  // let messages = await Messages.find({ userOne: req.user._id });
  //console.log('first get', messages)
  // messages = messages.concat(await Messages.find({ userTwo: req.user._id }));
  // const chatroom = await Chatroom.findById(req.chatroomId);
  // const post = await Post.findById(req.chatroomId);
  // const user = await User.findById(post.user);
  // //console.log('second get', messages)
  // messages = messages.filter(message => {
  //   //console.log(message.chatroom.toString() === chatroom[0]._id.toString());
  //   // console.log("id", message.user._id, req.user._id)
  //   return message.chatroom.toString() === chatroom[0]._id.toString();
  //   // (message.user._id.toString() === req.user._id.toString() || message.user._id.toString() === user._id.toString()) && message.chatroom === chatroom[0]._id;
  // })
  // messages = messages.filter((mesage) => message.userOne === req.);
  // for (let i = 0; i < messages.length; i++) {
  //   const user = await User.findById(messages[i].user);
  //   messages[i].name = user.name;
  // }
  //console.log(messages)
  if (!messages) {
    return res.sendStatus(404);
  }
  res.status(200).json(messages);
});

// exports.getAllMessages = catchAsync(async (req, res) => {
//   const messages = await Messages.find();
//   res.status(200).json(messages);
// });

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