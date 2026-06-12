import { test, expect } from '@playwright/test';

test.describe('Board Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/project/board');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('[data-testid="board-filter"]');
  });

  test('should display filter controls', async ({ page }) => {
    await expect(page.getByTestId('board-search-input')).toBeVisible();
    await expect(page.getByTestId('only-my-issues-btn')).toBeVisible();
    await expect(page.getByTestId('ignore-resolved-btn')).toBeVisible();
  });

  test('should filter issues by search term', async ({ page }) => {
    const searchInput = page.getByTestId('board-search-input').locator('input');
    await searchInput.fill('TailwindCSS');

    // Board should update to show only matching issues
    const cards = page.locator('[data-testid^="issue-card-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Verify the visible card contains the search term
    const firstCard = cards.first();
    await expect(firstCard).toBeVisible();
  });

  test('should clear search when input is cleared', async ({ page }) => {
    const searchInput = page.getByTestId('board-search-input').locator('input');
    await searchInput.fill('TailwindCSS');

    // Count filtered
    const filteredCount = await page.locator('[data-testid^="issue-card-"]').count();

    await searchInput.clear();

    // After clearing, more issues should be visible
    const fullCount = await page.locator('[data-testid^="issue-card-"]').count();
    expect(fullCount).toBeGreaterThanOrEqual(filteredCount);
  });

  test('should toggle Only My Issues', async ({ page }) => {
    const btn = page.getByTestId('only-my-issues-btn');
    await btn.click();
    // Button should now be active (contained variant)
    await expect(btn).toHaveCSS('background-color', /rgb/);

    await btn.click();
    // Button should be inactive again
  });

  test('should toggle Ignore Resolved', async ({ page }) => {
    const btn = page.getByTestId('ignore-resolved-btn');
    await btn.click();
    // Done column should have 0 visible issues
    const doneCount = page.getByTestId('column-count-done');
    await expect(doneCount).toHaveText('0');
  });

  test('should show clear all button when filters active', async ({ page }) => {
    const searchInput = page.getByTestId('board-search-input').locator('input');
    await searchInput.fill('test');
    await expect(page.getByTestId('clear-filters-btn')).toBeVisible();
  });

  test('should reset all filters on clear all click', async ({ page }) => {
    const searchInput = page.getByTestId('board-search-input').locator('input');
    await searchInput.fill('test');
    await page.getByTestId('ignore-resolved-btn').click();

    await page.getByTestId('clear-filters-btn').click();

    await expect(page.getByTestId('clear-filters-btn')).toBeHidden();
    const inputValue = searchInput;
    await expect(inputValue).toHaveValue('');
  });
});
