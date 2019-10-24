const Router = require('koa-router');

const HttpServiceController = require("../controllers/http_req");

const router = new Router({
    prefix: '/http'
});

router.get("/user",HttpServiceController.getUser)

module.exports = router;