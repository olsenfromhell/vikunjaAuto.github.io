import chai from 'chai';
import { run, stop } from "../lib/browser.js";
import ap from '../framework/pages/index.js';
const assert = chai.assert;

describe ('Testing Vikunja', () => {
    let page; let myApp;

    const createAccountBtn = 'div > div > #loginform > .mt-2 > a';
    const mainPageLoginText = '.no-auth-wrapper > .noauth-container > .content > div > .title';
    const changeVikunjaInstallationBtn = '.content > div > .api-config > .api-url-info > a';
    const changeVikunjaInstallation = '.api-config > div > .field > .control > .base-button';
    const changeVikunjaInstallationSuccessText = '.vue-notification-group > span > .vue-notification-wrapper > .vue-notification-template > .notification-content';
    const forgotYourPasswordBtn = 'div > #loginform > .field > .label-with-link > .reset-password-link';
    const sendMeAPasswordBtn = 'div > form > .field > .control > .base-button--type-button';
    const profileDropdownMenu = '.menu-active > .navbar-end > .user > .dropdown > .base-button';
    const profileDropdownMenuLogout = '.user > .dropdown > .dropdown-menu > .dropdown-content > .base-button:nth-child(4)';
    const profileDropdownMenuAbout = '.user > .dropdown > .dropdown-menu > .dropdown-content > .base-button:nth-child(3)';
    const profileDropdownAboutModalCloseBtn = '.card > .card-content > .content > .modal-card-foot > .base-button';
    const profileDropdownAboutModalXsign = '.card > .card-header > .card-header-icon > .icon > .svg-inline--fa';
    const aboutModalTextContent = 'modal-container > .modal-content > .card > .card-header > .card-header-title';


    beforeEach(async () => {
        page = await run('https://try.vikunja.io/');
        myApp = ap(page);
    });
    afterEach(async () => {
        await stop();
    });

    it('Переход на страничку регистрации через "Create account"', async () => {
        await page.waitForSelector(createAccountBtn);
        await page.click(createAccountBtn);
        const createAccountTextField = await page.textContent(mainPageLoginText);
        assert.strictEqual(createAccountTextField, 'Create account', 'Текст Create Account не найден');
    });

    it('Изменение Vikunja URL', async () => {
        await page.waitForSelector(changeVikunjaInstallationBtn);
        await page.click(changeVikunjaInstallationBtn);
        await page.waitForSelector(changeVikunjaInstallation);
        await page.click(changeVikunjaInstallation);
        await page.waitForSelector(changeVikunjaInstallationSuccessText);
        const InstallationSuccessText =  await page.textContent(changeVikunjaInstallationSuccessText);
        assert.strictEqual(InstallationSuccessText, 'Используется Vikunja на "try.vikunja.io".', 'Текст "Используется Vikunja на "try.vikunja.io"." не найден');
    });

    it('Переход на страницу восстановления пароля через кнопку Forgot Your Password', async () => {
        await page.waitForSelector(forgotYourPasswordBtn);
        await page.click(forgotYourPasswordBtn);
        await page.waitForSelector(sendMeAPasswordBtn);
        const sendMeAPasswordBtnText = await page.textContent(sendMeAPasswordBtn);
        assert.strictEqual(sendMeAPasswordBtnText, 'Отправить ссылку на сброс пароля', 'Текст "Отправить ссылку на сброс пароля" не найден');
    });

    it('Logout через дропдаун-меню в профиле', async () => {
        await myApp.Login().signin('demo', 'demo');
        await page.waitForSelector(profileDropdownMenu);
        await page.click(profileDropdownMenu);
        await page.waitForSelector(profileDropdownMenuLogout);
        await page.click(profileDropdownMenuLogout);
        const createAccountTextField = await page.textContent(mainPageLoginText);
        assert.strictEqual(createAccountTextField, 'Войти', 'Текст Войти не найден');
    });

    it('Открытие About через дропдаун-меню в профиле', async () => {
        await myApp.Login().signin('demo', 'demo');
        await page.waitForSelector(profileDropdownMenu);
        await page.click(profileDropdownMenu);
        await page.waitForSelector(profileDropdownMenuAbout);
        await page.click(profileDropdownMenuAbout);
        await page.waitForSelector(profileDropdownAboutModalCloseBtn);
        await page.waitForSelector(profileDropdownAboutModalXsign);
        const profileDropdownAboutModalCloseBtnText = await page.textContent(profileDropdownAboutModalCloseBtn);
        assert.strictEqual(profileDropdownAboutModalCloseBtnText, 'Закрыть', 'Текст Закрыть в кнопке закрытия модалки About не найден');
    });
});
