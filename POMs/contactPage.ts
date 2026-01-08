import { expect, Locator, Page } from '@playwright/test';

export class ContactPage {
    readonly page: Page;
    readonly contactLink: Locator;
    readonly emailInput: Locator;
    readonly nameInput: Locator;
    readonly messageInput: Locator;
    readonly sendButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactLink = page.getByRole('link', { name: 'Contact', exact: true });
        this.emailInput = page.locator('#recipient-email');
        this.nameInput = page.locator('#recipient-name');
        this.messageInput = page.locator('#message-text');
        this.sendButton = page.getByRole('button', { name: 'Send message', exact: true });
    }

    async openContactModal() {
  await this.contactLink.click();

  await this.page.waitForSelector('#exampleModal.show', {
    timeout: 15000,
  });

  await expect(this.emailInput).toBeVisible();
}


    async sendMessage(email: string, name: string, message: string) {
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Thanks for the message');
            await dialog.accept();
        });
        await this.emailInput.fill(email);
        await this.nameInput.fill(name);
        await this.messageInput.fill(message);
        await expect(this.sendButton).toBeEnabled({ timeout: 5000 });
        await this.sendButton.click();
    }
}

export default ContactPage;
