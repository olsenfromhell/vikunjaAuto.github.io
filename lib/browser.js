import playwright from 'playwright';
let browser, context, page;
const profileNameField = '.navbar-end > .user > .dropdown > .base-button > .username';
const passwordField = '#password';
const usernameField = '#username';
const loginBtn = '.is-primary';

async function login () {
    await page.click(usernameField);
    await page.fill(usernameField, 'demo');
    await page.click(passwordField);
    await page.fill(passwordField, 'demo');
    await page.click(loginBtn);
    await page.waitForSelector(profileNameField);
};

async function run (url) {
    browser = await playwright.chromium.launch(
        {
            headless: true,
            slowMo: 50,
        }
    )
    context = await browser.newContext();
    page = await browser.newPage();
    await page.goto(url);
    return page;
};

async function stop () {
        await page.screenshot({path: 'screenshot.png'});
        await browser.close();
};

export { run, stop, login }
