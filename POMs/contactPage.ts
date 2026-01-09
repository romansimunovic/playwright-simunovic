import { Page, Locator, expect } from '@playwright/test';

export default class ContactPage {
  readonly page: Page;
  readonly contactLink: Locator;
  readonly contactModal: Locator;
  readonly emailField: Locator;
  readonly nameField: Locator;
  readonly messageField: Locator;
  readonly sendButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactLink = page.locator('#navbarExample a', { hasText: 'Contact' });
    this.contactModal = page.locator('#exampleModal');
    this.emailField = page.locator('#recipient-email');
    this.nameField = page.locator('#recipient-name');
    this.messageField = page.locator('#message-text');
    this.sendButton = page.locator('button', { hasText: 'Send message' });
  }

  async openContactModal() {
    await expect(this.contactLink).toBeVisible({ timeout: 15000 });
    await this.contactLink.scrollIntoViewIfNeeded();
    await this.contactLink.click();
    await expect(this.contactModal).toBeVisible({ timeout: 15000 });
  }

  async sendMessage(email: string, name: string, message: string) {
    await this.emailField.fill(email);
    await this.nameField.fill(name);
    await this.messageField.fill(message);

    // listen once for dialog
    this.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Thanks for the message');
      await dialog.accept();
    });

    await this.sendButton.click();
  }
}
