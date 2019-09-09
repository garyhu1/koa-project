module.exports = (sequelize,DataTypes) => {
    return sequelize.define("project",{
        pid: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            field: 'pid'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    })
}