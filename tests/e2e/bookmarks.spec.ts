import { test, expect } from '@playwright/test'

test.describe('Bookmarks', () => {
  test('empty state shown when no bookmarks', async ({ page }) => {
    await page.goto('/bookmarks')
    await expect(page.getByText('No bookmarks yet')).toBeVisible()
  })

  test('bookmark added from feed and appears on bookmarks page', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.storyCard')

    const firstBookmark = page.locator('.storyCardBookmark').first()
    await firstBookmark.click()

    await page.goto('/bookmarks')
    await expect(page.locator('.storyCard')).toHaveCount(1)
  })

  test('bookmark removed on second click', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.storyCard')

    const firstBookmark = page.locator('.storyCardBookmark').first()
    await firstBookmark.click()
    await firstBookmark.click()

    await page.goto('/bookmarks')
    await expect(page.getByText('No bookmarks yet')).toBeVisible()
  })
})
