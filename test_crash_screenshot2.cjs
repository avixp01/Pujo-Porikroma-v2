const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 812 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });

  await page.goto('http://localhost:5174'); 
  
  await new Promise(r => setTimeout(r, 2000));

  // Click Guest
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('a, button, span, strong, div, p')).find(e => e.innerHTML.includes('Guest') || e.innerText === 'Guest');
    if (b) b.click();
  });
  
  await new Promise(r => setTimeout(r, 2000));

  // Find the Map button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    for (let btn of buttons) {
      if (btn.innerHTML.includes('polyline') || btn.innerHTML.includes('circle cx="12" cy="12"') || btn.innerHTML.includes('map')) {
         btn.click();
      }
    }
  });

  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'map_test2.png' });
  console.log("Screenshot taken.");
  
  await browser.close();
})();
