const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");

const router = require("express").Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgot", authController.forgotPassword);
router.post('/reset', authController.resetPassword);

router.use(authController.protect);
router.get('/myinfo', userController.getMyInfo);

router.get('/setloginstatus', userController.setLogIn);
router.get('/setlogoutstatus', userController.setLogOut);

router.get("/logout", authController.logout);

router.get("/", authController.restrictTo("admin"), userController.getAllUsers);

router.get("/myinfo", userController.getMyInfo);
router.get("/:id", authController.restrictTo("admin"), userController.getUser);

router.patch("/updatemypassword", authController.updatePassword);
router.patch('/:id/updateinfo', userController.updateUser);
router.patch('/')

router.delete(
  "/:id",
  authController.restrictTo("admin"),
  userController.deleteUser
);
router.delete("/me", userController.deleteMe);

module.exports = router;
