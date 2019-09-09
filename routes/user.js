const Router = require('koa-router');
const UserDataController = require("../controllers/user_data")

const router = new Router({
    prefix: '/api/user'
})

router.post("/create",UserDataController.create);

router.get("/query",UserDataController.query)

router.get("/getUser",UserDataController.getUserById)

router.put("/update",UserDataController.update)

router.delete("/delete",UserDataController.delete)

module.exports = router;