const cors = require("cors")
const puppeteer = require("puppeteer")
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const scrapeThingiverse = async (link) => {
const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link);
const data = {};
await page.content()

data['author'] = await page.$eval("head > meta[name='author']", element => element.content);
data['title'] = await page.$eval("head > meta[property='og:title']", element => element.content);
data['description'] = await page.$eval("head > meta[property='og:description']", element => element.content);
data['favicon'] = await page.$eval("head > link[rel='icon']", element => element.href);

data['images'] = await page.evaluate(() => {
    const imgUrls = document.querySelectorAll('li')
    const urls = [];
    for (let i = 0; i < imgUrls.length; i++) {
        if (li.className === 'slide') {
            urls.push(imgUrls[i].children[0].src)
        } else {
            urls.push('you messed up')
        }
    }
    console.log(JSON.stringify(urls))
return urls;
});
await browser.close();
return data;
}


exports.scraper = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const body = JSON.parse(req.body);
    const data = 'await scrapeThingiverse(body.text)';

    response.send(data);
  });
});
