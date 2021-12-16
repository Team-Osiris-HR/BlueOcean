const multer = require('multer');

const Post = require('../models/Post.js');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User.js');

// const storage = multer.diskStorage({
//   destination: './dist/public/img/posts',
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage }).single('photos'); http://127.0.0.1:3000/dist/public/img/posts/img-1639602355195download.jpeg http://127.0.0.1:3000/public/img/posts/img-download.jpeg

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
  req.body.photos = ['public/img/posts/' + req.file.filename];
  req.body.photos = req.body.photos.concat(req.body.photoUrls.split(','));

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

// https://www.yesmagazine.org/wp-content/uploads/imports/0bf91a5233fc4b57a641bab18f270e02.png
// https://www.storyofstuff.org/wp-content/uploads/2020/03/logo-color_3fc18254.png