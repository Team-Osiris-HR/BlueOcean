const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const postController = require('../controllers/postController.js');

route.use(authController.protect);

router.post('/', postController.createPost);

router.patch('/:id/favorite', userController.addFavorite);


module.exports = router;