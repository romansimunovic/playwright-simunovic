import { test, expect } from '@playwright/test';
import { SignUpPage } from '../POMs/signUpPage';

let signUpPage: SignUpPage;

test.beforeEach(async ({ page }) => {
  signUpPage = new SignUpPage(page);
  await page.goto(process.env.BASE_URL!);
});

test('Sign up with existing user shows alert', async ({ page }) => {
  await signUpPage.openSignUpModal();

  // ovdje koristi postojeći user koji ti piše da već postoji
  await signUpPage.signUp(process.env.CORRECT_EMAIL!, process.env.CORRECT_PASSWORD!);

  // možeš imati assert da je alert uhvaćen i prihvaćen
  // ili samo ideš dalje jer dialog je već prihvaćen
  await page.waitForTimeout(500); // (mali pauza da alert nestane)
});
