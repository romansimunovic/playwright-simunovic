import { Page, Locator } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly contactNav: Locator;
  readonly emailField: Locator;
  readonly nameField: Locator;
  readonly messageField: Locator;
  readonly sendMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactNav = page.locator('a:has-text("Contact")');
    this.emailField = page.locator('#recipient-email');
    this.nameField = page.locator('#recipient-name');
    this.messageField = page.locator('#message-text');
    this.sendMessageButton = page.locator('button:has-text("Send message")');
  }

  async openContactModal() {
    await this.contactNav.click();
    await this.page.locator('#exampleModal').waitFor({ state: 'visible' });
  }

  async sendMessage(email: string, name: string, message: string) {
    await this.emailField.fill(email);
    await this.nameField.fill(name);
    await this.messageField.fill(message);

    // alert handling
    this.page.once('dialog', dialog => dialog.accept());
    await this.sendMessageButton.click();
  }
}
