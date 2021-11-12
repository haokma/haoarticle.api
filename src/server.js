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

cron.schedule(
  "1,5,10,13,15,20,25,30,32,35,40,45,50,55,59 * * * *",
  function () {
    console.log("run 1");
    crawlerData(`http://ttvn.toquoc.vn/doi-song.htm`);
  }
);

cron.schedule(
  "1,5,10,13,15,20,25,30,32,35,40,45,50,55,59 * * * *",
  function () {
    console.log("run 2");
    crawlerData(`http://ttvn.toquoc.vn/giai-tri.htm`);
  }
);
cron.schedule(
  "1,5,10,13,15,20,25,30,32,35,40,45,50,55,59 * * * *",
  function () {
    console.log("run 3");
    crawlerData(`http://ttvn.toquoc.vn/du-lich.htm`);
  }
);
cron.schedule(
  "1,5,10,13,15,20,25,30,32,35,40,45,50,55,59 * * * *",
  function () {
    console.log("run 3");
    crawlerData(`http://ttvn.toquoc.vn/kinh-doanh.htm`);
  }
);
cron.schedule(
  "1,5,10,13,15,20,25,30,32,35,40,45,50,55,59 * * * *",
  function () {
    console.log("run 3");
    crawlerData(`http://ttvn.toquoc.vn/khoa-hoc.htm`);
  }
);

const app = express();
const port = 5000;

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use("/api", router);

connectDatabase();
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
