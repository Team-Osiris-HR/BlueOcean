const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const postController = require('../controllers/postController.js');

router.use(authController.protect);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getOnePost);

router.post('/', postController.createPost);

router.patch('/:id', postController.updatePost);
router.patch('/:id/favorite', userController.addFavorite);

router.delete('/:id', postController.deletePost);


module.exports = router;