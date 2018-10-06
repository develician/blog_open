const mongoose = require("mongoose");

const { Schema } = mongoose;

const categoryList = new Schema({
  categories: {
    type: [
      {
        category: String
      }
    ],
    default: []
  }
});

module.exports = mongoose.model("CategoryList", categoryList);
