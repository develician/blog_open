const mongoose = require("mongoose");

const { Schema } = mongoose;

const post = new Schema({
  title: String,
  body: String,
  tags: [String],
  thumbnail: {
    type: String,
    default: "post-images/default_thumbnail.png"
  },
  category: {
    type: String,
    default: "etc"
  },
  isTemporary: {
    type: Boolean,
    required: true,
    default: false
  },
  publishedDate: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Post", post);
