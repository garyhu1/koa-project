const redis = require("../config/redis");

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
                    let token = user.username + "::" + user.password;
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
}

module.exports = UserController;