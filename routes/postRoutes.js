const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const DIR = "./dist/public/img/posts";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "img-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const postController = require('../controllers/postController.js');

router.use(authController.protect);


router.get('/', postController.getAllPosts);
router.get('/:id', postController.getOnePost);

router.post('/', upload.single('photos'), postController.createPost);
router.post('/:id', postController.addQA);
router.post('/:id/:QAid', postController.answerQA);

router.patch('/:id', postController.updatePost);
router.patch('/:id/favorite', userController.addFavorite);
router.patch('/:id/toggle', postController.togglePost);

router.delete('/:id', authController.restrictTo('admin'), postController.deletePost);


module.exports = router;