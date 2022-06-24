const passwordField = '#password';
const usernameField = '#username';
const loginBtn = '.is-primary';

const MainPage = {
    login: async (page, username, password) => {
           await page.click(usernameField);
           await page.fill(usernameField, username);
           await page.click(passwordField);
           await page.fill(passwordField, password);
           await page.click(loginBtn);
    }
}

export default MainPage;
