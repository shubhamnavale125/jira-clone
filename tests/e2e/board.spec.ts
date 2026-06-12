import { test, expect } from '@playwright/test';

test.describe('Board Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/project/board');
    // Clear localStorage to ensure fresh data from JSON
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('[data-testid="board-page"]');
  });

  test('should display the board page', async ({ page }) => {
    await expect(page.getByTestId('board-page')).toBeVisible();
    await expect(page.getByTestId('board-title')).toHaveText('Kanban Board');
  });

  test('should display all four kanban columns', async ({ page }) => {
    await expect(page.getByTestId('board-column-backlog')).toBeVisible();
    await expect(page.getByTestId('board-column-selected')).toBeVisible();
    await expect(page.getByTestId('board-column-inprogress')).toBeVisible();
    await expect(page.getByTestId('board-column-done')).toBeVisible();
  });

  test('should display issue cards in columns', async ({ page }) => {
    const backlogColumn = page.getByTestId('board-column-backlog');
    const cards = backlogColumn.locator('[data-testid^="issue-card-"]');
    await expect(cards.first()).toBeVisible();
  });

  test('should show column issue counts', async ({ page }) => {
    const backlogCount = page.getByTestId('column-count-backlog');
    await expect(backlogCount).toBeVisible();
    const count = await backlogCount.textContent();
    expect(Number(count)).toBeGreaterThan(0);
  });

  test('should display sidebar with navigation links', async ({ page }) => {
    await expect(page.getByTestId('sidebar')).toBeVisible();
    await expect(page.getByTestId('nav-link-kanban-board')).toBeVisible();
    await expect(page.getByTestId('nav-link-project-settings')).toBeVisible();
  });

  test('should display project name in sidebar', async ({ page }) => {
    const projectName = page.getByTestId('project-name');
    await expect(projectName).toBeVisible();
    await expect(projectName).not.toBeEmpty();
  });

  test('should display navbar with search and create buttons', async ({ page }) => {
    await expect(page.getByTestId('navbar-top')).toBeVisible();
    await expect(page.getByTestId('search-btn')).toBeVisible();
    await expect(page.getByTestId('create-issue-btn')).toBeVisible();
  });

  test('should display current user avatar in navbar', async ({ page }) => {
    await expect(page.getByTestId('current-user-avatar')).toBeVisible();
  });

  test('should move an issue up/down inside the same column', async ({ page }) => {
    const backlogColumn = page.getByTestId('board-column-backlog');
    const backlogCards = backlogColumn.locator('[data-testid^="issue-card-"]');
    const initialCount = await backlogCards.count();
    expect(initialCount).toBeGreaterThan(1);

    const firstCard = backlogCards.first();
    const secondCard = backlogCards.nth(1);
    const movedTestId = await firstCard.evaluate((node) => node.getAttribute('data-testid'));

    await firstCard.dragTo(secondCard);

    await expect(backlogColumn.locator('[data-testid^="issue-card-"]').first()).not.toHaveAttribute(
      'data-testid',
      movedTestId || '',
    );
    await expect(backlogColumn.locator(`[data-testid="${movedTestId}"]`)).toHaveCount(1);
  });

  test('should move an issue to another column', async ({ page }) => {
    const backlogColumn = page.getByTestId('board-column-backlog');
    const selectedColumn = page.getByTestId('board-column-selected');

    const sourceCard = backlogColumn.locator('[data-testid^="issue-card-"]').first();
    const movedTestId = await sourceCard.evaluate((node) => node.getAttribute('data-testid'));
    expect(movedTestId).toBeTruthy();

    await sourceCard.dragTo(page.getByTestId('droppable-selected'));

    await expect(backlogColumn.locator(`[data-testid="${movedTestId}"]`)).toHaveCount(0);
    await expect(selectedColumn.locator(`[data-testid="${movedTestId}"]`)).toHaveCount(1);
  });
});
