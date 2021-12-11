const mongoose = require('mongoose');
// const User = require('./User.js');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
  },
  description: {
    type: String,
    required: [true, 'A description is required'],
  },
  photos: {
    type: [String],
    required: [false, 'A photo is required'], // MODIFY THIS SETTING TO REQUIRE PHOTOS
  },
  condition: {
    type: String,
    enum: ['new', 'fair', 'good', 'used', 'poor'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  deliveryOptions: {
    type: String,
    enum: ['pickup', 'delivery', 'negotiable']
  },
  category: {
    type: String,
    // enum: ['electronics', 'clothing', 'books', 'furniture', 'other'], DO SOMETHING WITH ME LATER PLEASE
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;