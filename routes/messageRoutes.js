const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController.js');
const authController = require('../controllers/authController.js');

router.use(authController.protect);

router.get('/', messageController.getAllMessagesChatroom);
router.get('/allmessages', authController.restrictTo('admin') ,messageController.getAllMessages);

router.post('/create', messageController.postMessage);

module.exports = router;