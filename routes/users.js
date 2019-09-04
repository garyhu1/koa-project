const router = require('koa-router')()
const UserController = require("../controllers/user")

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// 注册页面
router.get("/register",async (ctx,next) => {
  await ctx.render("register");
})

// 注册接口
router.post("/register",UserController.register)

// 登录页面
router.get("/login",async (ctx,next) => {
  await ctx.render("login");
})

// 登录接口
router.post("/login",UserController.login);

// 用户邮箱登录
router.get("/verify",UserController.verifyMail)

// 获取个人信息
router.get("/prefile",UserController.prefile);

// 获取验证码
router.get("/code",UserController.generateCode);

// 获取验证码
router.get("/code2",UserController.obtainCode);

module.exports = router
