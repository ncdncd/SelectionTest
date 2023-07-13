
const db = require("../models");


module.exports = {

    async clockIn(req, res) {

        const userId = req.user.id;
        
        try {

          const isClockedIn = await db.Attendance.findOne({
            where: {
              user_id: userId
            },
          });
          if (isClockedIn) {
            return res.status(400).send({
              message: "already clocked in today",
            });
          }

          const clockInTime = await db.Attendance.create({
            user_id: userId,
            clock_in: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            isValid: false,
          });
    
          res.send({
            message: "clocked in for today",
            data: clockInTime.clock_in,
          });

        } catch (error) {
          res.status(500).send({
            message: "fatal error on server",
            error: error.message,
          });
        }
      },

}