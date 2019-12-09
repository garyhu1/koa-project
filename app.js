const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors');
const koaBody = require('koa-body');
const jwt = require("jsonwebtoken");
const jwtKoa = require("koa-jwt");
const util = require("util");
const redis = require("./config/redis");
const session = require("koa-session");
const sessConfig = require("./session");

const verify = util.promisify(jwt.verify)

// 配置文件
const config = require("./config");

// 路由文件
const index = require('./routes/index')
const users = require('./routes/users')
const pets = require("./routes/pet")
const home = require("./routes/home")
const file = require("./routes/file")
const user = require("./routes/user")
const project = require("./routes/project")
const httpSe = require("./routes/http_user")

// error handler
onerror(app)

// 配置session
app.keys = ["some secret hurr"] /*cookie的签名*/
app.use(session(sessConfig,app));

// middlewares
// 使用文件上传中间件
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}))
  // 该中间件要放到koa-body中间件之后，不然会导致post请求失败
  .use(bodyparser({
    enableTypes:['json', 'form', 'text']
  }))
  .use(json())
  .use(logger())
  // 加载静态资源文件中间件
  .use(require('koa-static')(__dirname + '/public'))
  // 解决跨域问题
  .use(cors())
  // 使用视图中间件
  .use(views(__dirname + '/views', {
    extension: 'ejs'
  }))
  // 自定义
  .use(async (ctx,next) => {
    // 如果是登录接口不需验证
    let path = ctx.path;
    console.log(path)
    let token = await redis.get("access_token");
    console.log(token)
    if(path !== "/users/login"){
      if(token){// 为了防止验证token，此处把每个请求都设置下权限（正式环境需要用户设置）
        ctx.header.authorization = "Bearer "+token;
        await next();
      }else {
        await ctx.redirect("/users/login");
      }
    }else {
      await next();
    }
  })
  .use(async (ctx,next) => {
    var token = ctx.headers.authorization;
    if(token === undefined){
      await next();
    }else {
      try{
        let data = await verify(token.split(' ')[1],config.secret);
        // console.log(JSON.stringify(data,null,4))

        //这一步是为了把解析出来的用户信息存入全局state中，这样在其他任一中间价都可以获取到state中的值
        ctx.state = {
          data:data
        };
        await next();
      }catch (err){
        console.log(JSON.stringify("err == ",err,null,4))
        // 过期，验证失败重新登录
        await redis.del("access_token")
        await ctx.redirect("/users/login");
      }
    }
  })
  // 使用jwt验证
  .use(jwtKoa({secret: config.secret}).unless({
    path: [
      /^\/users\/login/
    ]       // 数组中的路径不需要通过jwt验证
  }))

  // logger
  .use(async (ctx, next) => {
    // 简单统计下每次请求的时间
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  // routes
  .use(index.routes(), index.allowedMethods())
  .use(users.routes(), users.allowedMethods())
  .use(pets.routes(), pets.allowedMethods())
  .use(home.routes(),home.allowedMethods())
  .use(file.routes(),file.allowedMethods())
  .use(user.routes(),user.allowedMethods())
  .use(project.routes(),project.allowedMethods())
  .use(httpSe.routes(),httpSe.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
