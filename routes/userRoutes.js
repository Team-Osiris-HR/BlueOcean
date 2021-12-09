const authController= require('../controllers/authController.js');

const router = require('express').Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect);

router.patch('/updatemypassword', authController.updatePassword);
router.get('/logout', authController.logout);

router.get('/', (req, res) => {
  console.log(req.user);
    res.send('Hello World');
});

module.exports = router;