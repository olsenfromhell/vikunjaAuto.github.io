import RightMenu from "../elements/index.js";
import decoratePage from "../../lib/logger.js";
import BasePage from './basePage.js';


class HomePage extends BasePage {
    constructor(page, pageRootSelector = 'HomePage') {
        super(page);
        this.rootSelector = pageRootSelector;
        this.profileNameField = '.navbar-end > .user > .dropdown > .base-button > .username';
    }
    async getProfileName () {
        const profileNameText = await super.getTextContent(this.profileNameField)
        return profileNameText;
    }
}
decoratePage(HomePage)

export default HomePage;
