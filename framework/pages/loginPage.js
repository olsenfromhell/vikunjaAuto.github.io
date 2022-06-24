import decoratePage from "../../lib/logger.js";
import BasePage from './basePage.js';

class LoginPage extends BasePage {
    constructor(page, pageRootSelector = 'LoginPage') {
        super(page);
        this.rootSelector = pageRootSelector;
        this.passwordField = '#password';
        this.usernameField = '#username';
        this.loginBtn = '.is-primary';

    }
    async signin (username, password) {
        await this.page.click(this.usernameField);
        await this.page.fill(this.usernameField, username);
        await this.page.click(this.passwordField);
        await this.page.fill(this.passwordField, password);
        await this.page.click(this.loginBtn);
    }
}

decoratePage(LoginPage);

export default LoginPage;
