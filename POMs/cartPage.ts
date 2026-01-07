import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartNav: Locator;
  readonly firstProductInCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartNav = page.locator('#cartur');
    this.firstProductInCart = page.locator('tr', { hasText: 'Samsung' }).first(); // placeholder
  }

  async openCart() {
    await this.cartNav.click();
  }

  async assertItemInCart(itemName: string) {
    const item = this.page.locator('tr', { hasText: itemName });
    await expect(item.first()).toBeVisible();
  }
}
