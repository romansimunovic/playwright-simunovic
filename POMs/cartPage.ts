import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart', exact: true });
    }

    async openCart() {
        await expect(this.cartLink).toBeVisible({ timeout: 10000 });
        await this.cartLink.click();
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}/cart.html`, { timeout: 10000 });
    }

   async addItemToCart() {
  await expect(this.addToCartButton).toBeVisible({ timeout: 10000 });
  await this.addToCartButton.click();
}

}

export default CartPage;
