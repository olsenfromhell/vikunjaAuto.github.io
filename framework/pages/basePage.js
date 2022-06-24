class BasePage {
    constructor(page, rootSelector) {
        this.page = page;
    }
    async getUrl(){
        return await this.page.url();
    }
    async getTextContent(selector) {
        return await this.page.textContent(selector);
    }
}

export default BasePage;
