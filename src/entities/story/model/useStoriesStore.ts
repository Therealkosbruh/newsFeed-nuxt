import { defineStore } from "pinia";
import type { Story, StoryType } from "../../../shared/types/story";
import { shallowRef, ref, computed, markRaw } from "vue";
import { getStoryIds, getStoriesByIds } from "../api/storyApi";

export const useStoriesStore = defineStore('stories', () => {
  const stories = shallowRef<Story[]>([]);
  const allIds = shallowRef<number[]>([])

  const isLoading = ref(false)
  const isError = ref(false)
  const currentType = ref<StoryType>('top')
  const page = ref(0)
  const pageSize = 20

  const hasMore = computed(() => page.value * pageSize < allIds.value.length)
  const totalLoaded = computed(() => stories.value.length)

  async function fetchIds(type: StoryType) {
    isLoading.value = true
    isError.value = false
    try {
      currentType.value = type
      allIds.value = markRaw(await getStoryIds(type))
      stories.value = []
      page.value = 0
      await loadMore()
    } catch {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function loadMore() {
    if (!hasMore.value) return
    isLoading.value = true
    try {
      const start = page.value * pageSize
      const end = start + pageSize
      const ids = allIds.value.slice(start, end)
      const newStories = await getStoriesByIds(ids)
      stories.value = markRaw([...stories.value, ...newStories])
      page.value++
    } catch {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    stories,
    isLoading,
    isError,
    currentType,
    hasMore,
    totalLoaded,
    fetchIds,
    loadMore
  }
})