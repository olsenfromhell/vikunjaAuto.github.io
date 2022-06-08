import chai from 'chai';
import {run, stop} from "../lib/browser.js";

const assert = chai.assert;

describe ('Авторизация', () => {
    let page;
    const profileNameField = '.navbar-end > .user > .dropdown > .base-button > .username';
    const passwordField = '#password';
    const usernameField = '#username';
    const loginButton = '.is-primary';

    beforeEach(async () => {
        await run('https://try.vikunja.io/');
    });
    afterEach(async ()=> {
        await stop();
    });

    it('Авторизировать демо пользователя', async () => {
        await page.click(usernameField);
        await page.fill(usernameField, 'demo');
        await page.click(passwordField);
        await page.fill(passwordField, 'demo');
        await page.click(loginButton);
        await page.waitForSelector(profileNameField);
        const profileNameText = await page.textContent(profileNameField);
        assert.strictEqual(profileNameText, 'demo', 'Имя пользователя не равно demo');
    });
});
