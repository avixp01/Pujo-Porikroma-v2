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

  // Navigate to home instead of login
  await page.goto('http://localhost:5174/'); 
  await new Promise(r => setTimeout(r, 2000));
  
  // Actually look at the code for Guest
  await page.evaluate(() => {
    const els = document.querySelectorAll('*');
    for (let e of els) {
      if (e.innerText === 'Guest') {
        e.click();
      }
    }
  });
  
  await new Promise(r => setTimeout(r, 3000));

  // Find the Map button on the app page
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    for (let btn of buttons) {
      // SVG path for map is M12 2C8.13 2 or something, or it's a map pin
      // But the screenshot shows the user clicks the Map/Globe icon next to the Settings gear.
      // Let's just click all buttons that are NOT 'Settings', 'Profile' or 'Coffee'.
      if (btn.innerHTML.includes('polyline') || btn.innerHTML.includes('path') || btn.innerHTML.includes('circle')) {
         btn.click();
      }
    }
  });

  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'map_test3.png' });
  console.log("Screenshot taken.");
  
  await browser.close();
})();
