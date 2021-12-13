const mongoose = require('mongoose');
const User = require('./User');
const Chatroom = require('./Chatroom');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    maxlength: [255, 'Message must be less than 255 characters'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom',
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;