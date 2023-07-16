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
    "/clock",
    authMiddleware.verifyTokenStaff,
    attendanceController.clockToday
);

router.get(
    "/history",
    authMiddleware.verifyTokenStaff,
    attendanceController.attendanceLog
);

router.post(
    "/payroll",
    authMiddleware.verifyTokenAdmin,
    attendanceController.calculatePayAtEoM
);

router.get(
    "/payroll",
    authMiddleware.verifyTokenStaff,
    attendanceController.employeePayrollReport
);

router.get(
    "/employee",
    authMiddleware.verifyTokenAdmin,
    attendanceController.employeeData
);

module.exports = router;