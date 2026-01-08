import { expect, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginLink: any;
    readonly usernameInput: any;
    readonly passwordInput: any;
    readonly loginButton: any;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Log in', exact: true });
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in', exact: true });
    }

    async openLoginModal() {
        await expect(this.loginLink).toBeVisible({ timeout: 10000 });
        await this.loginLink.click();
        await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
    }

    async loginWithValidCredentials() {
        await this.usernameInput.fill(process.env.CORRECT_USERNAME!);
        await this.passwordInput.fill(process.env.CORRECT_PASSWORD!);
        await expect(this.loginButton).toBeEnabled({ timeout: 5000 });
        await this.loginButton.click();
    }

    async assertLoginIsSuccessful() {
    const welcome = this.page.getByText('Welcome', { exact: false }); // traži samo "Welcome"
    await expect(welcome).toContainText(process.env.CORRECT_USERNAME!); // provjeri da je tu tvoj user/email
}



}

export default LoginPage;
