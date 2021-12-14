const Chatroom = require("../models/Chatroom.js");
const catchAsync = require("../utils/catchAsync.js");
const User = require("../models/User.js");
const Post = require("../models/Post.js");

exports.getAllRooms = catchAsync(async (req, res) => {
  const roomList = await Chatroom.find();
  res.status(200).json(roomList);
});

exports.getUserChats = catchAsync(async (req, res) => {
  let userChats = await Chatroom.find({ userOne: req.user._id });
  let userChats2 = await Chatroom.find({ userTwo: req.user._id });
  userChats = userChats.concat(userChats2);
  let obj = [];
  const results = [];
  for (let i = 0; i < userChats.length; i++) {
    let user = await User.findById(userChats[i].userOne);
    let userTwo = await User.findById(userChats[i].userTwo);
    let product = await Post.findById(userChats[i].product);
    obj.push({
      userOne: user,
      userTwo: userTwo,
      product: product,
    });
  }
  let thisObj;
  for (let i = 0; i < obj.length; i++) {
    thisObj = {};
    if (obj[i].userOne.name === req.user.name) {
      thisObj["name"] = obj[i].userTwo.name;
      thisObj["userPhoto"] = obj[i].userTwo.photo;
      thisObj.id = obj[i].userTwo._id;
    } else {
      thisObj["name"] = obj[i].userOne.name;
      thisObj["userPhoto"] = obj[i].userOne.photo;
      thisObj.id = obj[i].userOne._id;
    }
    thisObj["title"] = obj[i].product.title;
    thisObj["photos"] = obj[i].product.photos[0] || [];
    thisObj["postId"] = obj[i].product._id;
    thisObj["roomId"] = obj[i]._id;
    results.push(thisObj);
  }
  res.status(200).json(results);
});

exports.getOneUserChat = catchAsync(async (req, res) => {
  const chat = await Chatroom.find({ _id: req.params.chatId });

  if (!chat) {
    return res.sendStatus(400);
  }
  res.status(200).json(chat);
});

exports.createRoom = catchAsync(async (req, res) => {
  const post = await Post.findById(req.body.postId);
  const newRoom = {
    userOne: req.user,
    userTwo: post.user,
    product: req.body.postId,
    roomHash: req.body.roomHash,
  };

  const room = await Chatroom.create(newRoom);
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
