const mongoose = require("mongoose");

const { Schema } = mongoose;

const tagSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "Vui lòng nhập tên danh mục"],
      min: 3,
      max: 128,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("tag", tagSchema, "tag");

module.exports = Tag;
