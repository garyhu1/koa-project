const Sequelize = require("../config/db").sequelize;

const User = Sequelize.import("../schema/user");

// 自动创建表
User.sync({force: false})

module.exports = User;
