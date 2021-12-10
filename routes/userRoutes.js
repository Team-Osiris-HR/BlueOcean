const authController= require('../controllers/authController.js');
const userController= require('../controllers/userController.js');

const router = require('express').Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect);

router.patch('/updatemypassword', authController.updatePassword);
router.get('/logout', authController.logout);

router.get('/', authController.restrictTo('admin'), userController.getAllUsers);

router.get('/:id', authController.restrictTo('admin'), userController.getUser);
router.get('myinfo', userController.getMyInfo);


module.exports = router;