const parser = require("fast-xml-parser");
exports.dateFormatter = date => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    hour = "" + d.getHours(),
    minutes = "" + d.getMinutes(),
    seconds = "" + d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour.length < 2) hour = "0" + hour;
  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;

  return `${[year, month, day].join("-")}T${hour}:${minutes}:${seconds}+00:00`;
};

exports.createSiteMap = (siteMapString, willCreateId) => {
  const createdSiteMap =
    siteMapString.split("</urlset>")[0] +
    `<url>\n` +
    `\t<loc>https://killi8n.com/post/${willCreateId}</loc>\n` +
    `\t<lastmod>${this.dateFormatter(new Date())}</lastmod>\n` +
    `\t<changefreq>always</changefreq>\n` +
    `\t<priority>0.8</priority>\n` +
    `</url>\n` +
    `</urlset>`;
  return createdSiteMap;
};
exports.updateSiteMap = (siteMapString, willUpdateId) => {
  //   console.log(siteMapString);
  const parsedSiteMap = parser.parse(siteMapString);
  let parsedUrls = parsedSiteMap.urlset.url;
  const writtenIndex = parsedUrls.findIndex((url, i) => {
    return url.loc.includes(willUpdateId);
  });

  if (writtenIndex !== -1) {
    let updatedSiteMap = "";
    for (let i = 0; i < parsedUrls.length; i++) {
      if (i === writtenIndex) {
        updatedSiteMap +=
          "<url>\n" +
          `\t<loc>${parsedUrls[i].loc}</loc>\n` +
          `\t<lastmod>${this.dateFormatter(new Date())}</lastmod>\n` +
          `\t<changefreq>${parsedUrls[i].changefreq}</changefreq>\n` +
          `\t<priority>${parsedUrls[i].priority}</priority>\n` +
          `</url>\n`;
      } else {
        updatedSiteMap +=
          "<url>\n" +
          `\t<loc>${parsedUrls[i].loc}</loc>\n` +
          `\t<lastmod>${parsedUrls[i].lastmod}</lastmod>\n` +
          `\t<changefreq>${parsedUrls[i].changefreq}</changefreq>\n` +
          `\t<priority>${parsedUrls[i].priority}</priority>\n` +
          `</url>\n`;
      }
    }
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${updatedSiteMap}</urlset>`;
  }

  return this.createSiteMap(siteMapString, willUpdateId);
};

exports.removeSiteMap = (siteMapString, willRemoveId) => {
  const parsedSiteMap = parser.parse(siteMapString);
  let parsedUrls = parsedSiteMap.urlset.url;
  const willRemoveIndex = parsedUrls.findIndex((url, i) => {
    return url.loc.includes(willRemoveId);
  });

  parsedUrls.splice(willRemoveIndex, 1);

  let deletedSiteMap = "";
  for (let i = 0; i < parsedUrls.length; i++) {
    deletedSiteMap +=
      "<url>\n" +
      `\t<loc>${parsedUrls[i].loc}</loc>\n` +
      `\t<lastmod>${parsedUrls[i].lastmod}</lastmod>\n` +
      `\t<changefreq>${parsedUrls[i].changefreq}</changefreq>\n` +
      `\t<priority>${parsedUrls[i].priority}</priority>\n` +
      `</url>\n`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${deletedSiteMap}</urlset>`;
};
