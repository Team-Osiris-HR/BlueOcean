const express = require('express');
const router = express.Router();

router.use('/:chatroomId/messages', require('./messageRoutes.js'));

module.exports = router;