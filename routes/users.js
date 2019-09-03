const router = require('koa-router')()
const UserController = require("../controllers/user")

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post("/login",UserController.login);

router.get("/prefile",UserController.prefile)

module.exports = router
