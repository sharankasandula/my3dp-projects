let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let cors = require('cors');

const puppeteer = require('puppeteer');

let jsonParser = bodyParser.json();
app.use(cors());

app.use(morgan('combined'));
app.post('/scrape-thingiverse', jsonParser,async (req, res) => {

  const result =  await scrapeImages(req.body.text);
  res.send(result);
});
app.listen(8000, () => {
  console.log('Listening to Port 8000');
});


const scrapeImages = async (link) => {
  const browser = await puppeteer.launch({headless: true})
  .catch(err => console.error("Failed to Launch browser using puppeteer",err));
  const page = await browser.newPage()
    .catch(err => console.error("Failed to create a new page in browser",err));
  const data = {};

  await page.goto(link)
    .catch(err => console.error("Failed to navigate to " + link ,err));

  data['author'] = await page.$eval("head > meta[name='author']", element => element.content)
  .catch(err => console.error("Failed to get author data",err));
  data['title'] = await page.$eval("head > meta[property='og:title']", element => element.content)
  .catch(err => console.error("Failed to get title data",err));
  data['description'] = await page.$eval("head > meta[property='og:description']", element => element.content)
  .catch(err => console.error("Failed to get description",err));
  data['favicon'] = await page.$eval("head > link[rel='icon']", element => element.href)
  .catch(err => console.error("Failed to get favcion",err));
  data['images'] = [];

  await page.waitForSelector('li.slide', {
    visible: true,
  }).catch(err => console.error("Could not find li.slide element",err));
  await page.waitForSelector('img', {
    visible: true,
  }).catch(err => console.error("Could not find img element",err));

  // Execute code in the DOM
  data['images'] = await page.evaluate(() => {

    const images = [...document.querySelectorAll('li.thumb')];

    return images.map(list => list.children[0].src);
  }).catch(err => console.error("Could not find image src",err));

  await browser.close()
  .catch(err => console.error("Failed to close browser connection",err));

  return data;
};
