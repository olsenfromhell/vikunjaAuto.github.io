import LoginPage from "./loginPage.js";
import HomePage from "./homePage.js";

const ap = (page) => ({
    Home: () => new HomePage(page),
    Login: () => new LoginPage(page),

});

export default ap;
