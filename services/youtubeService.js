require('dotenv').config();
const puppeteer = require('puppeteer');

const getLatestFacebookVideos = async () => {
    const url = process.env.URL_YOUTUBE;
    let browser;

    try {
        
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.waitForSelector('a[href*="/videos/"]', { timeout: 5000 });
        
        const videos = await page.evaluate(() => {
            const videoElements = Array.from(document.querySelectorAll('a[href*="/videos/"]'));
            const uniqueVideos = new Set(videoElements
                .map(element => element.href)
                .filter(href => !href.includes('/login/'))
            );
            return Array.from(uniqueVideos).slice(0, 4);
           
        });

        return { success: true, videos };
    } catch (error) {
        return { success: false, error: error.message };
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = {
    getLatestFacebookVideos
};
