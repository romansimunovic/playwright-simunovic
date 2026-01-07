import { test } from '@playwright/test';

test('User can add item to cart without login', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');

  const productLink = page.locator('a:has-text("Samsung galaxy s6")');
  const addButton = page.locator('a:has-text("Add to cart")');

  await productLink.click();
  page.once('dialog', dialog => dialog.accept());
  await addButton.click();
});
