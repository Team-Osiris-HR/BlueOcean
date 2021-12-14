const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');
const chatroomController = require('../controllers/chatroomController.js');

router.use(authController.protect);

router.use('/:chatroomId/messages', (req, res, next) => {
  req.chatroomId = req.params.chatroomId;
  next();
}, require('./messageRoutes.js'));

router.get('/', authController.restrictTo('admin'), chatroomController.getAllRooms);
router.get('/mychats', chatroomController.getUserChats);
router.get('/:chatId', chatroomController.getOneUserChat);

router.post('/newroom', chatroomController.createRoom);

router.patch('/:chatId', chatroomController.toggleRoom);

router.delete('/:chatId/delete', chatroomController.deleteRoom);


module.exports = router;