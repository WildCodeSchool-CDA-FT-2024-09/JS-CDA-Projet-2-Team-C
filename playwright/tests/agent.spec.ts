import { test, expect } from '@playwright/test';

const { EMAIL_AGENT, PASSWORD_FAKE } = process.env;

if (!EMAIL_AGENT || !PASSWORD_FAKE) {
  throw new Error(
    'EMAIL_AGENT and PASSWORD_FAKE environment variables are required'
  );
}

test('test login as an agent', async ({ page }) => {
  await page.goto('http://localhost:5000/');
  await expect(page.locator('h1')).toContainText('Agenda Médical');

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(EMAIL_AGENT);
  await page.getByPlaceholder('Mot de passe').click();
  await page.getByPlaceholder('Mot de passe').fill(PASSWORD_FAKE);
  await page.getByRole('button', { name: 'CONNEXION' }).click();
  await expect(page.locator('h1')).toContainText('Recherche rapide');
  await expect(page.getByTestId('connected-role')).toContainText('AGENT');
});
