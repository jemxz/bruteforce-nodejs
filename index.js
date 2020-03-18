const puppeteer = require('');

async function run(adminPage) {

// setting up a headless chrome browser        
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ["--disable-notifications"]
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(100000);
    await page.goto(adminPage, {waitUntil: 'networkidle2', waitUntil: 'load'});
    
    for (let i = 0; i < usernameList.length; i++) {
        await page.type('#username', usernameList);
        for (let i = 0; i < array.length; i++) {
            await page.type('#password', passwordList);
            await page.click('#loginbutton input');    
        }   
    }
}