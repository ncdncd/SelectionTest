const { Sequelize } = require("sequelize");
const db = require("../models");
const dayjs = require('dayjs');

module.exports = {

    async clockIn(req, res) {

        const userId = req.user.id;
        
        try {

          const isClockedIn = await db.Attendance.findOne({
            where: {
              user_id: userId,
              date: dayjs().format('YYYY-MM-DD')
            },
          });
          if (isClockedIn) {
            return res.status(400).send({
              message: "already clocked in today",
            });
          }
          

          const clockInTime = await db.Attendance.create({
            user_id: userId,
            clock_in: dayjs(),
            date: dayjs().format('YYYY-MM-DD'),
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

      async clockOut(req, res) {

        const userId = req.user.id;
        
        try {

          const isClockedIn = await db.Attendance.findOne({
            where: {
              user_id: userId,
              date: dayjs().format('YYYY-MM-DD'),
            },
          });
          if (!isClockedIn) {
            return res.status(400).send({
              message: "you haven't clocked in today",
            });
          }
          if (isClockedIn.clock_out) {
            return res.status(400).send({
              message: "you already clocked out today",
            });
          }

          isClockedIn.clock_out = new Date();
          isClockedIn.isValid = true;
          
          await isClockedIn.save();
    
          res.send({
            message: "clocked out for today",
            data: isClockedIn.clock_out,
          });

        } catch (error) {
          res.status(500).send({
            message: "fatal error on server",
            error: error.message,
          });
        }
      },

      async attendanceLog(req, res) {

        const userId = req.user.id;

        const {month, year} = req.body;

        try {

          const clockData = await db.Attendance.findAll({
            where: {
              user_id: userId,
              date: {[Sequelize.Op.between]: 
                [new Date(`${year}-${month}-1`),new Date(`${year}-${month + 1}`)]}
            },
          });
          if (clockData === "") {
            return res.status(400).send({
              message: "zero attendance data found",
            });
          }
          if (!clockData) {
            return res.status(400).send({
              message: "attendance data not found",
            });
          }
          
          res.send({
            message: "attendance data displayed",
            data: clockData,
          });

        } catch (error) {
          res.status(500).send({
            message: "fatal error on server",
            error: error.message,
          });
        }
      },  

}