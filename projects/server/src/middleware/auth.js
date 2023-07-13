const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const db = require("../models");

module.exports = {
  async verifyTokenStaff(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).send({
        message: "token is not found",
      });
      return;
    }

    const [format, token] = authorization.split(" ");
    if (format.toLocaleLowerCase() === "bearer") {
      try {
        const payload = jwt.verify(token, secretKey);
        if (!payload) {
          res.status(401).send({
            message: "token verification failed",
          });
          return;
        }
        req.user = payload;
        if(req.user.role_id === 2){
        next();
        }else{
            res.status(401).send({
                message: "not authorized",
            });
        }
      } catch (error) {
        res.status(401).send({
          message: "invalid token",
          error,
        });
      }
    }
  },

  async verifyTokenAdmin(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).send({
        message: "token is not found",
      });
      return;
    }

    const [format, token] = authorization.split(" ");
    if (format.toLocaleLowerCase() === "bearer") {
      try {
        const payload = jwt.verify(token, secretKey);
        if (!payload) {
          res.status(401).send({
            message: "token verification failed",
          });
          return;
        }
        req.user = payload;
        if(req.user.role_id === 1){
            next();
        }else{
            res.status(401).send({
                    message: "not authorized",
            });
        }
      } catch (error) {
        res.status(401).send({
          message: "invalid token",
          error,
        });
      }
    }
  },
};
