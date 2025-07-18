const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });

  // -------- Directory Site Login --------

  const page = await browser.newPage();
  console.log(' Logging in to directory site...');
  await page.goto('https://www.example-directory.com/login', {
    waitUntil: 'domcontentloaded',
    timeout: 0
  });

  try {
    // Replace with your login credentials
    await page.type('input[name="user"]', 'YOUR_USERNAME');
    await page.type('input[name="pass"]', 'YOUR_PASSWORD');

    await Promise.all([
      page.click('input[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    ]);

    console.log(' Logged in successfully!');

    // Navigate to submission form
    console.log(' Navigating to submission form...');
    await page.goto('https://www.example-directory.com/submit?c=1&LINK_TYPE=1', {
      waitUntil: 'domcontentloaded',
      timeout: 0
    });

    // Fill out submission form with dummy values
    await page.type('input[name="TITLE"]', 'Your-Site-Title');
    await page.type('input[name="URL"]', 'https://www.yourwebsite.com/');
    await page.type('textarea[name="DESCRIPTION"]', 'Brief description of your website or service.');
    await page.click('input[name="AGREERULES"]');

    console.log(' Form filled. Please complete CAPTCHA manually if prompted.');
  } catch (err) {
    console.log(' Error occurred:', err.message);
  }
  // Keeps the browser open for manual CAPTCHA solving
})();
