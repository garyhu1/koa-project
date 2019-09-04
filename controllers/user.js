const redis = require("../config/redis");
const jwt = require("jsonwebtoken");
const config = require("../config");
const util = require("util");
const svgCaptcha = require("svg-captcha");

const verify = util.promisify(jwt.verify) // 解密

class UserController {

    /**
     * 用户登录
     */
    static async login(ctx) {
        let user = ctx.request.body;
        console.log(JSON.stringify(user,null,4))
        if(user){
            if(!user.username || !user.password){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: "用户名或密码不能为空",
                    data: null
                }
            }else {
                if(user.username === "garyhu" && user.password === "123456") {
                    let token = jwt.sign({
                        username: user.username
                    },config.secret,{
                        expiresIn: '7d',    // 有效期为7天（以秒表示或描述时间跨度zeit / ms的字符串。如60，"2 days"，"10h"，"7d"，含义是：过期时间）
                    });
                    let userStr = JSON.stringify(user);
                    await redis.set("access_token",token);
                    await redis.set("user",userStr)

                    ctx.response.status = 200;
                    ctx.body = {
                        code: 200,
                        msg: "登录成功",
                        data: {
                            access_token: token
                        }
                    }
                }else {
                    ctx.response.status = 413;
                    ctx.body = {
                        code: 413,
                        msg: "用户名或密码错误",
                        data: null
                    }
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: "缺少参数",
                data: null
            }
        }
    }

    /**
     * 获取个人信息
     */
    static async prefile(ctx) {
        try{
            let token = await redis.get("access_token");
            let payload = await verify(token,config.secret)
            let userStr = await redis.get("user");

            let user = JSON.parse(userStr)

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "success",
                data: user
            }
        }catch(err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: "查询失败",
                data: null
            }
        }
    }

    /**
     * 生成验证码图片
     * @param {*} ctx 
     */
    static async generateCode(ctx) {
        // svgCaptcha.createMathExpr(options) options与下面一样 ：： 生成一个算术式和计算结果
        var captcha = svgCaptcha.create({    //这种生成的是随机数验证码
            size: 4,    //验证码长度
            fontSize: 50,   //字体大小
            width: 100,
            height: 40,
            ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
            noise: 2, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#eee' // 验证码图片背景颜色
        });
        console.log(captcha.text);
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
    }

    /**
     * 生成一个算术式和计算结果的验证码
     */
    static async obtainCode(ctx) {
        // svgCaptcha.createMathExpr(options) options与下面一样 ：： 生成一个算术式和计算结果
        var captcha = svgCaptcha.createMathExpr({    //这种生成的是随机数验证码
            size: 4,    //验证码长度
            fontSize: 50,   //字体大小
            width: 100,
            height: 40,
            ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
            noise: 2, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#eee' // 验证码图片背景颜色
        });
        console.log(JSON.stringify(captcha,null,4));
        // 其中captcha中text是计算结果，data是图片
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
    }
}

module.exports = UserController;