const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name must be given!'],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    required: [true, 'A role must be given!'],
    enum: ['user', 'charity','admin'],
    default: 'user',
  },
  email: {
    type: String,
    required: [true, 'An email must be given!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email address!'],
  },
  photo: {
    type: String,
    default: 'eggplant.jpg',
  },
  password: {
    type: String,
    required: [true, 'A password must be given!'],
    minlength: 6,
    maxlength: 20,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A password confirmation must be given!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      }
    },
    message: 'Passwords do not match!',
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  phone: {
    type: String,
    validate: [validator.isMobilePhone, 'Invalid phone number!'],
  }
});

userSchema.pre('save', async function (next) {
  // ONLY RUN THIS FUNCTION IF PASSWORD HAS BEEN MODIFIED
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  // $gt $gte $lt $lte $ne $in $nin
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
