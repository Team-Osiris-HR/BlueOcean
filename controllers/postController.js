const Post = require('../models/Post.js');
const catchAsync = require('../utils/catchAsync');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    status: 'success',
    results: posts.length,
    posts,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  req.body.user = req.user;
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: 'success',
    post: newPost,
  });
});

exports.getOnePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    post,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
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