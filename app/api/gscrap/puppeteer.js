'use server';

import puppeteer from "puppeteer-core";
import chrome, { defaultViewport } from "chrome-aws-lambda";

export default async function puppet() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        ignoreHTTPSErrors: true,
    });

    return {
        browser
    }
}