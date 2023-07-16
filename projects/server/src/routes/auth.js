const { auth: authController } = require("./../controller");
const router = require("express").Router();
const validateMiddleware = require("../middleware/validation/auth");
const authMiddleware = require("../middleware/auth");

router.post(
  "/register",
  authMiddleware.verifyTokenAdmin,
  authController.registerAdmin
);

router.post(
  '/access',
  authController.updateEmployeeData
);

router.post(
  "/login", 
  validateMiddleware.validateEmployeePassword, 
  authController.login
);

router.get(
  "/keeplogin", 
  authMiddleware.verifyToken, 
  authController.keepLogin
);

module.exports = router;