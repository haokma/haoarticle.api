const Tag = require("../models/tags.model");
const slugify = require("slugify");
const TagController = {
  getList: async (req, res) => {
    const tags = await Tag.find({});

    return res.status(200).json({
      tags,
    });
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const slug = slugify(name, {
        locale: "vi",
      });

      const tag = await Tag.create({
        name,
        slug: slug.toLowerCase(),
      });
      return res.status(200).json({
        tag,
      });
    } catch (error) {
      return res.status(503).json({
        message: error,
      });
    }
  },
};

module.exports = TagController;
