const sequelize = require("../config/db").sequelize;
const Op = require('sequelize').Op;

const { Project,User } = require("../schema/project_user")

class ProjectModel {
    /**
     * 新建
     */
    static async addPorject(data) {
        if(data){
            return await Project.create({
                pid: data.pid,
                name: data.name
            })
        }
    }

    /**
     * 查询
     */
    static async listPorjects() {
        return await Project.findAll({
            include: [
                {
                    association: Project.hasMany(User,{foreignKey: 'pid'})
                }
            ]
        })
    }

    /**
     * 更新
     */
    static async updatePorject(data) {}

    /**
     * 删除
     */
    static async deletePorject(data) {}
}

module.exports = ProjectModel;