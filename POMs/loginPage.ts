import { Page, Locator, expect } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly loginModal: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('#login2');
    this.loginModal = page.locator('#logInModal');
    this.usernameField = page.locator('#loginusername');
    this.passwordField = page.locator('#loginpassword');
    this.loginButton = page.locator('button', { hasText: 'Log in' });
  }

  async openLoginModal() {
    await this.loginLink.click();
    await this.loginModal.waitFor({ state: 'visible', timeout: 15000 });
  }

  async loginWithValidCredentials() {
    await this.usernameField.fill(process.env.VALID_EMAIL!);
    await this.passwordField.fill(process.env.VALID_PASSWORD!);
    await this.loginButton.click();
  }

  async assertLoginIsSuccessful() {
    const logoutLink = this.page.getByRole('link', { name: 'Log out', exact: true });
    await expect(logoutLink).toBeVisible({ timeout: 20000 });
  }
}
