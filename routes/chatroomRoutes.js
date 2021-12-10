const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');
const Chatroom = require('../models/Chatroom.js');

router.use(authController.protect);

router.use('/:chatroomId/messages', (req, res, next) => {
  req.chatroomId = req.params.chatroomId;
  next();
}, require('./messageRoutes.js'));



module.exports = router;