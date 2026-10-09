const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set a mobile viewport
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

  // Find the button with the map icon inside header
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    // The top-right icons in App.jsx:
    // usually one of them has a settings icon, map icon, user icon.
    // Let's click the map one. It's usually the second one or has an SVG with a map pin / map stroke.
    for (let btn of buttons) {
      if (btn.innerHTML.includes('polyline') || btn.innerHTML.includes('circle cx="12" cy="12"') || btn.innerHTML.includes('map')) {
         btn.click();
      }
    }
  });

  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'map_test.png' });
  console.log("Screenshot taken.");
  
  await browser.close();
})();
