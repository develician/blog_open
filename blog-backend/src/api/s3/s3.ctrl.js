const AWS = require("aws-sdk");
const fs = require("fs");
const uuid = require("uuid-random");

const path = require("path");

const s3 = new AWS.S3({
  region: "ap-northeast-3",
  signatureVersion: "v4",
  accessKeyId: "S3_ACCESS_KEY",
  secretAccessKey: "S3_SECRET_ACCESS_KEY"
});

exports.checkLogin = async (ctx, next) => {
  if (!ctx.session.logged) {
    ctx.status = 401;
    return null;
  }

  return next();
};

exports.uploadImages = async ctx => {
  const image = ctx.request.files.image;

  const read = fs.createReadStream(image.path);

  const storedname = `post-images/${uuid()}${path.extname(image.name)}`;

  const response = await s3
    .upload({
      Bucket: "s3.images.killi8n.com",
      Key: storedname,
      Body: read,
      ContentType: image.type
    })
    .promise();

  if (!response || !response.ETag) {
    console.log(response);
    ctx.status = 418; // I AM A TEAPOT
    return;
  }

  ctx.body = {
    storedImagename: storedname
  };
};

exports.uploadMarkdownImages = async ctx => {
  const image = ctx.request.files.image;

  const read = fs.createReadStream(image.path);

  const storedname = `post-images/${uuid()}${path.extname(image.name)}`;

  const response = await s3
    .upload({
      Bucket: "s3.images.killi8n.com",
      Key: storedname,
      Body: read,
      ContentType: image.type
    })
    .promise();

  if (!response || !response.ETag) {
    console.log(response);
    ctx.status = 418; // I AM A TEAPOT
    return;
  }

  ctx.body = {
    storedImagename: storedname
  };
};
