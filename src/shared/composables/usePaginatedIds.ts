export function usePaginatedIds<T>(
  getIds: () => number[],
  fetchFn: (ids: number[]) => Promise<T[]>,
  pageSize = 10,
) {
  const page = ref(0);
  const items = shallowRef<T[]>([]);
  const isLoading = ref(false);

  const allIds = computed(getIds);
  const hasMore = computed(() => page.value * pageSize < allIds.value.length);

  async function loadMore() {
    if (!hasMore.value || isLoading.value) return;
    isLoading.value = true;
    const start = page.value * pageSize;
    const ids = allIds.value.slice(start, start + pageSize);
    const loaded = await fetchFn(ids);
    items.value = [...items.value, ...loaded];
    page.value++;
    isLoading.value = false;
  }

  return { items, isLoading, hasMore, allIds, loadMore };
}
