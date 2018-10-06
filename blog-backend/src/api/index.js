const Router = require("koa-router");

const api = new Router();

const post = require("./post");
const auth = require("./auth");
const s3 = require("./s3");
const category = require("./category");

api.use("/post", post.routes());
api.use("/auth", auth.routes());
api.use("/s3", s3.routes());
api.use("/category", category.routes());

module.exports = api;
