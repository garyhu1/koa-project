/**
 * 邮箱验证
 */
const nodemailer = require("nodemailer");

// 创建一个SMTP客户端
const transporter = nodemailer.createTransport({
    // host: 'smtp.exmail.qq.com',
    service: "qq",     // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    secure: true,
    secureConnection: true,
    port: 465,
    auth: {
      user: "942984941@qq.com",
      pass: "lwxxnmgbvgembdda"    // 这里密码不是qq密码，是你设置的smtp授权码
    }
})

//邮件内容
let mail = {
    transporter: transporter,
    send(mail, link) {
        let mailOptions = {
            from: '"Welcome 猪宝 👻" <942984941@qq.com>', // 发送方邮箱
            to: mail, // list of receivers
            subject: '欢迎注册√', // Subject line
            text: "MY KOA PROJECT", // plain text body
            html: `欢迎注册,点击链接完成注册<br/><a href='${link}'>${link}</a>` // html body   
        }

        //发送邮件
        return new Promise((resolve,reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                   reject(error)
                }else {
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    resolve(info);
                }
            });
        });
    }
}

module.exports = mail;