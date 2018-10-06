const Category = require("models/category");
const CategoryList = require("models/categoryList");
const Joi = require("joi");

exports.checkLogin = async (ctx, next) => {
  if (!ctx.session.logged) {
    ctx.status = 401;
    return null;
  }

  return next();
};

exports.reorder = async ctx => {
  const schema = Joi.object().keys({
    sourceId: Joi.string().required(),
    destId: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { sourceId, destId } = ctx.request.body;

  try {
    let categories = await Category.find({}).exec();
    if (!categories) {
      ctx.status = 404;
      return;
    }

    let sourceIndex = categories
      .map(category => category._id.toString())
      .indexOf(sourceId);

    let destIndex = categories
      .map(category => category._id.toString())
      .indexOf(destId);

    let source = categories.splice(sourceIndex, 1);
    categories.splice(destIndex, 0, source[0]);

    let newCategories = await categories.map((category, i) => {
      // console.log(category);
      Category.findByIdAndRemove(category._id).exec();
      let newCategory = new Category({
        category: category.category
      });
      newCategory.save();
      return newCategory;
    });

    ctx.body = newCategories;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.list = async ctx => {
  try {
    const category = await Category.find({}).exec();

    // const categories = await CategoryList.find({}).exec();

    ctx.body = category;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.create = async ctx => {
  const schema = Joi.object().keys({
    category: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { category } = ctx.request.body;

  try {
    const isExisting = await Category.findOne({ category }).exec();

    if (isExisting) {
      ctx.status = 409;
      ctx.body = {
        error: "existing category"
      };
      return;
    }

    const categorySchema = new Category({
      category
    });
    await categorySchema.save();

    ctx.body = categorySchema;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.remove = async ctx => {
  const { id } = ctx.params;

  try {
    await Category.findByIdAndRemove(id).exec();

    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
