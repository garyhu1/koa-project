const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors');
const koaBody = require('koa-body');

const index = require('./routes/index')
const users = require('./routes/users')
const pets = require("./routes/pet")
const home = require("./routes/home")
const file = require("./routes/file")

// error handler
onerror(app)

// middlewares
// 使用文件上传中间件
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}))
// 该中间件要放到koa-body中间件之后，不然会导致post请求失败
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// 加载静态资源文件中间件
app.use(require('koa-static')(__dirname + '/public'))
// 解决跨域问题
app.use(cors());
// 使用视图中间件
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  // 简单统计下每次请求的时间
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(pets.routes(), pets.allowedMethods())
app.use(home.routes(),home.allowedMethods())
app.use(file.routes(),file.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
