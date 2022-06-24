const profileNameField = '.navbar-end > .user > .dropdown > .base-button > .username';

const RightMenu = {
    getProfileName: async (page) => {
        const profileNameText = await page.textContent(profileNameField);
        return profileNameText;
    }
}

export default RightMenu;

