import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.locator('#logout2');
  }

  async open() {
    await this.page.goto(process.env.BASE_URL!);
  }

  async logout() {
    await this.logoutButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.logoutButton.click();
  }

  async assertLoggedOut() {
    // čekaj da logout button više nije vidljiv
    await expect(this.logoutButton).toBeHidden({ timeout: 5000 });
  }

  async assertLoggedIn() {
    await expect(this.logoutButton).toBeVisible({ timeout: 10000 });
  }

  async assertProductsVisible() {
    const products = this.page.locator('.hrefch');
    await expect(products.first()).toBeVisible();
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
  }
}
