const cheerio = require("cheerio");
const request = require("request-promise");
const Article = require("../models/news.model");
const slugify = require("slugify");
const Tag = require("../models/tags.model");
async function crawlerNewsContent(url) {
  let article_content = "";
  await request(`http://ttvn.toquoc.vn${url}`, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      article_content = $(".w650").html();
    } else {
      console.log(error);
    }
  });
  return article_content;
}

async function crawlerData(url) {
  let data = [];
  const list = [];
  const tags = [];
  const slug = url.split("/")[3].split(".")[0];
  const article_slug = await Tag.findOne({
    slug,
  });
  tags.push(article_slug);
  await request(`${url}`, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $(".tlitem").each(async (index, el) => {
        const article_title = $(el).find(".knswli-right h3 a").text();
        const article_slug = slugify(article_title, {
          locale: "vi",
        });
        const article_excerpt = $(el).find(".knswli-right").text();
        const href = $(el).find(".knswli-right h3 a").attr("href");
        const article_thumbnail = $(el).find("a img").attr("src");
        const article_time = new Date();

        list.push(crawlerNewsContent(href));
        data.push({
          article_title,
          article_slug,
          article_excerpt,
          article_thumbnail,
          article_time,
          tags,
          author: {
            name: "Người đưa tin ",
            slug: "nguoi-dua-tin",
          },
          article_source: {
            source_name: "toquoc",
            source_slug: "toquoc",
          },
          article_source_link: `http://ttvn.toquoc.vn${href}`,
        });
      });
    } else {
      console.log(error);
    }
  });
  await Promise.all(list).then(async (res) => {
    console.log(res.length);
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
        console.log(newObject);
        await Article.create(newObject);
        console.log("run");
      }
    }
  });
  return data;
}

module.exports = crawlerData;
