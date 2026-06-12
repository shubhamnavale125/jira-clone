import { test, expect } from '@playwright/test';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/project/settings');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('[data-testid="settings-page"]');
  });

  test('should display settings page', async ({ page }) => {
    await expect(page.getByTestId('settings-page')).toBeVisible();
    await expect(page.getByTestId('settings-title')).toHaveText('Project Settings');
  });

  test('should display all settings fields', async ({ page }) => {
    await expect(page.getByTestId('settings-name-input')).toBeVisible();
    await expect(page.getByTestId('settings-url-input')).toBeVisible();
    await expect(page.getByTestId('settings-category-select')).toBeVisible();
    await expect(page.getByTestId('settings-description-input')).toBeVisible();
  });

  test('should show project name pre-filled', async ({ page }) => {
    const nameInput = page.getByTestId('settings-name-input').locator('input');
    const value = nameInput;
    await expect(value).not.toHaveValue('');
  });

  test('should update project name', async ({ page }) => {
    const nameInput = page.getByTestId('settings-name-input').locator('input');
    await nameInput.clear();
    await nameInput.fill('My Updated Project');

    await page.getByTestId('save-settings-btn').click();
    await expect(page.getByTestId('settings-saved-alert')).toBeVisible();

    // Navigate away and back to verify persistence
    await page.goto('/project/board');
    await page.getByTestId('nav-link-project-settings').click();
    await page.waitForSelector('[data-testid="settings-page"]');

    const updatedInput = page.getByTestId('settings-name-input').locator('input');
    await expect(updatedInput).toHaveValue('My Updated Project');
  });

  test('should disable save button when name is empty', async ({ page }) => {
    const nameInput = page.getByTestId('settings-name-input').locator('input');
    await nameInput.clear();
    await expect(page.getByTestId('save-settings-btn')).toBeDisabled();
  });

  test('should cancel changes', async ({ page }) => {
    const nameInput = page.getByTestId('settings-name-input').locator('input');
    const originalValue = await nameInput.inputValue();

    await nameInput.clear();
    await nameInput.fill('Changed Name');

    await page.getByTestId('cancel-settings-btn').click();

    await expect(nameInput).toHaveValue(originalValue);
  });
});
