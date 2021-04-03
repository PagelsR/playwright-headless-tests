const { chromium } = require("playwright-chromium");

module.exports = async function (context, req) {
    const url = req.query.url || "https://google.com/";
    //const url = req.query.url || "https://mercuryhealth2019v3-dev.azurewebsites.net/";
    const browser =  await chromium.launch();
    //const browser = await chromium.launch({headless: true});
    const page = await browser.newPage();
    page.setDefaultTimeout(5000);
    await page.goto(url);
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    context.res = {
        body: screenshotBuffer,
        headers: {
            "content-type": "image/png"
        }
    };
};