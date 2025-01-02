import { test, expect } from '@playwright/test';

const { MEDAGENDA_URI, EMAIL_ADMIN, PASSWORD_FAKE } = process.env;

if (!MEDAGENDA_URI || !EMAIL_ADMIN || !PASSWORD_FAKE) {
  throw new Error(
    'MEDAGENDA_URI, EMAIL_ADMIN and PASSWORD_FAKE environment variables are required'
  );
}

test('test login as an admin', async ({ page }) => {
  await page.goto(MEDAGENDA_URI);
  await expect(page.locator('h1')).toContainText('Agenda Médical');

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(EMAIL_ADMIN);
  await page.getByPlaceholder('Mot de passe').click();
  await page.getByPlaceholder('Mot de passe').fill(PASSWORD_FAKE);
  await page.getByRole('button', { name: 'CONNEXION' }).click();
  await expect(page.locator('h1')).toContainText('Administrateur');
  await expect(page.getByTestId('connected-role')).toContainText(
    'administrateur'
  );
});
