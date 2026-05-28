import { type Page, test, expect } from '@playwright/test'
import type { Story } from '../../src/shared/types/story'

const mockStory: Story = {
  id: 42,
  title: 'E2E Test Story',
  by: 'tester',
  time: Math.floor(Date.now() / 1000),
  score: 100,
  type: 'story',
}

async function waitForVue(page: Page) {
  await page.waitForLoadState('networkidle')
}

test.describe('Bookmarks', () => {
  test('empty state shown when no bookmarks', async ({ page }) => {
    await page.goto('/bookmarks')
    await waitForVue(page)
    await expect(page.getByText('No bookmarks yet')).toBeVisible()
  })

  test('bookmarks page shows stories from localStorage', async ({ page }) => {
    await page.goto('/')
    await waitForVue(page)
    await page.evaluate((story) => {
      localStorage.setItem('bookmarks', JSON.stringify([story]))
    }, mockStory)

    await page.goto('/bookmarks')
    await waitForVue(page)
    await expect(page.locator('.storyCard')).toHaveCount(1)
    await expect(page.getByText(mockStory.title)).toBeVisible()
  })

  test('removing bookmark from localStorage clears bookmarks page', async ({ page }) => {
    await page.goto('/')
    await waitForVue(page)
    await page.evaluate((story) => {
      localStorage.setItem('bookmarks', JSON.stringify([story]))
    }, mockStory)

    await page.goto('/bookmarks')
    await waitForVue(page)
    await expect(page.locator('.storyCard')).toHaveCount(1)

    await page.evaluate(() => localStorage.removeItem('bookmarks'))
    await page.reload()
    await waitForVue(page)
    await expect(page.getByText('No bookmarks yet')).toBeVisible()
  })

  test('bookmark button on story card writes to localStorage', async ({ page }) => {
    await page.goto('/')
    await waitForVue(page)
    await page.waitForSelector('.storyCardBookmark')

    await page.locator('.storyCardBookmark').first().click()

    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const saved = localStorage.getItem('bookmarks')
            return saved ? JSON.parse(saved).length : 0
          }),
        { timeout: 5000 },
      )
      .toBe(1)
  })
})
