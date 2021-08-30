const nodemailer= require('nodemailer')
const transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    auth: {
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})
const sendRecoveryEmail = async(email, token) => {

    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Truesight Password Recovery",
        text: 'Go to ' + process.env.CLIENT_IP + '/resetpassword?token=' + token + " to recover your password. \n"
        + "This link is valid for one hour. \n\n"
        + "If you did not request this, feel free to ignore this email."
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
        } else {
            console.log('Email sent:' + info.response)
        }
    })
}

module.exports = {sendRecoveryEmail}