const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service:"gmail",
    auth: {
        user:process.env.SMTP_USER,
        pass:"kyqkfrtnmmvyobrg",
    },
    tls:{
        rejectUnauthorized: false,
    },
});

module.exports = transporter;