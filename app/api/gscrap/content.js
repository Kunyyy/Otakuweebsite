'use server';

import cheerio from "cheerio";
import puppeteer from "puppeteer";
import { PrismaClient } from "@prisma/client";

const getting = async(parameters) => {
  const site = "https://www3.gogoanimes.fi";
  const url = `https://www3.gogoanimes.fi/category/${parameters}`;
  process.env.PUPPETEER_CACHE_DIR = '/home/sbx_user1051/.cache/puppeteer';
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--enable-logging', '--v=1'], // Enable logging
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
    await page.setJavaScriptEnabled(false);
    await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
  );
  await page.goto(url);

  const content = await page.content();
  const $ = cheerio.load(content);

  const links = [];
  $("div.anime_video_body div#load_ep li").each((i, element) => {
    const routes = $(element)
      .find("a")
      .attr("href");

    const link = site + routes.replace(/\s/g, "");
    links.push(link);
  });

  links.reverse();

  await page.close();

  const newPage = await browser.newPage();
  await newPage.setDefaultNavigationTimeout(60000);
  await newPage.setJavaScriptEnabled(false);
  await newPage.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
  );

  const result = [];
  for (const link of links) {

    try {
      await newPage.goto(link);
      await newPage.waitForSelector("div.play-video"); // wait div.play-video to load then continue

      const content = await newPage.content();
      const $ = cheerio.load(content);

      const linked = [];
      $("div.play-video").each((i, element) => {
        const route = $(element)
          .find("iframe")
          .attr("src");

        linked.push(route);
      });

      result.push(linked);
    } catch (error) {
      console.error("Navigation error:", error);
    }
    
  }

  await browser.close();

  const titles = [];
  for (const linked of result) {
    for (const url of linked) {
      const start = url.indexOf('title=') + 6; // Add the length of "title=" to get the starting index
      const end = url.indexOf('Episode'); // Find the index of "Episode" in the URL
      const tiTle = url.substring(start, end);
      const decodedTitle = decodeURIComponent(tiTle);

      titles.push(decodedTitle.replace(/[+\"]/g, " ").trimEnd().trimStart());
    }
  }

  if (titles.length > 0) {
    return {
      title: titles,
      links: result
    }
  } else {
    return false;
  }
}

export default async function dbUpload(parameters, titleacc) {

  const prisma = new PrismaClient();
  const { title, links } = await getting(parameters)

  let foundDuplicate = false;

  if (title && titleacc && !foundDuplicate) {

    const checkdb = await prisma.animeContent.findMany({
        where: {
            title: titleacc,
        },
    });
    
    const getids = await prisma.anime.findFirst({
      where: {
        alias: titleacc 
      }
    })

    const existingRecords = await Promise.all(links.map((link, index) => {
        const episodeNum = 'Episode' + ' ' + (links.length);
        return prisma.animeContent.findFirst({
            where: {
                title: titleacc,
                episode: episodeNum,
            },
        });
    }));
    
    const hasExistingRecord = existingRecords.some(record => record !== null);

    if (!hasExistingRecord) {
      let index = 0;
      let lengths = index + 1;
      lengths = checkdb.length + 1;
      let returning = 0;
      do {
          const episodeNum = 'Episode' + ' ' + lengths;
          const link = links[index];
          await prisma.animeContent.create({
              data: {
                  ids: parseInt(`${lengths}`),
                  link: link[0],
                  title: titleacc,
                  episode: episodeNum
              },
          });

          returning = 1;
          
          lengths++
          index++;
      } while (index < title.length);

      await prisma.anime.update({
        where: {
          id: getids.id 
        },
        data: {
          updatedAt: new Date()
        }
      })

      if (returning) {
        return links[0];
      } else {
        return false;
      }
    } else {
      foundDuplicate = true;
      return false;
    }
    
  } else {
    return false;
  }
}