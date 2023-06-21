'use server';

import cheerio from "cheerio";
import puppet from "./puppeteer";
import { PrismaClient } from "@prisma/client";

const gettingData = async(parameters) => {
    const url = `https://www3.gogoanimes.fi/category/${parameters}`;

    const { browser } = await puppet();
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