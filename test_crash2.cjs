const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });

  await page.goto('http://localhost:5174'); // Vite is on 5174
  
  await new Promise(r => setTimeout(r, 2000));

  // Click the Map button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    for (let btn of buttons) {
      if (btn.innerHTML.includes('Map') || btn.innerHTML.includes('map') || btn.innerHTML.includes('path') || btn.innerHTML.includes('settings')) {
         btn.click();
      }
    }
  });

  await new Promise(r => setTimeout(r, 5000));
  
  await browser.close();
})();
