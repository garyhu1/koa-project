module.exports = (sequelize,DataTypes) => {
    return sequelize.define("user",{
        uid: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            field: 'uid'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name'
        },
        age: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: 'age'
        },
        gender: {
            type: DataTypes.ENUM("male","female"),
            allowNull: false,
            field: 'gender'
        },
        pid: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'pid',
            references: {
                model: "project",
                key: "pid"
            }
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