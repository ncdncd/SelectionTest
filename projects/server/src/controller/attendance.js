const { Sequelize } = require("sequelize");
const db = require("../models");
const moment = require('moment-timezone');

module.exports = {

    async clockIn(req, res) {

        const userId = req.user.id;
        
        try {

          const isClockedIn = await db.Attendance.findOne({
            where: {
              user_id: userId,
              date: moment().format('YYYY-MM-DD')
            },
          });
          if (isClockedIn) {
            return res.status(400).send({
              message: "already clocked in today",
            });
          }
          

          const clockInTime = await db.Attendance.create({
            user_id: userId,
            clock_in: moment(),
            date: moment().format('YYYY-MM-DD'),
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
              date: moment().format('YYYY-MM-DD'),
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

          isClockedIn.clock_out = moment();
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

        const {year, month} = req.query;

        const pagination = {
          page: Number(req.query.page) || 1,
          perPage: Number(req.query.perPage) || 7,
        };

        try {

          const {count, rows } = await db.Attendance.findAndCountAll({
            where: {
              user_id: userId,
              [Sequelize.Op.and]: [
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), year),
                Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), month),
            ],
            },
            limit: pagination.perPage,
            offset: (pagination.page - 1) * pagination.perPage,
            order: [
              ['date', 'DESC'],
          ],
          });
          if (!rows) {
            return res.status(400).send({
              message: "attendance data not found",
            });
          }
        
        const totalPages = Math.ceil(count / pagination.perPage);
          
          res.send({
            message: "attendance data displayed",
            pagination: {
              page: pagination.page,
              perPage: pagination.perPage,
              totalPages: totalPages,
              totalData: count,
            },
            data: rows,
          });

        } catch (error) {
          res.status(500).send({
            message: "fatal error on server",
            error: error.message,
          });
        }
    },

    async calculatePayAtEoM(req, res) {

        const userId = req.body.id;

        const {year_month} = req.body;

        try {
          
          const parsedDate = year_month.split('-')

          const payData = await db.User.findAll({
            where: {
              id: userId
            },
            attributes: ['id', 'email', 'role_id'],
            include:[
                {model: db.Employee_detail, attributes: ['full_name'], as: "Employee_detail",
                include:[{model: db.Salary, attributes: ['basic_salary']}]
                },
                {model: db.Attendance, attributes: ['clock_in', 'clock_out', 'date', 'isValid'],
                where: {
                  [Sequelize.Op.and]: [
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), parsedDate[0]),
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), parsedDate[1]),
                ],
                  },
                }
            ],
          });

          if (payData === "") {
            return res.status(400).send({
              message: "zero attendance data found",
            });
          }
          if (!payData) {
            return res.status(400).send({
              message: "attendance data not found",
            });
          }

          const payrollExist = await db.Payroll.findOne({
            where: {
              user_id: userId,
              date: new Date(`${parsedDate[0]}-${parsedDate[1]}`),
            },
          });
          if (payrollExist) {
            return res.status(400).send({
              message: "payroll for that month already exist",
            });
          }

        const payPerDay = Math.floor(payData[0].Employee_detail.Salary.basic_salary/21)

        const notValidCount = payData[0].Attendances.filter(
            aData => aData.isValid === false).length

        const totalDeduction = 
        ((21 - payData[0].Attendances.length) * payPerDay) + 
        notValidCount * Math.floor(payPerDay/2)

        const newPayroll = await db.Payroll.create({
            user_id: userId,
            date: new Date(`${year_month}`),
            total_deduction: totalDeduction,
            total_payroll: payData[0].Employee_detail.Salary.basic_salary - totalDeduction
        });

          res.send({
            message: "payroll for that employee this month",
            data: newPayroll,
          });

        } catch (error) {
          res.status(500).send({
            message: "could not find attendance data",
            error: error.message,
          });
        }
    },

    async employeePayrollReport(req, res) {

        const userId = req.user.id;

        const {year_month} = req.body;

        try {
          
          const parsedDate = year_month.split('-')

          const payRollData = await db.Payroll.findOne({
            where: {
              user_id: userId,
              [Sequelize.Op.and]: [
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), parsedDate[0]),
                Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), parsedDate[1]),
            ],
            },
          });
          if (!payRollData) {
            return res.status(400).send({
              message: "payroll data not found",
            });
          }
          
          res.send({
            message: "your payroll for the chosen timeframe",
            data: payRollData,
          });

        } catch (error) {
          res.status(500).send({
            message: "fatal error on server",
            error: error.response.data,
          });
        }
    },

    async employeePayrollReportYear(req, res) {

      const userId = req.user.id;

      const {year} = req.body;
      
      try {

        const payRollDataYear = await db.Payroll.findAll({
          where: {
            user_id: userId,
            [Sequelize.Op.and]: [
              Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), year),
          ],
          },
        });
        if (!payRollDataYear) {
          return res.status(400).send({
            message: "payroll data not found",
          });
        }

        const totalOnly = payRollDataYear.map(
          (m) => m.total_payroll)

        const totalSalary = totalOnly.reduce((total, n) => total + n, 0)
        
        res.send({
          message: "your payroll for the chosen timeframe",
          data: totalSalary,
        });

      } catch (error) {
        res.status(500).send({
          message: "fatal error on server",
          error: error.message,
        });
      }
  },

    async clockToday(req, res) {

        const userId = req.user.id;

        try {

          const clockData = await db.Attendance.findOne({
            where: {
              user_id: userId,
              date: moment().format('YYYY-MM-DD'),
            },
          });
          if (!clockData) {
            return res.status(400).send({
              message: "no clock in data today",
            });
          }
          
          res.send({
            message: "clock data today",
            data: clockData,
          });

        } catch (error) {
          res.status(500).send({
            message: "fatal error on server",
            error: error.message,
          });
        }
    },

    async employeeData(req, res) {

      const userId = req.user.id;

      try {

        const empData = await db.Employee_detail.findAll({
        });

        if (!empData) {
          return res.status(400).send({
            message: "no employee data found",
          });
        }
        
        res.send({
          message: "all employee data displayed",
          data: empData,
        });

      } catch (error) {
        res.status(500).send({
          message: "fatal error on server",
          error: error.message,
        });
      }
  },

}