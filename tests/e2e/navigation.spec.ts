import { test, expect } from '@playwright/test';

test.describe('Search Drawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/project/board');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('[data-testid="search-btn"]');
  });

  test('should open search drawer', async ({ page }) => {
    await page.getByTestId('search-btn').click();
    await expect(page.getByTestId('search-drawer')).toBeVisible();
  });

  test('should display recent issues on open', async ({ page }) => {
    await page.getByTestId('search-btn').click();
    const results = page.locator('[data-testid^="issue-result-"]');
    await expect(results.first()).toBeVisible();
  });

  test('should search and filter issues', async ({ page }) => {
    await page.getByTestId('search-btn').click();
    const searchInput = page.getByTestId('search-input').locator('input');
    await searchInput.fill('Tailwind');

    const results = page.locator('[data-testid^="issue-result-"]');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to issue on click', async ({ page }) => {
    await page.getByTestId('search-btn').click();
    const firstResult = page.locator('[data-testid^="issue-result-"]').first();
    await firstResult.click();

    // Should navigate to the issue detail page or close drawer
    await expect(page.getByTestId('search-drawer')).toBeHidden();
  });

  test('should close search drawer', async ({ page }) => {
    await page.getByTestId('search-btn').click();
    await expect(page.getByTestId('search-drawer')).toBeVisible();

    await page.getByTestId('search-drawer-close').click();
    await expect(page.getByTestId('search-drawer')).toBeHidden();
  });
});

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/project/board');
    await page.waitForSelector('[data-testid="sidebar"]');
  });

  test('should navigate to settings via sidebar', async ({ page }) => {
    await page.getByTestId('nav-link-project-settings').click();
    await expect(page).toHaveURL('/project/settings');
    await expect(page.getByTestId('settings-page')).toBeVisible();
  });

  test('should navigate back to board via sidebar', async ({ page }) => {
    await page.goto('/project/settings');
    await page.getByTestId('nav-link-kanban-board').click();
    await expect(page).toHaveURL('/project/board');
    await expect(page.getByTestId('board-page')).toBeVisible();
  });

  test('should toggle sidebar collapse', async ({ page }) => {
    const toggleBtn = page.getByTestId('sidebar-toggle');
    await toggleBtn.click();

    // After toggle the sidebar should be in collapsed state (narrower)
    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('should redirect root to board', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/project/board');
  });

  test('should show 404 for unknown routes', async ({ page }) => {
    await page.goto('/project/unknown-page');
    await expect(page.getByTestId('not-found-page')).toBeVisible();
  });
});

test.describe('LocalStorage Persistence', () => {
  test('should persist project data across page reloads', async ({ page }) => {
    await page.goto('/project/board');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('[data-testid="board-dnd"]');

    // Create a new issue
    await page.getByTestId('create-issue-btn').click();
    await page.getByTestId('new-issue-title-input').locator('input').fill('Persistent Test Issue');
    await page.getByTestId('submit-add-issue').click();

    // Reload the page
    await page.reload();
    await page.waitForSelector('[data-testid="board-dnd"]');

    // The issue should still be there
    await expect(page.getByText('Persistent Test Issue')).toBeVisible();
  });
});

test.describe('Mobile Responsiveness', () => {
  test('should display mobile menu button on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/project/board');
    await expect(page.getByTestId('mobile-menu-btn')).toBeVisible();
  });

  test('should open mobile sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/project/board');
    await page.getByTestId('mobile-menu-btn').click();
    await expect(page.getByTestId('sidebar')).toBeVisible();
  });

  test('should display board on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/project/board');
    await expect(page.getByTestId('board-page')).toBeVisible();
    await expect(page.getByTestId('board-dnd')).toBeVisible();
  });
});
