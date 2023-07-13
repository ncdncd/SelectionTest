const { auth: authController } = require("./../controller");
const router = require("express").Router();
const validateMiddleware = require("../middleware/validation/auth");

router.post(
  "/register",
  authController.registerAdmin
);

router.post(
  '/access', 
  authController.updateEmployeeData
);

router.post("/login", authController.login);

module.exports = router;