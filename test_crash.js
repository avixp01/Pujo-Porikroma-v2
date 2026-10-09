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

  await page.goto('http://localhost:5173');
  
  // Wait for the app to load
  await page.waitForTimeout(2000);

  // Click the Map button
  // Looking at the screenshot, the top bar has a Map icon.
  // We can just find the button with the map icon or click by coordinates.
  // Let's click the button that opens MapPage.
  // Wait, I can just evaluate a click on the button that has the map icon SVG.
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    // Usually the map button sets the state to show MapPage.
    // Let's click the second button in the header (Map icon).
    for (let btn of buttons) {
      if (btn.innerHTML.includes('Map') || btn.innerHTML.includes('map') || btn.innerHTML.includes('path')) {
         btn.click();
      }
    }
  });

  await page.waitForTimeout(2000);
  
  await browser.close();
})();
