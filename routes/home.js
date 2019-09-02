const Router = require("koa-router");

const router = new Router({
    prefix: "/home"
});

router.get("/",async(ctx,next) => {
    await ctx.render("index_1",{
        title: 'Hello Koa 2!'
    });
})

module.exports = router;