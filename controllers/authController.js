const User = require("../models/User.js");
const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync.js");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const nodemailer = require("nodemailer");

const config = require("../controller.config.js");

const expirey = 24 * 60 * 60 * 1000;


async function sendMail(message1, message2, message3, token, user) {
  let transporter = nodemailer.createTransport(require('../email.config.js'));

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Mike" <osiris@aledoux.net>', // sender address
    to: `${user.email}`, // list of receivers
    subject: "Your password reset token (valid for 10 minutes)", // Subject line
    html: `<b>${message1}</b><br /><b>${message2}</b> <p>${token}</p><br /><b>${message3}</b>`, // html body
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  if (!newUser) {
    return next(new Error("Please provide all required fields"));
  }
  this.sendToken(newUser, 201, req, res);
});

exports.signToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: expirey,
  });
};

exports.sendToken = (user, statusCode, req, res) => {
  const token = this.signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + expirey),
    // httpOnly: true,
  });

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return next(new Error("Please provide name and password", 400));
  }

  const user = await User.findOne({ name }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new Error("Incorrect name or password", 401));
  }

  this.sendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "Thanks for visiting", {
    expires: new Date(Date.now() + 10 * 1000),
    // httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new Error("You are not logged in"), 401);
  }

  const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new Error("The user belonging to this token does no longer exist"),
      401
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new Error("User recently changed password! Please log in again"),
      401
    );
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error("You do not have permission to perform this action"),
        403
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Error("There is no user with that email address"), 404);
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const message1 = `Forgot your password?`;
  const message2 = `Here is your token: `;
  const message3 = `If you didn't forget your password, please ignore this email.`;

  await sendMail(message1, message2, message3, resetToken, user).catch(console.error);

  res.status(200).json({
    status: "success",
    message: "created token",
    token: resetToken,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new Error("Token is invalid or has expired"), 400);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.cookie("jwt", this.signToken(user._id), {
    expires: new Date(Date.now() + expirey),
    httpOnly: true,
  });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    token: req.params.token,
    data: {
      user,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new Error("Your current password is wrong"), 401);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordChangedAt = Date.now();
  await user.save();

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
