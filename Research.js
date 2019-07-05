const puppeteer = require('puppeteer');

let settings = {
  timeout: 0, 
  headless: false, // default is true
  devtools: false,

  //// To Open up chrome instead of chromium
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  // userDataDir: '',
  
  defaultViewport: {
    width: 1180,
    height: 800,
    deviceScaleFactor: 1,
  }

  // slowMo: 50 // slow down by 250ms
};


(async () => {
  const browser = await puppeteer.launch(settings);
  const context = await browser.createIncognitoBrowserContext();
  
  // Set __Page = context if you want Incognito 
  const __Page = browser;

  
  // const _page = await __Page.newPage()
  //   .then( async page => {
  //       await _initPage(page);
  //   });


  const _ChromeSettings = await __Page.newPage()
    .then( async page => {
        await page.goto('chrome://bookmarks/');
        await _clickImportBTN(page);
    });

})
();

async function _initPage(page) {
  await page.goto('https://medium.com/search?q=react');
}

async function _clickImportBTN(page) {
  const _selectBTN = `document.querySelector("body > bookmarks-app").shadowRoot.querySelector("bookmarks-toolbar").shadowRoot.querySelector("#menuButton")`;
  const _selectIMPORT = `document.querySelector("body > bookmarks-app").shadowRoot.querySelector("bookmarks-command-manager").shadowRoot.querySelector("cr-action-menu > button:nth-child(7) > span.label")`;
  const buttonHandle = await page.evaluateHandle(_selectBTN);
  await buttonHandle.click();
  const dropDownHandle = await page.evaluateHandle(_selectIMPORT);
  await dropDownHandle.click();
}
