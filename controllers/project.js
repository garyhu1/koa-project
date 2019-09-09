const ProjectModel = require("../modules/project");

class ProjectController {
    /**
     * 新建
     */
    static async add(ctx) {
        let data = ctx.request.body;
        if(data){
            let result = await ProjectModel.addPorject(data);

            ctx.response.status = 200;
            ctx.body={
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
        let result = await ProjectModel.listPorjects();

        ctx.response.status = 200;
        ctx.body={
            code: 200,
            msg: "success",
            data: result
        }
    }
    /**
     * 更新
     */
    static async update(ctx) {}
    /**
     * 删除
     */
    static async delete(ctx) {}
}

module.exports = ProjectController;