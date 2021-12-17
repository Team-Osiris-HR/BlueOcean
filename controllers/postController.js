const multer = require("multer");

const Post = require("../models/Post.js");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User.js");
const factory = require("./handlerFactory.js");

exports.getAllPosts = factory.findAll(Post);
exports.getOnePost = factory.getOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);

exports.createPost = catchAsync(async (req, res, next) => {
  req.body.user = req.user;
  req.body.username = req.user.name;
  req.body.email = req.user.email;
  req.body.photos = ["public/img/posts/" + req.file.filename];
  req.body.photos = req.body.photos.concat(req.body.photoUrls.split(","));

  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: "success",
    post: newPost,
  });
});

exports.togglePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new Error("Uh oh something went very wrong"));
  }
  post.active = !post.active;
  post.save();
  res.status(200).json({
    status: "success",
    post,
  });
});

exports.addQA = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      status: "fail",
      message: "Post not found",
    });
  }
  post.QAs.push(req.body);
  post.save();
  res.status(201).json({
    status: "success",
    post,
  });
});

exports.answerQA = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      status: "fail",
      message: "Post not found",
    });
  }
  for (let i = 0; i < post.QAs.length; i++) {
    if (post.QAs[i]._id.toString() === req.params.QAid) {
      post.QAs[i].answerText = req.body.answerText;
      post.save();
      res.status(201).json({
        status: "success",
        post,
      });
    }
  }
});
