const UserModel = require("../modules/user_model");

class UserDataController {

    /**
     * 创建
     */
    static async create(ctx) {
        let data = ctx.request.body;
        if(data) {
            let result = await UserModel.addUser(data);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: "success",
                data: result
            }
        }else {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: "参数不全",
                data: null
            }
        }
    }

    /**
     * 查询
     */
    static async query(ctx) {
        let result = await UserModel.listAll();

        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "success",
            data: result
        }
    }

    /**
     * 通过id查询
     * @param {*} ctx 
     */
    static async getUserById(ctx){}

    /**
     * 更新
     */
    static async update(ctx) {}

    /**
     * 删除
     */
    static async delete(ctx) {}
}

module.exports = UserDataController;