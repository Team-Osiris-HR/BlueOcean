const authController= require('../controllers/authController.js');

const router = require('express').Router();

router.post('/signup', authController.signup);

module.exports = router;