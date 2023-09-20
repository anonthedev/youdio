import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// import * as cheerio from "cheerio";
// import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = req.nextUrl.searchParams.get("query")!;
  // const encodedQuery = encodeURIComponent(query);
  // const url = `https://www.youtube.com/results?search_query=${encodedQuery}`;

  // try {
  //   const response = await axios.get(url);
  //   const html = response.data;
  //   const $ = cheerio.load(html);
  //   // console.log(html)
  //   const results: any[] = [];
  //   // console.log($("div#contents ytd-video-renderer"))

  //   setTimeout(() => {
  //     console.log($("div#contents").length);
  //   }, 2000);

  //   $("#contents ytd-video-renderer").map((index: number, element: any) => {
  //     const title = $(element).find("#video-title").text().trim();
  //     console.log(title ? title : "notitle");
  //     const videoURL = `https://www.youtube.com${$(element)
  //       .find("#thumbnail")
  //       .attr("href")}`;
  //     const duration = $(element)
  //       .find("span.style-scope.ytd-thumbnail-overlay-time-status-renderer")
  //       .text()
  //       .trim();
  //     // const title = $(element).find("a#video-title").text().trim();
  //     // const videoURL = `https://www.youtube.com${$(element).find("a#thumbnail").attr("href")}`;
  //     // const duration = $(element).find("span.style-scope.ytd-thumbnail-overlay-time-status-renderer").text().trim();
  //     const channelName = $(element)
  //       .find("#channel-info #channel-name a")
  //       .text()
  //       .trim();
  //     // const channelLink = `https://www.youtube.com${$(element).find("#channel-info > a").attr("href")}`;
  //     // const views = $(element).find("#metadata-line > span:first-child").text().trim();
  //     results.push({ title, videoURL, channelName, duration });
  //   });
  //   return NextResponse.json(results);
  // } catch (error) {
  //   console.log(error);
  //   return NextResponse.json({ message: "Error" });
  // }
  puppeteer.use(StealthPlugin())
  puppeteer.use(AdblockerPlugin({blockTrackers: true}))

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`https://www.youtube.com/results?search_query=${query}`);
  await page.waitForSelector("#contents");
  const videosData = await page.$$eval(
    "#contents > ytd-video-renderer",
    (els) =>
      els.map((el) => {
        const titleElement = el.querySelector(
          "#video-title"
        ) as HTMLAnchorElement;
        const channelElement = el.querySelector(
          "#channel-name a"
        ) as HTMLAnchorElement;
        const linkElement = el.querySelector(
          "a#thumbnail"
        ) as HTMLAnchorElement;
        const durationElement = el.querySelector(
          "span.ytp-time-duration"
        ) as HTMLElement;

        return {
          title: titleElement?.textContent?.trim(),
          videoURL: linkElement?.href,
          channelName: channelElement?.textContent?.trim(),
          duration: durationElement?.textContent?.trim(),
        };
      })
  );

  await browser.close();
  return NextResponse.json(videosData);
}