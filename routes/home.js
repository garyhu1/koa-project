const Router = require("koa-router");

const router = new Router({
    prefix: "/home"
});

router.get("/",async (ctx,next) => {
    await ctx.render("index_1",{
        title: 'Hello Koa 2!'
    });
})

router.get("/session",async (ctx,next) => {
    let num = ctx.session.num || 0;

    ctx.session.num = ++num;

    ctx.status = 200;
    ctx.body = {
        code: 200,
        result: {
            num
        }
    }
});

module.exports = router;