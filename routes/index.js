const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get("/home",async (ctx,next) => {
  await ctx.render("index")
});

router.get("/stick",async (ctx,next) => {
  await ctx.render("index")
})

router.get("/user",async (ctx,next) => {
  await ctx.render("index")
})

router.get("/route_scroll",async (ctx,next) => {
  await ctx.render("index")
})

router.get("/custom",async (ctx,next) => {
  await ctx.render("index")
})

router.get("/about",async (ctx,next) => {
  await ctx.render("index")
})

router.get("/map",async (ctx,next) => {
  await ctx.render("index")
})

module.exports = router
