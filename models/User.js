const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name must be given!'],
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
});

userSchema.pre('save', async function (next) {
  // ONLY RUN THIS FUNCTION IF PASSWORD HAS BEEN MODIFIED
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
};

