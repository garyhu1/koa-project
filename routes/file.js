const Router = require("koa-router");
const router = new Router({
    prefix: "/file"
})

const UploadFile = require("../controllers/uploadFile");

// 上传单个文件
router.post("/singleFile",UploadFile.uploadSingleFile);

// 上传多个文件
router.post("/multFile",UploadFile.uploadMulFile)

module.exports = router;