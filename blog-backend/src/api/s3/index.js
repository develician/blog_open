const Router = require("koa-router");
const koaBody = require("koa-body");

const s3Ctrl = require("./s3.ctrl");

const s3 = new Router();

s3.post(
  "/images",
  s3Ctrl.checkLogin,
  koaBody({ multipart: true }),
  s3Ctrl.uploadImages
);

s3.post(
  "/markdownImages",
  koaBody({ multipart: true }),
  s3Ctrl.uploadMarkdownImages
);

module.exports = s3;
