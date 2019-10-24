// 访问外部接口
const httpService = require('../service/httpService');

class HttpServiceController {

    static async getUser(ctx) {
        console.log("CONTROLLER >> ","开始请求");
        let options = {
            host: 'localhost',
            port: '7002',
            path: '/show',
            method: 'GET',
            headers:{
                "Content-Type": 'application/json',
            }    
        }
        let res = await httpService.get(options);
        console.log("CONTROLLER >> ",res);

        ctx.status = 200;
        ctx.body = {
            code: 200,
            msg: 'msg',
            data: res
        }
    }
}

module.exports = HttpServiceController;