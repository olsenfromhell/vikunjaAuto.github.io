import RightMenu from '../elements';

const CurrentPage = {
    getProfileName: async (page) => {
        const profileNameText = await RightMenu.getProfileName(page);
        return profileNameText;
    }
}

export default CurrentPage;
