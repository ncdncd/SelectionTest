const attendanceController = require("./../controller/attendance");
const router = require("express").Router();
const validateMiddleware = require("../middleware/validation/auth");
const authMiddleware = require("../middleware/auth");

router.post(
  "/clockin",
  authMiddleware.verifyTokenStaff,
  attendanceController.clockIn
);

module.exports = router;