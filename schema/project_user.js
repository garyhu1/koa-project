const Sequelize = require("../config/db").sequelize;

const Project = Sequelize.import("./project")
const User = Sequelize.import("./user");

// 自动创建表
Project.sync({force: false});
User.sync({force: false});

module.exports = {
    Project,
    User
}