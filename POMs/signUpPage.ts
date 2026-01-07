import { Page, Locator } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly signUpNav: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpNav = page.locator('#signin2');                          // Sign up link
    this.usernameField = page.locator('#sign-username');                // username input
    this.passwordField = page.locator('#sign-password');                // password input
    this.signUpButton = page.locator('button:has-text("Sign up")');     // modal button
  }

  async openSignUpModal() {
    await this.signUpNav.click();
    await this.page.locator('#signInModal').waitFor({ state: 'visible' });
  }

  async signUp(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);

    // alert handling
    this.page.once('dialog', dialog => dialog.accept());
    await this.signUpButton.click();
  }
}
