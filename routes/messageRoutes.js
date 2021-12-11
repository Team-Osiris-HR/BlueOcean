const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController.js');
const authController = require('../controllers/authController.js');

router.use(authController.protect);
router.get('/', messageController.getAllMessagesChatroom);




module.exports = router;