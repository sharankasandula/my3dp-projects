const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

exports.getpdf = functions.https.onRequest(async (req, res) => {


    var browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    try {

        const page = await browser.newPage();
        await page.setContent("<html><head></head><body><h1>HELLO WORLD!</h1></body></html>")


        const buffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                left: '0px',
                top: '0px',
                right: '0px',
                bottom: '0px'
            }
        })


        res.header('Content-Type', 'application/pdf;charset=utf-8');
        res.header('Content-Disposition', 'attachment; filename=some_file.pdf');
        res.type('application/pdf').send(buffer);




    } catch (e) {
        res.status(500).send(e.toString());
    }

       await browser.close();

});
