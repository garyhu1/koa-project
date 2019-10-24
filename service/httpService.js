// 用于访问外部接口
const http = require('http')

module.exports = {
    // GET 请求
    get(options) {
        return new Promise((resolve,reject) => {

            let body = '';

            let req = http.request(options,(res) => {
                res.on('data',(data) => {
                    body += data;
                }).on("end", () => {
                    console.log("HTTP DATA >>",body)
                    resolve(JSON.parse(body));
                })
            });

            req.on("error",(e) => {
                console.log("HTTP ERROR >>",e)
                reject(e)
            });

            req.end();
        });
    },

    // POST请求
    post(options,data) {
        // let options = {
        //     host: 'localhost',
        //     port: '7002',
        //     path: '/show',
        //     method: 'GET',
        //     headers:{
        //         "Content-Type": 'application/json',
        //         "Content-Length": data.length
        //     }    
        // }

        return new Promise((resolve,reject) => {
            let body = '';
            let req = http.request(options,(res) => {
                res.on('data',(chuck) => {
                    body += chuck;
                }).on('end', () => {
                    resolve(JSON.parse(body))
                })
            });

            req.on('error',(e) => {
                reject(e)
            });

            req.write(data);
            req.end();
        });
        
    }
}