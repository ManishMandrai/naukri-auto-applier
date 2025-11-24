// src/core/browser.js
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function initBrowser() {
  const browser = await puppeteer.launch({
    headless: false,             // keep visible
    defaultViewport: null,
    args: [
      "--start-maximized",
      "--disable-blink-features=AutomationControlled"
    ],
    userDataDir: "./session_naukri"  // saves login session
  });

  const page = (await browser.pages())[0];
  return { browser, page };
}

module.exports = { initBrowser };
