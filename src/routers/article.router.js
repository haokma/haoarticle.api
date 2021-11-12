const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/article.controller");
router.get("/get", ArticleController.getListCursor);
router.get("/", ArticleController.getList);
router.get("/:slug", ArticleController.getBySlug);

module.exports = router;
