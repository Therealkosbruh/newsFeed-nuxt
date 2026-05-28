import type { Story } from '../../../shared/types/story'

export const useBookmarksStore = defineStore('bookmarks', () => {
  const stored = import.meta.client ? localStorage.getItem('bookmarks') : null
  const bookmarks = shallowRef<Story[]>(stored ? JSON.parse(stored) : [])

  watch(bookmarks, (val) => {
    if (import.meta.client) localStorage.setItem('bookmarks', JSON.stringify(val))
  })

  function addBookmark(story: Story) {
    if (!bookmarks.value.some(s => s.id === story.id)) {
      bookmarks.value = [story, ...bookmarks.value]
    }
  }

  function removeBookmark(id: number) {
    bookmarks.value = bookmarks.value.filter(s => s.id !== id)
  }

  function isBookmarked(id: number): boolean {
    return bookmarks.value.some(s => s.id === id)
  }

  return { bookmarks, addBookmark, removeBookmark, isBookmarked }
})
