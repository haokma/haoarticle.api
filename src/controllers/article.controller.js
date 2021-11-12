const Article = require("../models/news.model");
const Pagination = require("../helpers/pagination");
const ArticleController = {
  getList: async (req, res) => {
    let { page, limit } = req.query;
    let skip, sort;

    page = Pagination.page(+page);
    limit = Pagination.limit(+limit);
    skip = Pagination.skip(+page, +limit);
    sort = {
      createdAt: -1,
    };
    try {
      const data = await Article.find(
        {},
        {
          article_content: 0,
          article_source_link: 0,
          article_time: 0,
          updatedAt: 0,
          __v: 0,
        }
      )
        .sort(sort)
        .skip(skip)
        .limit(limit);
      const total = await Article.find({}).count();
      return res.status(200).json({
        data,
        pagination: Pagination.result(limit, page, total),
      });
    } catch (error) {
      return res.status(503).json({
        message: error,
      });
    }
  },
  getBySlug: async (req, res) => {
    const { slug } = req.params;
    console.log(slug);
    try {
      const article = await Article.findOne({
        article_slug: slug,
      });
      res.status(200).json({ article });
    } catch (error) {
      res.status(503).json({ message: error });
    }
  },
};

module.exports = ArticleController;
