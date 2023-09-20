const express = require("express");
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const PORT = 8000;

app.use(cors());

app.get("/api/ytSearchResultScraper", async (req, res) => {
  const { query } = req.query;
  // require('puppeteer-extra-plugin-stealth/evasions/chrome.app')
  // require('puppeteer-extra-plugin-stealth/evasions/chrome.csi')
  // require('puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes')
  // require('puppeteer-extra-plugin-stealth/evasions/chrome.runtime')
  // require('puppeteer-extra-plugin-stealth/evasions/defaultArgs')
  // require('puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow')
  // require('puppeteer-extra-plugin-stealth/evasions/media.codecs')
  // require('puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency')
  // require('puppeteer-extra-plugin-stealth/evasions/navigator.languages')
  // require('puppeteer-extra-plugin-stealth/evasions/navigator.permissions')
  // require('puppeteer-extra-plugin-stealth/evasions/navigator.plugins')
  // require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor')
  // require('puppeteer-extra-plugin-stealth/evasions/navigator.webdriver')
  // require('puppeteer-extra-plugin-stealth/evasions/sourceurl')
  // require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')
  // require('puppeteer-extra-plugin-stealth/evasions/webgl.vendor')
  // require('puppeteer-extra-plugin-stealth/evasions/window.outerdimensions')
  // require("puppeteer-extra-plugin-user-data-dir")
  // const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
  // const UserPrefrence = require('puppeteer-extra-plugin-user-preferences')
  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
  // puppeteer.use(UserPrefrence({userPrefs: {
  //   webkit: {
  //     webprefs: {
  //       default_font_size: 22
  //     }
  //   }
  // }}))

  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  await page.goto(`https://www.youtube.com/results?search_query=${query}`);
  await page.waitForSelector("#contents");
  const videosData = await page.$$eval(
    "#contents > ytd-video-renderer",
    (els) =>
      els.map((el) => {
        const titleElement = el.querySelector("#video-title");
        const channelElement = el.querySelector("#channel-name a");
        const linkElement = el.querySelector("a#thumbnail");
        const durationElement = el.querySelector("span.ytp-time-duration");

        return {
          title: titleElement?.textContent?.trim(),
          videoURL: linkElement?.href,
          channelName: channelElement?.textContent?.trim(),
          duration: durationElement?.textContent?.trim(),
        };
      })
  );
  res.json({ videosData });
});

app.listen(PORT, () => {
  console.log(`Server  on ${PORT}`);
});
