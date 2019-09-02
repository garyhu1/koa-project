const moment = require("moment");
module.exports = (sequelize,DataTypes) => {
    return sequelize.define('pet',{
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            // autoIncrement: true
        },
        //文章标题
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name'
        },
        //作者
        gender:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'gender'
        },
        //内容
        birth:{
            type: DataTypes.STRING,
            allowNull: false,
            field:'birth'
        },
        //文章分类
        version:{
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'version'
        },
        // 创建时间
        createdAt:{
            type: DataTypes.DATE,
            allowNull: true,
            field: 'createdAt'
        },
        // 更新时间
        updatedAt:{
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updatedAt'
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    });
}