import { expect, test, type Page } from '@playwright/test';

async function assertInteractiveElementsHaveTestId(page: Page, scope = 'body') {
  const missing = await page.locator(scope).evaluateAll((roots) => {
    const root = roots[0] as HTMLElement | undefined;
    if (!root) return [] as string[];

    const selectors = [
      'button',
      'a[href]',
      'input',
      'textarea',
      '[role="button"]',
      '[role="link"]',
      '[role="textbox"]',
      '[role="combobox"]',
      '[role="menuitem"]',
    ].join(',');

    const nodes = Array.from(root.querySelectorAll<HTMLElement>(selectors));

    return nodes
      .filter((el) => {
        const style = window.getComputedStyle(el);
        const hidden =
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          el.getAttribute('aria-hidden') === 'true';
        if (hidden) return false;

        if (el.closest('.ql-toolbar') || el.closest('.ql-container')) return false;
        if (el.closest('[role="presentation"]') && !el.closest('[data-testid]')) return false;

        return true;
      })
      .filter((el) => !el.closest('[data-testid]') && !el.getAttribute('data-testid'))
      .map((el) => {
        const role = el.getAttribute('role') || el.tagName.toLowerCase();
        const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
        return `${role}:${text || '(no text)'}`;
      });
  });

  expect(missing, `Missing data-testid attribution in scope ${scope}`).toEqual([]);
}

test.describe('UI Element TestId Coverage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/project/board');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.getByTestId('board-page')).toBeVisible();
  });

  test('board page should expose testids for all visible interactive controls', async ({
    page,
  }) => {
    await expect(page.getByTestId('board-page')).toBeVisible();
    await assertInteractiveElementsHaveTestId(page, 'body');
  });

  test('search drawer should expose testids for all visible interactive controls', async ({
    page,
  }) => {
    await page.getByTestId('search-btn').first().click();
    await expect(page.getByTestId('search-drawer')).toBeVisible();
    await assertInteractiveElementsHaveTestId(page, '[data-testid="search-drawer"]');
  });

  test('create issue modal should expose testids for all visible interactive controls', async ({
    page,
  }) => {
    await page.getByTestId('create-issue-btn').first().click();
    await expect(page.getByTestId('add-issue-modal')).toBeVisible();
    await assertInteractiveElementsHaveTestId(page, '[data-testid="add-issue-modal"]');
  });

  test('issue modal should expose testids for all visible interactive controls', async ({
    page,
  }) => {
    await page.locator('[data-testid^="issue-card-"]').first().click();
    const modal = page.locator('[data-testid^="issue-modal-"]').first();
    await expect(modal).toBeVisible();
    await assertInteractiveElementsHaveTestId(page, '[data-testid^="issue-modal-"]');
  });

  test('settings page should expose testids for all visible interactive controls', async ({
    page,
  }) => {
    await page.getByTestId('nav-link-project-settings').click();
    await expect(page.getByTestId('settings-page')).toBeVisible();
    await assertInteractiveElementsHaveTestId(page, '[data-testid="settings-page"]');
  });
});

test.describe('Critical UI Controls Presence', () => {
  test('board and nav controls should all be visible', async ({ page }) => {
    await page.goto('/project/board');

    const requiredTestIds = [
      'navbar-left',
      'sidebar',
      'nav-link-kanban-board',
      'nav-link-project-settings',
      'board-page',
      'board-filter',
      'board-search-input',
      'only-my-issues-btn',
      'ignore-resolved-btn',
      'board-dnd',
      'search-btn',
      'create-issue-btn',
    ];

    for (const testId of requiredTestIds) {
      await expect(page.getByTestId(testId).first(), `Missing ${testId}`).toBeVisible();
    }

    await expect(page.locator('[data-testid^="board-column-"]')).toHaveCount(4);
    await expect(page.locator('[data-testid^="issue-card-"]').first()).toBeVisible();
  });

  test('issue detail controls should all be visible and actionable', async ({ page }) => {
    await page.goto('/project/board');
    await page.locator('[data-testid^="issue-card-"]').first().click();

    const modal = page.locator('[data-testid^="issue-modal-"]').first();
    await expect(modal).toBeVisible();

    const controls = [
      '[data-testid^="issue-type-select-"]',
      '[data-testid^="issue-status-"]',
      '[data-testid^="issue-priority-"]',
      '[data-testid^="issue-reporter-"]',
      '[data-testid^="issue-assignees-"]',
      '[data-testid^="add-assignee-"]',
      '[data-testid^="add-comment-btn-"]',
      '[data-testid^="copy-link-"]',
      '[data-testid^="delete-issue-btn-"]',
      '[data-testid^="close-issue-"]',
    ];

    for (const selector of controls) {
      await expect(page.locator(selector).first(), `Missing ${selector}`).toBeVisible();
    }
  });
});
