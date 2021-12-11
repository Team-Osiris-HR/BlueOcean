const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController.js');
const authController = require('../controllers/authController.js');

router.use(authController.protect);

router.get('/chatroom', messageController.getAllMessagesChatroom);
router.get('/', authController.restrictTo('admin') ,messageController.getAllMessages);

router.post('/create', messageController.postMessage);

router.patch('/edit', messageController.editMessage);

router.delete('/delete', messageController.deleteMessage);

module.exports = router;