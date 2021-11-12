const mongoose = require("mongoose");

const { Schema } = mongoose;

const articleSchema = Schema(
  {
    article_title: {
      type: String,
      require: true,
    },
    article_slug: {
      type: String,
      require: true,
      unique: true,
    },
    article_thumbnail: {
      type: String,
      require: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    author: { type: Object, require: true },
    article_content: {
      type: String,
      require: true,
    },
    article_excerpt: {
      type: String,
      require: true,
    },
    article_time: {
      type: String,
      require: true,
    },
    article_views: {
      type: Number,
      default: 0,
    },
    article_source: {
      type: Object,
      require: true,
    },
    article_tags: {
      type: Array,
      default: [],
    },
    article_source_link: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("article", articleSchema, "article");

module.exports = Article;
