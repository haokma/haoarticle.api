const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/article.controller");
router.get("/getRelate", ArticleController.getRelate);
router.get("/get", ArticleController.getListCursor);
router.put("/:slug", ArticleController.updateViews);
router.get("/", ArticleController.getList);
router.get("/:slug", ArticleController.getBySlug);

module.exports = router;
