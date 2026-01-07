import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.locator('button:has-text("Log in")');
    this.logoutButton = page.locator('#logout2'); // logout button koji se pojavi kad je login
  }

  async openLoginModal() {
    await this.page.locator('#login2').click();
    await this.page.locator('#logInModal').waitFor({ state: 'visible' });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.locator('#logInModal').waitFor({ state: 'hidden' });
  }

  async assertLoggedIn() {
    // čekaj da logout button postane vidljiv
    await this.logoutButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.logoutButton).toBeVisible();
  }
}
