const authController= require('../controllers/authController.js');

const router = require('express').Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/', authController.protect, (req, res) => {
    res.send('Hello World');
});

module.exports = router;