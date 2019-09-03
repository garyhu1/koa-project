const fs = require("fs")
const path = require("path")

class UploadFile {
    // 单文件上传
    static async uploadSingleFile(ctx){

        try{
            // 获取上传文件
            const file = ctx.request.files.file;

            // 创建可读流
            const reader = fs.createReadStream(file.path);
            // 缓存文件路径
            const filePath = path.resolve(__dirname,"../public/upload",`./${file.name}`);
            // 创建可写流
            const writer = fs.createWriteStream(filePath);
            // 通过管道流，完成读写操作
            await reader.pipe(writer);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "上传成功",
                data: []
            }
        }catch(err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: "上传失败",
                data: err
            }
        }
    }

    /**
     * 多文件上传
     */
    static async uploadMulFile(ctx){
        try{
            // 获取上传文件
            const files = ctx.request.files.file;
            console.log(JSON.stringify(ctx.request.files,null,4))
            for(let file of files) {
                // 创建可读流
                let reader = fs.createReadStream(file.path);
                // 文件缓存路径
                let filepath = path.resolve(__dirname,"../public/upload",`./${file.name}`)
                // 创建可写流
                let writer = fs.createWriteStream(filepath);
                // 通过管道流完成读写操作
                await reader.pipe(writer);
            }

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "上传成功",
                data: []
            }

        }catch(err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                msg: "上传失败",
                data: err
            }
        }
    }
}

module.exports = UploadFile;