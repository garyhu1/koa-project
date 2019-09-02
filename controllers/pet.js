const PetModel = require("../modules/pet");

class PetController {
    /**
     * 创建Pet
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        let data = ctx.request.body;
        console.log(JSON.stringify(data,null,4))
        if(data.id && data.name && data.birth && data.version){
            try {

                // 创建pet
                const result = await PetModel.createPet(data);
                // 利用刚创建的数据id查询并响应给客户端
                const res = await PetModel.getPetDetail(result.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: "successfull",
                    data: res
                }
            }catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: "数据创建失败",
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: "缺少参数"
            }
        }
    }

    /**
     * 获取Pet详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getPet(ctx) {
        let id = ctx.params.id;
        if(id) {
            try{
                let result = await PetModel.getPetDetail(id);
                console.log(result);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: "successfull",
                    data: result
                }
            } catch(err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: "查询失败",
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: "缺少参数"
            }
        }
    }

    /**
     * 获取所有满足条件的数据
     */
    static async getAll(ctx) {
        let querys = ctx.query;
        console.log(JSON.stringify(querys,null,4))
        try{
            let result = await PetModel.getAllPet(querys);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "success",
                data: result
            }
        }catch (err){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: "数据查询失败",
                data: err
            }
        }
    } 

    /**
     * 根据name排序，查询所有数据
     */
    static async queryAll(ctx) {
        try{
            let result = await PetModel.queryByOrder();

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "success",
                data: result
            }
        }catch (err){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: "查询失败",
                data: err
            }
        }
    }

    /**
     * 模糊查询
     */
    static async queryLike(ctx) {
        try{
            let result = await PetModel.queryBycon();

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "success",
                data: result
            }
        }catch (err){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: "查询失败",
                data: err
            }
        }
    }

    /**
     * 更新数据库（方法一）
     */
    static async updatePet(ctx) {
        let data = ctx.request.body;
        if(data){
            try{
                let result = await PetModel.update(data);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: "success",
                    data: result
                }
            }catch(err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: "查询失败",
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: "缺少参数",
                data: err
            }
        }
    }

    /**
     * 更新数据库（方法二）
     */
    static async updatePetById(ctx) {
        let data = ctx.request.body;
        if(data){
            try{
                let result = await PetModel.updateById(data);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: "success",
                    data: result
                }
            }catch(err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: "查询失败",
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: "缺少参数",
                data: err
            }
        }
    }

    /**
     * 删除数据(一)
     */
    static async deletePet(ctx) {
        let data = ctx.request.body;
        if(data){
            try{
                let result = await PetModel.delete(data);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: "success",
                    data: result
                }
            }catch(err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: "查询失败",
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: "缺少参数",
                data: err
            }
        }
    }

    /**
     * 删除数据(二)
     */
    static async deletePetById(ctx) {
        let data = ctx.request.body;
        if(data){
            try{
                let result = await PetModel.deleteById(data);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: "success",
                    data: result
                }
            }catch(err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: "查询失败",
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: "缺少参数",
                data: err
            }
        }
    }
}


module.exports = PetController;
