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
});
