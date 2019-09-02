// 引入mysql配置文件
const db = require('../config/db');
const Seq = require('sequelize');
const Op = Seq.Op;

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Pet = Sequelize.import("../schema/pet");
// 自动创建表
Pet.sync({force: false})

class PetModel {

    /**
     * 创建Pet模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createPet(data) {
        return await Pet.create({
            id: data.id,
            name: data.name,
            gender: data.gender,
            birth: data.birth,
            version: data.version,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });
    }

    /**
     * 查询Pet的详情
     * @param id pet ID
     * @returns {Promise<Model>}
     */
    static async getPetDetail(id) {
        return await Pet.findOne({
            where: {
                id
            }
        });
    }

    /**
     * 查询所有数据(分页查询)
     */
    static async getAllPet(data) {
        if((data.offset && data.limit) || (data.offset === 0 && data.limit) ){
            let offset = Number(data.offset);
            let limit = Number(data.limit);
            return await Pet.findAll({
                offset,
                limit
            });
        }else {
            return await Pet.findAll();
        }
    }

    /**
     * 排序查询(根据name)
     */
    static async queryByOrder() {
        return await Pet.findAll({
            order: [
                ['name','DESC']
            ],
            attributes: ['name','gender','birth']
        });
    }

    /**
     * 条件查询
     */
    static async queryBycon() {
        return await Pet.findAll({
            where: {
                id: {
                    [Op.like]: '%g-1%'
                }
            }
        });
    }

    /**
     * 修改数据(首先查找数据库，没有就新建，有就更新)
     */
    static async update(data) {
        return await Pet.upsert({
            id: data.id,
            name: data.name,
            gender: data.gender,
            birth: data.birth,
            version: data.version
        });
    }

    /**
     * 更新数据（根据id查询后更新）
     */
    static async updateById(data) {
        let pet = await Pet.findById(data.id);
        if(pet){
            pet.update({
                id: data.id,
                name: data.name,
                gender: data.gender,
                birth: data.birth,
                version: data.version
            });
        }else {
            return []
        }
    }

    /**
     * 删除数据(一)
     */
    static async delete(data) {
        return await Pet.destroy({
            where: {
                id: data.id
            }
        });
    }

    /**
     * 删除数据(二)
     */
    static async deleteById(data) {
        let pet = await Pet.findOne({
            where: {
                id: data.id
            }
        })

        if(pet){
            return await pet.destroy();
        }else {
            return {};
        }
    }
}

module.exports = PetModel
