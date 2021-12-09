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
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'Thanks for visiting', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
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
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error('You do not have permission to perform this action'), 403);
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ name: req.body.name });

  if (!user) {
    return next(new Error('There is no user with that email address'), 404);
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

  // await sendEmail({
  //   email: user.email,
  //   subject: 'Your password reset token (valid for 10 minutes)',
  //   message,
  // });

  res.status(200).json({
    status: 'success',
    message: 'created token',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new Error('Token is invalid or has expired'), 400);
  }

  /*
  axios.post(/api/resetPassword/:token, {
    password: 'newpassword',
    passwordConfirm: 'newpassword',
  } ,(req, res) => {

  })

  */
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // const token = signToken(user._id);

  res.cookie('jwt', signToken(user._id), {
    expires: new Date(Date.now() + expirey),
    httpOnly: true,
  });

  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});