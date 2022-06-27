import chai from 'chai';
import { run, stop } from "../lib/browser.js";
import ap from '../framework/pages/index.js';
import Selector from '../framework/elements/selectors.js';
const assert = chai.assert;

describe ('Testing Vikunja', () => {
    let page; let myApp;



    beforeEach(async () => {
        page = await run('https://try.vikunja.io/');
        myApp = ap(page);
    });
    afterEach(async () => {
        await stop();
    });

    it('Переход на страничку регистрации через "Create account"', async () => {
        await page.waitForSelector(Selector.createAccountBtn);
        await page.click(Selector.createAccountBtn);
        const createAccountTextField = await page.textContent(Selector.mainPageLoginText);
        assert.strictEqual(createAccountTextField, 'Create account', 'Текст Create Account не найден');
    });

    it('Изменение Vikunja URL', async () => {
        await page.waitForSelector(Selector.changeVikunjaInstallationBtn);
        await page.click(Selector.changeVikunjaInstallationBtn);
        await page.waitForSelector(Selector.changeVikunjaInstallation);
        await page.click(Selector.changeVikunjaInstallation);
        await page.waitForSelector(Selector.changeVikunjaInstallationSuccessText);
        const InstallationSuccessText =  await page.textContent(Selector.changeVikunjaInstallationSuccessText);
        assert.strictEqual(InstallationSuccessText, 'Используется Vikunja на "try.vikunja.io".', 'Текст "Используется Vikunja на "try.vikunja.io"." не найден');
    });

    it('Переход на страницу восстановления пароля через кнопку Forgot Your Password', async () => {
        await page.waitForSelector(Selector.forgotYourPasswordBtn);
        await page.click(Selector.forgotYourPasswordBtn);
        await page.waitForSelector(Selector.sendMeAPasswordBtn);
        const sendMeAPasswordBtnText = await page.textContent(Selector.sendMeAPasswordBtn);
        assert.strictEqual(sendMeAPasswordBtnText, 'Отправить ссылку на сброс пароля', 'Текст "Отправить ссылку на сброс пароля" не найден');
    });

    it('Logout через дропдаун-меню в профиле', async () => {
        await myApp.Login().signin('demo', 'demo');
        await page.waitForSelector(Selector.profileDropdownMenu);
        await page.click(Selector.profileDropdownMenu);
        await page.waitForSelector(Selector.profileDropdownMenuLogout);
        await page.click(Selector.profileDropdownMenuLogout);
        const createAccountTextField = await page.textContent(Selector.mainPageLoginText);
        assert.strictEqual(createAccountTextField, 'Войти', 'Текст Войти не найден');
    });

    it('Открытие About через дропдаун-меню в профиле', async () => {
        await myApp.Login().signin('demo', 'demo');
        await page.waitForSelector(Selector.profileDropdownMenu);
        await page.click(Selector.profileDropdownMenu);
        await page.waitForSelector(Selector.profileDropdownMenuAbout);
        await page.click(Selector.profileDropdownMenuAbout);
        await page.waitForSelector(Selector.profileDropdownAboutModalCloseBtn);
        await page.waitForSelector(Selector.profileDropdownAboutModalXsign);
        const profileDropdownAboutModalCloseBtnText = await page.textContent(Selector.profileDropdownAboutModalCloseBtn);
        assert.strictEqual(profileDropdownAboutModalCloseBtnText, 'Закрыть', 'Текст Закрыть в кнопке закрытия модалки About не найден');
    });
});
