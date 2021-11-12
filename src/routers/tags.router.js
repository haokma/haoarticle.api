const express = require("express");
const router = express.Router();

const TagController = require("../controllers/tags.controller");
router.get("/", TagController.getList);
router.post("/", TagController.create);
module.exports = router;
