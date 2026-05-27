import { defineStore } from "pinia";
import type { Story, StoryType } from "../../../shared/types/story";
import { shallowRef, ref, computed, markRaw, watch } from "vue";
import {
  getStoryIds,
  getStoriesByIds,
  searchStoriesByQuery,
} from "../api/storyApi";
import { useFiltersStore } from "../../../features/filters/model/useFiltersStore";

export const useStoriesStore = defineStore("stories", () => {
  const filtersStore = useFiltersStore();
  const stories = shallowRef<Story[]>([]);
  const allIds = shallowRef<number[]>([]);
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);
  const currentType = ref<StoryType>("top");
  const page = ref<number>(0);
  const pageSize = 20;
  const hasMore = computed(() => page.value * pageSize < allIds.value.length);
  const searchPage = ref<number>(0);
  const searchNbPages = ref<number>(0);
  const searchHasMore = computed(
    () => searchPage.value < searchNbPages.value - 1,
  );

  const isSearchMode = computed(
    () => filtersStore.searchQuery.trim().length > 0,
  );
  const canLoadMore = computed(() =>
    isSearchMode.value ? searchHasMore.value : hasMore.value,
  );

  const totalLoaded = computed(() => stories.value.length);

  async function fetchIds(type: StoryType) {
    isLoading.value = true;
    isError.value = false;
    try {
      currentType.value = type;
      allIds.value = markRaw(await getStoryIds(type));
      stories.value = [];
      page.value = 0;
      await _loadNextPage();
    } catch {
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  async function _loadNextPage() {
    if (!hasMore.value) return;
    const start = page.value * pageSize;
    const ids = allIds.value.slice(start, start + pageSize);
    const newStories = await getStoriesByIds(ids);
    stories.value = markRaw([...stories.value, ...newStories]);
    page.value++;
  }

  async function fetchByQuery(query: string, reset = true) {
    isLoading.value = true;
    isError.value = false;
    try {
      if (reset) {
        stories.value = [];
        searchPage.value = 0;
      }
      const { stories: found, nbPages } = await searchStoriesByQuery(
        query,
        searchPage.value,
      );
      stories.value = reset
        ? markRaw(found)
        : markRaw([...stories.value, ...found]);
      searchNbPages.value = nbPages;
    } catch {
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  async function loadMore() {
    if (!canLoadMore.value || isLoading.value) return;
    isLoading.value = true;
    try {
      if (isSearchMode.value) {
        searchPage.value++;
        await fetchByQuery(filtersStore.searchQuery.trim(), false);
      } else {
        await _loadNextPage();
      }
    } catch {
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  watch(
    () => filtersStore.searchQuery,
    async (query) => {
      const q = query.trim();
      if (q) {
        await fetchByQuery(q);
      } else {
        await fetchIds(currentType.value);
      }
    },
  );

  return {
    stories,
    isLoading,
    isError,
    currentType,
    canLoadMore,
    totalLoaded,
    fetchIds,
    loadMore,
  };
});
