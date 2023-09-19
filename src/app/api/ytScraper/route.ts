import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = req.nextUrl.searchParams.get("query")!;

const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto(`https://www.youtube.com/results?search_query=${query}`);
  await page.waitForSelector("#contents");
const videosData = await page.$$eval("#contents > ytd-video-renderer", (els) => els.map(el => {
    const titleElement = el.querySelector('#video-title') as HTMLAnchorElement;
    const channelElement = el.querySelector('#channel-name a') as HTMLAnchorElement;
    const linkElement = el.querySelector('a#thumbnail') as HTMLAnchorElement;
    const durationElement = el.querySelector('span.ytp-time-duration') as HTMLElement;

    return {
      title: titleElement?.textContent?.trim(),
      videoURL: linkElement?.href,
      channelName: channelElement?.textContent?.trim(),
      duration: durationElement?.textContent?.trim(),
    }
  }));

  await browser.close();
  return NextResponse.json(videosData);
}
