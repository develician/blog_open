const mongoose = require("mongoose");

const { Schema } = mongoose;

const category = new Schema({
  category: String,
  subCategory: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model("Category", category);
