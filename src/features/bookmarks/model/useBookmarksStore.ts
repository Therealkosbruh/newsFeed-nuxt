import { defineStore } from 'pinia'
import { shallowRef, computed, markRaw } from 'vue'
import type { Story } from '../../../shared/types/story'

export const useBookmarksStore = defineStore('bookmarks', () => {
  const bookmarks = shallowRef<Story[]>([])
  const count = computed<number>(() => bookmarks.value.length)
  const hasBookmarks = computed<boolean>(() => bookmarks.value.length > 0)
  const isBookmarked = (id: number): boolean => bookmarks.value.some((s) => s.id === id)

  function addBookmark(story: Story): void {
    if (isBookmarked(story.id)) return
    bookmarks.value = markRaw([...bookmarks.value, story])
    persist()
  }

  function removeBookmark(id: number): void {
    bookmarks.value = markRaw(bookmarks.value.filter((s) => s.id !== id))
    persist()
  }

  function persist(): void {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
  }

  function hydrate(): void {
    const saved = localStorage.getItem('bookmarks')
    if (saved) {
      bookmarks.value = markRaw(JSON.parse(saved))
    }
  }

  if (import.meta.client) hydrate()

  return {
    bookmarks,
    count,
    hasBookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    hydrate,
  }
})
