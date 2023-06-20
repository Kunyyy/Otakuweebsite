'use server';

import cheerio from "cheerio";
import puppeteer from "puppeteer";
import { PrismaClient } from "@prisma/client";

const gettingData = async(parameters) => {
    const url = `https://www3.gogoanimes.fi/category/${parameters}`;
    process.env.PUPPETEER_CACHE_DIR = './cache';
    const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: './executable',
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
    $("div.anime_info_body_bg").each((i, element) => {
        const routes = $(element)
        .find("img")
        .attr("src");

        links.push(routes);
    });

    return {
        images: links
    }
}

export default async function previewUpload(title, alias, jp, status, deskripsi, parameters) {
    console.log('databases')
    const prisma = new PrismaClient
    const { images } = await gettingData(parameters);

    if (title && alias && jp && status && deskripsi && images) {
        const dbpush = await prisma.anime.create({
            data: {
                name: title,
                alias: alias,
                jpname: jp,
                status: status,
                description: deskripsi,
                preview: images[0],
            },
        });

        if (dbpush) {
            return images[0];
        } else {
            return false;
        }
    } else {
        return false;
    }
}