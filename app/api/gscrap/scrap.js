'use server';

import cheerio from "cheerio";
import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient

const getting = async(parameters, titleacc) => {
    const site = "https://www3.gogoanimes.fi";
    const url = `https://www3.gogoanimes.fi/category/${parameters}`;

    const browser = await puppeteer.launch({
        headless: true,
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
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

    let foundDuplicate = false;

    if (titles && titleacc && !foundDuplicate) {

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

    const existingRecords = await Promise.all(result.map((link, index) => {
        const episodeNum = 'Episode' + ' ' + (result.length);
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
          const link = result[index];
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
        return result[0];
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

const gettingData = async(title, alias, jp, status, deskripsi, parameters) => {
    const url = `https://www3.gogoanimes.fi/category/${parameters}`;

    const browser = await puppeteer.launch({
        headless: true,
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(url);

    const content = await page.content();
    const $ = cheerio.load(content);

    const links = [];
    $("div.anime_info_body_bg").each((i, element) => {
        const routes = $(element)
        .find("img")
        .attr("src");

        links.push(routes);
    });

    if (links) {
        const dbpush = await prisma.anime.create({
            data: {
                name: title,
                alias: alias,
                jpname: jp,
                status: status,
                description: deskripsi,
                preview: links[0],
            },
        });

        if (dbpush) {
            return links[0];
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export default async function uploads(title, alias, jp, status, deskripsi, parameters, whats) {

    if (whats == "content") {
        const content = await getting(title, alias, jp, status, deskripsi, parameters);
        if (content) {
            return content;
        } else {
            return false;
        }
    } else if (whats == "preview") {
        const preview = await gettingData(parameters, alias);
        if (preview) {
            return preview;
        } else {
            return false;
        }
    }



}