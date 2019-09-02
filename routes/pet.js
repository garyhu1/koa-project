const Router = require("koa-router");

const PetController = require("../controllers/pet");

const router = new Router({
    prefix: '/api/v1'
});

// 创建pet
router.post("/pet/create",PetController.create);

// 获取pet详情
router.get("/pet/one/:id",PetController.getPet);

// 获取满足条件的pet数据
router.get("/pet/list",PetController.getAll);

// 排序查询
router.get("/pet/queryAll",PetController.queryAll)

// 模糊查询
router.get("/pet/queryLike",PetController.queryLike)

// 数据更新
router.put("/pet/update",PetController.updatePet)

// 数据更新
router.put("/pet/updateById",PetController.updatePetById);

// 数据删除
router.delete("/pet/delete",PetController.deletePet)

// 数据删除
router.delete("/pet/deleteById",PetController.deletePetById)

module.exports = router;