import chai from 'chai';
import {run, stop} from "../lib/browser.js";

const assert = chai.assert;

describe ('Главная страничка', () => {
    let page;
    const profileNameField = '.navbar-end > .user > .dropdown > .base-button > .username';
    const passwordField = '#password';
    const usernameField = '#username';
    const loginBtn = '.is-primary';

    const createAccountBtn = 'div > div > #loginform > .mt-2 > a';
    const createAccountText = '.no-auth-wrapper > .noauth-container > .content > div > .title';

    const changeVikunjaInstallationBtn = '.content > div > .api-config > .api-url-info > a';
    const changeVikunjaInstallation = '.api-config > div > .field > .control > .base-button';
    const changeVikunjaInstallationSuccessText = '.vue-notification-group > span > .vue-notification-wrapper > .vue-notification-template > .notification-content';
    const forgotYourPasswordBtn = 'div > #loginform > .field > .label-with-link > .reset-password-link';
    const sendMeAPasswordBtn = 'div > form > .field > .control > .base-button--type-button';

    beforeEach(async () => {
        page = await run('https://try.vikunja.io/');
    });
    afterEach(async ()=> {
        await stop();
    });

    it('Авторизировать демо пользователя', async () => {
        await page.click(usernameField);
        await page.fill(usernameField, 'demo');
        await page.click(passwordField);
        await page.fill(passwordField, 'demo');
        await page.click(loginBtn);
        await page.waitForSelector(profileNameField);
        const profileNameText = await page.textContent(profileNameField);
        assert.strictEqual(profileNameText, 'demo', 'Имя пользователя не равно demo');
    });

    it('Переход на страничку регистрации через "Create account"', async () => {
        await page.waitForSelector(createAccountBtn);
        await page.click(createAccountBtn);
        const сreateAccountTextField = await page.textContent(createAccountText);
        assert.strictEqual(сreateAccountTextField, 'Create account', 'Текст Create Account не найден');
    });

    it('Изменение Vikunja URL', async () => {
        await page.waitForSelector(changeVikunjaInstallationBtn);
        await page.click(changeVikunjaInstallationBtn);
        await page.waitForSelector(changeVikunjaInstallation);
        await page.click(changeVikunjaInstallation);
        await page.waitForSelector(changeVikunjaInstallationSuccessText);
        const InstallationSuccessText =  await page.textContent(changeVikunjaInstallationSuccessText);
        assert.strictEqual(InstallationSuccessText, 'Using Vikunja installation at "try.vikunja.io".', 'Текст "Using Vikunja installation at "try.vikunja.io". не найден');
    });

    it('Переход на страницу восстановления пароля через кнопку Forgot Your Password', async () => {
        await page.waitForSelector(forgotYourPasswordBtn);
        await page.click(forgotYourPasswordBtn);
        await page.waitForSelector(sendMeAPasswordBtn);
        const sendMeAPasswordBtnText = await page.textContent(sendMeAPasswordBtn);
        assert.strictEqual(sendMeAPasswordBtnText, 'Send me a password reset link', 'Текст "Send me a password reset link" не найден');
    });
});
