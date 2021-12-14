const Post = require('../models/Post.js');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User.js');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  // let obj = {};
  // let user;
  // const results = [];
  // let placeholder = {};
  // for (let i = 0; i < posts.length; i++) {
  //   obj = {};
  //   user = await User.findById(posts[i].user);
  //   obj.name = user.name;
  //   obj.email = user.email;
  //   for (let key in posts[i]) {
  //     obj[key] = posts[i][key];
  //     console.log(key);
  //   }
  //   console.log(obj);
  //   results.push(obj);
  // }
  res.status(200).json({
    status: 'success',
    results: posts.length,
    posts
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  req.body.user = req.user;
  req.body.username = req.user.name;
  req.body.email = req.user.email;
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: 'success',
    post: newPost,
  });
});

exports.getOnePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(post.user);
  post.user = user;
  res.status(200).json({
    status: 'success',
    post,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: 'success',
    post,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.togglePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new Error('Uh oh something went very wrong'));
  }
  post.active = !post.active;
  post.save();
  res.status(200).json({
    status: 'success',
    post,
  });
});

exports.addQA = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      status: 'fail',
      message: 'Post not found',
    });
  }
  post.QAs.push(req.body);
  post.save();
  res.status(201).json({
    status: 'success',
    post,
  });
});

exports.answerQA = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      status: 'fail',
      message: 'Post not found',
    });
  }
  for (let i = 0; i < post.QAs.length; i++) {
    if (post.QAs[i]._id.toString() === req.params.QAid) {
      post.QAs[i].answerText = req.body.answerText;
      post.save();
      res.status(201).json({
        status: 'success',
        post,
      });
    }
  }
});