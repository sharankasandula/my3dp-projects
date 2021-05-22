const puppeteer = require('puppeteer');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});

const scrapeImages = async (link) => {
    const browser = await puppeteer.launch( { headless: true });
    const page = await browser.newPage();
    const data = {};

    await page.goto(link);

    data['author'] = await page.$eval("head > meta[name='author']", element => element.content);
    data['title'] = await page.$eval("head > meta[property='og:title']", element => element.content);
    data['description'] = await page.$eval("head > meta[property='og:description']", element => element.content);
    data['favicon'] = await page.$eval("head > link[rel='icon']", element => element.href);
    data['images'] = [];

    await page.waitForSelector('li.slide', {
      visible: true,
    });
    await page.waitForSelector('img', {
        visible: true,
    });

    // Execute code in the DOM
    data['images'] = await page.evaluate( () => {

        const images = [...document.querySelectorAll('li.thumb')];

        return images.map(list => list.children[0].src);
    }); 
  
    await browser.close();

    console.log(data);

    return data;
}

exports.scraper = functions.https.onRequest( async (request, response) => {
  cors(request, response, async () => {


      const body = request.body;
      const result = await scrapeImages(body.text);

      response.send(result)

  });
});