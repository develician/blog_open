const Post = require("models/post");
const Category = require("models/category");
const Joi = require("joi");
const removeMd = require("remove-markdown");
const fs = require("fs");
const path = require("path");
const sitemapDir = path.join(__dirname, "../../uploads/");
const {
  removeSiteMap,
  updateSiteMap,
  createSiteMap
} = require("../../lib/common");

const { ObjectId } = require("mongoose").Types;

exports.checkObjectId = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  return next();
};

exports.checkLogin = async (ctx, next) => {
  if (!ctx.session.logged) {
    ctx.status = 401;
    return null;
  }

  return next();
};

exports.create = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(),
    isTemporary: Joi.boolean().required(),
    thumbnail: Joi.string(),
    categoryId: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    title,
    body,
    tags,
    isTemporary,
    thumbnail,
    categoryId
  } = ctx.request.body;

  try {
    let existingCategory = await Category.findById(categoryId).exec();
    if (!existingCategory) {
      ctx.status = 404;
      return;
    }

    let categoryname = existingCategory.category;

    const post = new Post({
      title,
      body,
      tags,
      isTemporary,
      thumbnail,
      category: categoryname
    });

    await post.save();

    const siteMapString = await fs.readFileSync(
      sitemapDir + "/sitemap.xml",
      "utf8"
    );

    await fs.writeFileSync(
      sitemapDir + "/sitemap.xml",
      createSiteMap(siteMapString, post._id)
    );

    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    if (post.isTemporary && !ctx.session.logged) {
      ctx.status = 401;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.list = async ctx => {
  const page = parseInt(ctx.query.page || 1, 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, category } = ctx.query;

  try {
    let query = null;

    if (tag) {
      query = tag
        ? {
            tags: tag,
            isTemporary: false
          }
        : { isTemporary: false };
    } else if (category) {
      query = category
        ? {
            category,
            isTemporary: false
          }
        : { isTemporary: false };
    } else {
      query = { isTemporary: false };
    }

    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.count(query).exec();
    const limitByLength = post => ({
      ...post,
      body:
        post.body.length < 200
          ? removeMd(post.body)
          : removeMd(`${post.body.slice(0, 200)}...`)
    });

    ctx.body = posts.map(limitByLength);
    ctx.set("Last-Page", Math.ceil(postCount / 10));
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.update = async ctx => {
  const schema = Joi.object().keys({
    isTemporary: Joi.bool().required(),
    title: Joi.string().required(),
    thumbnail: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().required(),
    categoryId: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { id } = ctx.params;
  const {
    title,
    body,
    tags,
    isTemporary,
    thumbnail,
    categoryId
  } = ctx.request.body;

  try {
    let existingCategory = await Category.findById(categoryId).exec();
    if (!existingCategory) {
      ctx.status = 404;
      return;
    }

    const siteMapString = await fs.readFileSync(
      sitemapDir + "/sitemap.xml",
      "utf8"
    );

    await fs.writeFileSync(
      sitemapDir + "./sitemap.xml",
      updateSiteMap(siteMapString, id)
    );

    const categoryname = existingCategory.category;

    const post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        body,
        tags,
        isTemporary,
        thumbnail,
        category: categoryname
      },
      {
        new: true
      }
    ).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.remove = async ctx => {
  const { id } = ctx.params;

  try {
    let post = await Post.findById(id);
    const postId = post._id;
    const siteMapString = await fs.readFileSync(
      sitemapDir + "/sitemap.xml",
      "utf8"
    );

    await fs.writeFileSync(
      sitemapDir + "./sitemap.xml",
      removeSiteMap(siteMapString, postId)
    );

    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.getTemporary = async ctx => {
  const page = parseInt(ctx.query.page || 1, 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  let temporaryPostings = null;

  const query = {
    isTemporary: true
  };

  try {
    temporaryPostings = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.count(query).exec();
    const limitByLength = post => ({
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
    });

    ctx.body = temporaryPostings.map(limitByLength);
    ctx.set("Last-Page", Math.ceil(postCount / 10));
  } catch (e) {
    ctx.throw(e, 500);
  }
};
