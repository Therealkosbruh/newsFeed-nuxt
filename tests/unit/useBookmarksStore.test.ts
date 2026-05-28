import { describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBookmarksStore } from '../../src/features/bookmarks/model/useBookmarksStore'
import type { Story } from '../../src/shared/types/story'

const mockStory: Story = {
  id: 1,
  title: 'Test Story',
  by: 'testuser',
  time: 1700000000,
  score: 100,
  type: 'story',
}

function createStore() {
  localStorage.clear()
  setActivePinia(createPinia())
  return useBookmarksStore()
}

describe('useBookmarksStore', () => {
  it('starts empty', () => {
    const store = createStore()
    expect(store.bookmarks).toHaveLength(0)
    expect(store.hasBookmarks).toBe(false)
  })

  it('adds a bookmark', () => {
    const store = createStore()
    store.addBookmark(mockStory)
    expect(store.bookmarks).toHaveLength(1)
    expect(store.isBookmarked(mockStory.id)).toBe(true)
    expect(store.count).toBe(1)
  })

  it('does not add duplicate', () => {
    const store = createStore()
    store.addBookmark(mockStory)
    store.addBookmark(mockStory)
    expect(store.bookmarks).toHaveLength(1)
  })

  it('removes a bookmark', () => {
    const store = createStore()
    store.addBookmark(mockStory)
    store.removeBookmark(mockStory.id)
    expect(store.bookmarks).toHaveLength(0)
    expect(store.isBookmarked(mockStory.id)).toBe(false)
  })

  it('persists to localStorage', () => {
    const store = createStore()
    store.addBookmark(mockStory)
    const saved = JSON.parse(localStorage.getItem('bookmarks') ?? '[]')
    expect(saved).toHaveLength(1)
    expect(saved[0].id).toBe(mockStory.id)
  })
})
