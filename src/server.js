const express = require("express");
const connectDatabase = require("./configs/db.config");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cron = require("node-cron");
const router = require("./routers/index");
const crawlerSport = require("./utils/crawlerSport");
const crawlerNews = require("./utils/crawler");
const crawlerData = require("./utils");

// cron.schedule("1,5,10,15,20,25,30,35,40,45,50,55,59 * * * *", function () {
//   console.log("run sport");
//   crawlerSport();
// });
// cron.schedule("1,5,10,15,20,25,30,35,40,45,50,55,59 * * * *", function () {
//   console.log("run");
//   crawlerNews();
// });

cron.schedule("59 * * * *", function () {
  console.log("run 1");
  crawlerData(`http://ttvn.toquoc.vn/doi-song.htm`);
});
cron.schedule("59 * * * *", function () {
  console.log("run 2");
  crawlerData(`http://ttvn.toquoc.vn/giai-tri.htm`);
});
cron.schedule("59 * * * *", function () {
  console.log("run 3");
  crawlerData(`http://ttvn.toquoc.vn/du-lich.htm`);
});
cron.schedule("59 * * * *", function () {
  console.log("run 3");
  crawlerData(`http://ttvn.toquoc.vn/kinh-doanh.htm`);
});
cron.schedule("59 * * * *", function () {
  console.log("run 3");
  crawlerData(`http://ttvn.toquoc.vn/khoa-hoc.htm`);
});

const app = express();
const port = process.env.PORT || 5000;
connectDatabase();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
