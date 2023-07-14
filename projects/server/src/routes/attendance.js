const attendanceController = require("./../controller/attendance");
const router = require("express").Router();
const validateMiddleware = require("../middleware/validation/auth");
const authMiddleware = require("../middleware/auth");

router.post(
  "/clockin",
  authMiddleware.verifyTokenStaff,
  attendanceController.clockIn
);

router.patch(
    "/clockout",
    authMiddleware.verifyTokenStaff,
    attendanceController.clockOut
);

router.get(
    "/history",
    authMiddleware.verifyTokenStaff,
    attendanceController.attendanceLog
);

router.get(
    "/pay",
    authMiddleware.verifyTokenStaff,
    attendanceController.calculatePayAtEoM
);

module.exports = router;