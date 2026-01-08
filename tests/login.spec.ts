import { test, expect } from '@playwright/test';
import HomePage from '../POMs/HomePage';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
});

test('Products are visible on home', async () => {
    await homePage.assertProductsVisible();
});
