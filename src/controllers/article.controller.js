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
      const total = await Article.find({}).count();

      if (skip >= total) {
        return res.status(409).json({
          status: "error",
          message: "The page does not exist",
        });
      }
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
  getListCursor: async (req, res) => {
    let { limit, next_cursor } = req.query;
    limit = Pagination.limit(+limit);
    console.log({
      limit,
      next_cursor,
    });
    try {
      let data;
      if (!next_cursor) {
        data = await Article.find(
          {},
          {
            article_content: 0,
            article_source_link: 0,
            article_time: 0,
            updatedAt: 0,
            __v: 0,
          }
        )
          .sort({
            createdAt: -1,
          })
          .limit(limit + 1);
      } else {
        console.log(next_cursor);

        data = await Article.find(
          { _id: { $gte: next_cursor } },
          {
            article_content: 0,
            article_source_link: 0,
            article_time: 0,
            updatedAt: 0,
            __v: 0,
          }
        )
          .sort({
            createdAt: -1,
          })
          .limit(limit + 1);
      }

      const next = data[limit]._id;
      return res.status(200).json({
        data,
        next,
      });
    } catch (error) {
      return res.status(503).json({
        message: error,
      });
    }
  },
};

module.exports = ArticleController;
