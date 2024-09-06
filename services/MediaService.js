require('dotenv').config();
const puppeteer = require('puppeteer');

const getLatestFacebookVideos = async (number) => {
    const url = process.env.URL_FACEBOOK_VIDEOS;
    let browser;

    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.waitForSelector('a[href*="/videos/"]', { timeout: 5000 });

        const videos = await page.evaluate((num) => {
            const videoElements = Array.from(document.querySelectorAll('a[href*="/videos/"]'));
            const uniqueVideos = new Set(videoElements
                .map(element => element.href)
                .filter(href => !href.includes('/login/'))
            );
            return Array.from(uniqueVideos).slice(0, num); 
        }, number);

        return { success: true, videos };
    } catch (error) {
        return { success: false, error: error.message };
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

const getLatestInstagramImages = async (number) => {
    const url = process.env.URL_INSTAGRAM_IMAGES;
    let browser;

    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Espera a que las imágenes se carguen
        await page.waitForSelector('article img', { timeout: 10000 });

        // Obtén las URLs de las imágenes
        const images = await page.evaluate((num) => {
            const imageElements = Array.from(document.querySelectorAll('article img'));
            const uniqueImages = new Set(imageElements
                .map(element => element.src)
                .filter(src => src && !src.includes('/login/'))
            );
            return Array.from(uniqueImages).slice(0, num); 
        }, number);

        return { success: true, images };
    } catch (error) {
        return { success: false, error: error.message };
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};


module.exports = {
    getLatestFacebookVideos,
    getLatestInstagramImages
};
