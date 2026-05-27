import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { StoryType } from "../../../shared/types/story";

export const useFiltersStore = defineStore("filters", () => {
  const activeType = ref<StoryType>("top");
  const searchQuery = ref<string>("");

  const hasSearch = computed<boolean>(
    () => searchQuery.value.trim().length > 0,
  );
  const isActive = (type: StoryType): boolean => activeType.value === type;

  function setType(type: StoryType): void {
    activeType.value = type;
  }

  function setSearch(query: string): void {
    searchQuery.value = query;
  }

  function reset(): void {
    activeType.value = "top";
    searchQuery.value = "";
  }

  return {
    activeType,
    searchQuery,
    hasSearch,
    isActive,
    setType,
    setSearch,
    reset,
  };
});
