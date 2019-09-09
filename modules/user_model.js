const sequelize = require("sequelize");
const {User,Project} = require("../schema/project_user");

class UserModel {

    /**
     * 添加数据
     */
    static async addUser(data) {
        return await User.create({
            uid: data.uid,
            name: data.name,
            age: data.age,
            gender: data.gender,
            pid: data.pid
        })
    }

    /**
     * 查询所有数据
     */
    static async listAll() {
        return await User.findAll({
            include: [{
                association: User.belongsTo(Project,{foreignKey: 'pid'})
            }]
        })
    }

    /**
     * 更新数据
     */
    static async updateUser(){}

    /**
     * 删除用户
     */
    static async deleteUser(data) {}
}

module.exports = UserModel;