<script setup lang="ts">
const storiesStore = useStoriesStore()
const filtersStore = useFiltersStore()

const { pending, error } = useAsyncData(
  'stories',
  () => storiesStore.fetchIds(filtersStore.activeType)
)
</script>

<template>
  <div class="storiesList">

    <div v-if="pending" class="storiesListSkeleton">
      <Skeleton v-for="i in 8" :key="i" height="72px" border-radius="8px" />
    </div>

    <Message v-else-if="error" severity="error" :closable="false">
      Failed to load stories: {{ error.message }}
    </Message>

    <template v-else>
      <div
        v-for="story in storiesStore.stories"
        :key="story.id"
        class="storiesListItem"
      >
        {{ story.title }}
      </div>
    </template>

  </div>
</template>

<style scoped lang="scss">
.storiesListSkeleton {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
