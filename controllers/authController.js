const User = require('../models/user');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync.js');
const jwt = require('jsonwebtoken');

const config = require('../controller.config.js');

const expirey = 24 * 60 * 60 * 1000

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});


exports.signToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: expirey,
  });
};

exports.sendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + expirey),
    httpOnly: true,
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
}

exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return next(new Error('Please provide name and password', 400));
  }

  const user = await User.findOne({ name }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new Error('Incorrect name or password', 401));
  }

  sendToken(user, 200, req, res);
}

exports.logout = (req, res) => {
  res.cookie('jwt', 'Thanks for visiting', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new Error('You are not logged in'), 401);
  }

  const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new Error('The user belonging to this token does no longer exist'), 401);
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new Error('User recently changed password! Please log in again'), 401);
  }

  req.user = currentUser;
  next();
}