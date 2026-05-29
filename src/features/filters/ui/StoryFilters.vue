<script setup lang="ts">
import { markRaw } from 'vue'
import type { StoryType } from '../../../shared/types/story'

const { t } = useI18n()
const filtersStore = useFiltersStore()
const storiesStore = useStoriesStore()

const FILTER_TYPES = markRaw<StoryType[]>(['top', 'new', 'best'])

async function select(type: StoryType) {
  filtersStore.setType(type)
  await storiesStore.fetchIds(type)
}
</script>

<template>
  <div class="storyFilters">
    <button
      v-for="type in FILTER_TYPES"
      :key="type"
      class="storyFiltersBtn"
      :class="{ storyFiltersBtnActive: filtersStore.isActive(type) }"
      @click="select(type)"
    >
      {{ t(`filters.${type}`) }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.storyFilters {
  display: flex;
  gap: 4px;
}

.storyFiltersBtn {
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition:
    color 0.15s,
    background 0.15s,
    border-color 0.15s;

  &:hover {
    color: var(--text);
    border-color: var(--text-muted);
  }
}

.storyFiltersBtnActive {
  background: var(--accent);
  border-color: var(--accent);
  color: #1a1a1a;

  &:hover {
    color: #1a1a1a;
    border-color: var(--accent);
  }
}
</style>
