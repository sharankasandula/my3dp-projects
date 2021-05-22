import * as functions from 'firebase-functions';
import cors from 'cors';
import getUrls from "get-urls";
import cheerio from "cheerio";


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const scrapeMetatags = (text) => {
  const urls = Array.from(getUrls(text));
  const requests = urls.map(async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const getMetatag = (name) =>
      $('meta[name=' + name + ']').attr('content') ||
      $('meta[property="og:' + name + '"]').attr('content');


    return {
      url,
      title: $('title').first().text(),
      favicon: $('link[rel="shortcut icon"]').attr('href'),
      description: getMetatag('description'),
      image: getMetatag('image'),
      author: getMetatag('author')
    };
  });
  return Promise.all(requests);
};

exports.scraper = functions.https.onRequest(((req, resp) => {
  cors(req, resp, async () => {
    const body = JSON.parse(req.body);
    const data = await scrapeMetatags(body.text);

    resp.send(data);
  });
}));
