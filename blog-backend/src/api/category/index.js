const Router = require("koa-router");
const categoryCtrl = require("./category.ctrl");

const category = new Router();

category.get("/", categoryCtrl.list);
category.post("/", categoryCtrl.checkLogin, categoryCtrl.create);
category.post("/reorder", categoryCtrl.checkLogin, categoryCtrl.reorder);
category.delete("/:id", categoryCtrl.checkLogin, categoryCtrl.remove);

module.exports = category;
