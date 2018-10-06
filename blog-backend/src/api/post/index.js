const Router = require("koa-router");
const postCtrl = require("./post.ctrl");

const posts = new Router();

posts.post("/", postCtrl.checkLogin, postCtrl.create);

posts.get("/", postCtrl.list);
posts.get("/:id", postCtrl.checkObjectId, postCtrl.read);
posts.get("/list/temporary", postCtrl.checkLogin, postCtrl.getTemporary);

posts.patch(
  "/:id",
  postCtrl.checkLogin,
  postCtrl.checkObjectId,
  postCtrl.update
);

posts.delete(
  "/:id",
  postCtrl.checkLogin,
  postCtrl.checkObjectId,
  postCtrl.remove
);

module.exports = posts;
