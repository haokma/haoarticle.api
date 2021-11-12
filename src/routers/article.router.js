const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/article.controller");
router.get("/", ArticleController.getList);
router.get("/:slug", ArticleController.getBySlug);
module.exports = router;
