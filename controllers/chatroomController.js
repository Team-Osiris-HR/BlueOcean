const Chatroom = require("../models/Chatroom.js");
const catchAsync = require("../utils/catchAsync.js");
const User = require("../models/User.js");
const Post = require("../models/Post.js");
const factory = require('./handlerFactory.js');

exports.getAllRooms = factory.findAll(Chatroom);
exports.getOneUserChat = factory.getOne(Chatroom);
exports.deleteRoom = factory.deleteOne(Chatroom);

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
      thisObj.donorId = obj[i].userTwo._id;
    } else {
      thisObj["name"] = obj[i].userOne.name;
      thisObj["userPhoto"] = obj[i].userOne.photo;
      thisObj.donorId = obj[i].userOne._id;
    }
    thisObj.chatroomId = userChats[i]._id;
    thisObj["title"] = obj[i].product.title;
    thisObj["photos"] = obj[i].product.photos[0] || [];
    thisObj["postId"] = obj[i].product._id;
    thisObj["roomId"] = obj[i]._id;
    results.push(thisObj);
  }
  res.status(200).json(results);
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
//