const cheerio = require("cheerio");
const request = require("request-promise");
const Article = require("../models/news.model");
const slugify = require("slugify");

async function crawlerNewsContent(url) {
  let article_content = "";
  await request(`${url}`, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      article_content = $(".cate-24h-foot-arti-deta-content-main").html();
    } else {
      console.log(error);
    }
  });
  return article_content;
}

async function crawlerNews() {
  let data = [];
  const list = [];

  await request(
    `https://www.24h.com.vn/the-thao-c101.html`,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $(".cate-24h-foot-home-latest-list__box").each(async (index, el) => {
          const article_title = $(el)
            .find(".cate-24h-foot-home-latest-list__name a")
            .text();

          const article_excerpt = $(el)
            .find(".cate-24h-foot-home-latest-list__sum")
            .text();
          const href = $(el)
            .find(".cate-24h-foot-home-latest-list__name a")
            .attr("href");
          const article_thumbnail = $(el)
            .find(".cate-24h-foot-home-latest-list__ava.pos-rel a img")
            .attr("src");
          console.log(article_thumbnail);
          const article_time = new Date();
          const article_source_link = `${href}`;
          console.log(article_source_link);
          list.push(crawlerNewsContent(href));
          data.push({
            article_title,
            article_slug: article_source_link.split("/")[4].split(".")[0],
            tags: [
              {
                _id: "618c7a2a7c2af78d200cdea0",
                name: "Bóng đá",
                slug: "bong-da",
                createdAt: "2021-11-11T02:04:26.929Z",
                updatedAt: "2021-11-11T02:04:26.929Z",
                __v: 0,
              },
            ],
            article_excerpt,
            article_thumbnail,
            article_time,
            author: {
              name: "Người đưa tin ",
              slug: "nguoi-dua-tin",
            },
            article_source: {
              source_name: "24h",
              source_slug: "24h",
            },
            article_source_link,
          });
        });
      } else {
        console.log(error);
      }
    }
  );
  await Promise.all(list).then(async (res) => {
    for (let i = 0; i < res.length; i++) {
      const newObject = {
        ...data[i],
      };
      newObject.article_content = res[i];
      data[i] = newObject;
      const article_source_link = data[i].article_source_link;
      const article = await Article.find({
        article_source_link,
      });
      if (!article.length) {
        // await Article.create(newObject);
        console.log("run");
      }
    }
  });
  return data;
}

module.exports = crawlerNews;
