const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");

const router = require("express").Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(authController.protect);
router.get('/myinfo', userController.getMyInfo);

router.get('/setloginstatus', userController.setLogIn);
router.get('/setlogoutstatus', userController.setLogOut);

router.patch("/updatemypassword", authController.updatePassword);
router.get("/logout", authController.logout);

router.get("/", authController.restrictTo("admin"), userController.getAllUsers);

router.get("/myinfo", userController.getMyInfo);
router.get("/:id", authController.restrictTo("admin"), userController.getUser);

router.delete(
  "/:id",
  authController.restrictTo("admin"),
  userController.deleteUser
);
router.delete("/me", userController.deleteMe);

module.exports = router;
