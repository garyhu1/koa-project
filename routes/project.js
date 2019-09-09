const Router = require("koa-router");
const ProjectController = require("../controllers/project")

const router = new Router({
    prefix: '/api/project'
})

router.post("/add",ProjectController.add)

router.get("/list",ProjectController.query)

router.put("/update",ProjectController.update)

router.delete("/delete",ProjectController.delete)

module.exports = router;