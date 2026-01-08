import { Page, Locator, expect } from '@playwright/test';


export default class SignUpPage {
readonly page: Page;
readonly signupLink: Locator;
readonly signupModal: Locator;
readonly usernameField: Locator;
readonly passwordField: Locator;
readonly signupButton: Locator;


constructor(page: Page) {
this.page = page;
this.signupLink = page.locator('#signin2');
this.signupModal = page.locator('#signInModal');
this.usernameField = page.locator('#sign-username');
this.passwordField = page.locator('#sign-password');
this.signupButton = page.locator('button:has-text("Sign up")');
}


async openSignUpModal() {
await this.signupLink.click();
await expect(this.signupModal).toBeVisible();
}


async signUp(username: string, password: string) {
await this.openSignUpModal();
await this.usernameField.fill(username);
await this.passwordField.fill(password);
await this.signupButton.click();
}
}