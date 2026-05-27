<script setup lang="ts">
import { effectScope } from "vue";
import { useDebouncedRef } from "../../../shared/composables/useDebouncedRef";

const { t } = useI18n();
const filtersStore = useFiltersStore();

const inputValue = ref<string>("");
const debouncedSearch = useDebouncedRef("", 400);

const scope = effectScope();

scope.run(() => {
  watch(inputValue, (val) => {
    debouncedSearch.value = val;
  });

  watch(debouncedSearch, (val) => {
    filtersStore.setSearch(val);
  });
});

onUnmounted(() => scope.stop());
</script>

<template>
  <div class="storySearch">
    <input
      v-model="inputValue"
      class="storySearchInput"
      type="search"
      :placeholder="t('search.placeholder')"
    />
  </div>
</template>

<style scoped lang="scss">
.storySearch {
  flex: 1;
}

.storySearchInput {
  width: 100%;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 400;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  outline: none;
  transition: border-color 0.15s;

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--text-muted);
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
}
</style>
