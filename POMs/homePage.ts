import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly productCards: Locator;
    readonly homeLink: Locator;
    readonly categoryLinkPhones: Locator;
    readonly categoryLinkLaptops: Locator;
    readonly categoryLinkMonitors: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole('link', { name: 'Home', exact: true });
        this.categoryLinkPhones = page.getByRole('link', { name: 'Phones', exact: true });
        this.categoryLinkLaptops = page.getByRole('link', { name: 'Laptops', exact: true });
        this.categoryLinkMonitors = page.getByRole('link', { name: 'Monitors', exact: true });
        this.productCards = page.locator('.card');
    }

    async open() {
        await this.page.goto(process.env.BASE_URL!, { waitUntil: 'domcontentloaded' });
    }

    async assertProductsVisible() {
        await expect(this.productCards.first()).toBeVisible();
    }

    async navigateToCategory(category: 'Phones' | 'Laptops' | 'Monitors') {
        switch (category) {
            case 'Phones': await this.categoryLinkPhones.click(); break;
            case 'Laptops': await this.categoryLinkLaptops.click(); break;
            case 'Monitors': await this.categoryLinkMonitors.click(); break;
        }
    }

    async openProduct(itemName: string) {
        const item = this.page.getByRole('link', { name: itemName, exact: true });
        await item.click();
    }
}

export default HomePage;
