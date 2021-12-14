const mongoose = require('mongoose');
const User = require('./User');

const chatroomSchema = new mongoose.Schema({
  userOne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userTwo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomHash: {
    type: String,
    required: true,
  }
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);
module.exports = Chatroom;