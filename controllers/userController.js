const User = require('../models/User.js');
const Post = require('../models/Post.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');


exports.getAllUsers = factory.findAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.getMyInfo = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
});

exports.addFavorite = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({
      status: 'fail',
      message: 'Post not found',
    })
  }
  if (user.favorites.includes(post)) {
    let index = user.favorites.indexOf(post);
    user.favorites.splice(index, 1);
    res.status(200).json({
      status: 'success',
      message: 'Post removed from favorites',
    });
  } else {
    user.favorites.push(post);
    user.save();
    res.status(200).json({
      status: 'success',
      user,
    });
  }
});

exports.deleteMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.active = !user.active;
  user.save();
  res.sendStatus(200);
});

exports.setLogIn = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.loggedIn = true;
  user.save();
  res.status(200).json({
    status: 'success',
    user,
    message: 'User logged in status set to true',
  });
});

exports.setLogOut = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.loggedIn = false;
  user.save();
  res.status(200).json({
    status: 'success',
    user,
    message: 'User logged in status set to false',
  });
});
