// import puppeteer from "puppeteer";
import axios from 'axios';
import * as cheerio from 'cheerio';

interface results{
  title: string,
  link: string,
  channel: string,
  duration: string,
}

export async function youtubeSearch(query: string) {
  const url = `https://www.youtube.com/results?search_query=${query}`;
  const response = await fetch(url);
  const data: any = response.json();
  const $ = cheerio.load(data.data);

  const results: results[] = [];

  $('.yt-lockup-video').each((_, element) => {
    const title = $(element).find('.yt-lockup-title a').attr('title')!;
    const link = 'https://www.youtube.com' + $(element).find('.yt-lockup-title a').attr('href');
    const channel = $(element).find('.yt-lockup-byline a').text();
    const duration = $(element).find('.video-time').text();
    // return { title, link, channel, duration };
    results.push({ title, link, channel, duration });
  });

  return results;
}