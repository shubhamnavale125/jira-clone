import { test, expect } from '@playwright/test';

test.describe('Issue Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/project/board');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('[data-testid="board-dnd"]');
  });

  test('should open issue modal when clicking on an issue card', async ({ page }) => {
    const firstCard = page.locator('[data-testid^="issue-card-"]').first();
    const issueId = await firstCard.getAttribute('data-testid');
    const id = issueId?.replace('issue-card-', '');

    await firstCard.click();
    await expect(page.getByTestId(`issue-modal-${id}`)).toBeVisible();
  });

  test('should close issue modal', async ({ page }) => {
    const firstCard = page.locator('[data-testid^="issue-card-"]').first();
    const issueId = await firstCard.getAttribute('data-testid');
    const id = issueId?.replace('issue-card-', '');

    await firstCard.click();
    const modal = page.getByTestId(`issue-modal-${id}`);
    await expect(modal).toBeVisible();

    await page.getByTestId(`close-issue-${id}`).click();
    await expect(modal).toBeHidden();
  });

  test('should display issue details in modal', async ({ page }) => {
    const firstCard = page.locator('[data-testid^="issue-card-"]').first();
    const issueId = await firstCard.getAttribute('data-testid');
    const id = issueId?.replace('issue-card-', '');

    await firstCard.click();

    await expect(page.getByTestId(`issue-detail-${id}`)).toBeVisible();
    await expect(page.getByTestId(`issue-title-display-${id}`)).toBeVisible();
    await expect(page.getByTestId(`issue-status-${id}`)).toBeVisible();
    await expect(page.getByTestId(`issue-priority-${id}`)).toBeVisible();
  });

  test('should edit issue title', async ({ page }) => {
    const firstCard = page.locator('[data-testid^="issue-card-"]').first();
    const issueId = await firstCard.getAttribute('data-testid');
    const id = issueId?.replace('issue-card-', '');

    await firstCard.click();
    await page.waitForSelector(`[data-testid="issue-title-display-${id}"]`);

    const titleDisplay = page.getByTestId(`issue-title-display-${id}`);

    await titleDisplay.click();
    const input = page.getByTestId(`issue-title-input-${id}`).locator('textarea').first();
    await input.clear();
    await input.fill('Updated Issue Title');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId(`issue-title-display-${id}`)).toHaveText('Updated Issue Title');
  });

  test('should add a comment to an issue', async ({ page }) => {
    const firstCard = page.locator('[data-testid^="issue-card-"]').first();
    const issueId = await firstCard.getAttribute('data-testid');
    const id = issueId?.replace('issue-card-', '');

    await firstCard.click();
    await page.waitForSelector(`[data-testid="add-comment-btn-${id}"]`);

    await page.getByTestId(`add-comment-btn-${id}`).click();
    await page
      .getByTestId(`new-comment-input-${id}`)
      .locator('textarea')
      .first()
      .fill('Test comment from Playwright');
    await page.getByTestId(`submit-comment-${id}`).click();

    await expect(page.getByText('Test comment from Playwright')).toBeVisible();
  });

  test('should change issue status', async ({ page }) => {
    const firstCard = page.locator('[data-testid^="issue-card-"]').first();
    const issueId = await firstCard.getAttribute('data-testid');
    const id = issueId?.replace('issue-card-', '');

    await firstCard.click();
    await page.waitForSelector(`[data-testid="issue-status-${id}"]`);

    await page.getByTestId(`issue-status-${id}`).click();
    await page.getByTestId('status-option-done').click();

    // Verify status changed
    await expect(page.getByTestId(`issue-status-${id}`)).toContainText('Done');
  });

  test('should delete an issue', async ({ page }) => {
    const cards = page.locator('[data-testid^="issue-card-"]');
    const initialCount = await cards.count();

    const firstCard = cards.first();
    const issueId = await firstCard.getAttribute('data-testid');
    const id = issueId?.replace('issue-card-', '');

    await firstCard.click();
    await page.waitForSelector(`[data-testid="delete-issue-btn-${id}"]`);

    await page.getByTestId(`delete-issue-btn-${id}`).click();
    await expect(page.getByTestId(`delete-issue-modal-${id}`)).toBeVisible();

    await page.getByTestId(`confirm-delete-${id}`).click();

    // Modal should close and card should be gone
    await expect(page.getByTestId(`issue-card-${id}`)).toBeHidden();
    const newCount = cards;
    await expect(newCount).toHaveCount(initialCount - 1);
  });
});

test.describe('Create Issue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/project/board');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('[data-testid="create-issue-btn"]');
  });

  test('should open create issue modal', async ({ page }) => {
    await page.getByTestId('create-issue-btn').click();
    await expect(page.getByTestId('add-issue-modal')).toBeVisible();
    await expect(page.getByTestId('add-issue-title')).toHaveText('Create Issue');
  });

  test('should create a new issue', async ({ page }) => {
    const initialCardCount = await page.locator('[data-testid^="issue-card-"]').count();

    await page.getByTestId('create-issue-btn').click();
    await page.getByTestId('new-issue-title-input').locator('input').fill('My New Test Issue');
    await page.getByTestId('submit-add-issue').click();

    await expect(page.getByTestId('add-issue-modal')).toBeHidden();

    // Issue count should have increased
    const newCount = page.locator('[data-testid^="issue-card-"]');
    await expect(newCount).toHaveCount(initialCardCount + 1);
  });

  test('should not create issue without title', async ({ page }) => {
    await page.getByTestId('create-issue-btn').click();
    const submitBtn = page.getByTestId('submit-add-issue');
    await expect(submitBtn).toBeDisabled();
  });

  test('should cancel issue creation', async ({ page }) => {
    await page.getByTestId('create-issue-btn').click();
    await page.getByTestId('new-issue-title-input').locator('input').fill('Cancelled Issue');
    await page.getByTestId('cancel-add-issue').click();
    await expect(page.getByTestId('add-issue-modal')).toBeHidden();
  });
});
