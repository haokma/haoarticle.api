const express = require("express");
const categoryRouter = require("./tags.router");
const articleRouter = require("./article.router");

const apiRouter = express();

apiRouter.use("/tag", categoryRouter);
apiRouter.use("/article", articleRouter);

module.exports = apiRouter;
