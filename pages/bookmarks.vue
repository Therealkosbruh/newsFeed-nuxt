<script setup lang="ts">
const { t } = useI18n()
const bookmarksStore = useBookmarksStore()
</script>

<template>
  <FeedHeader
    title-key="bookmarks.title"
    highlight-key="bookmarks.titleHighlight"
    description-key="bookmarks.description"
  />

  <EmptyState
    v-if="!bookmarksStore.bookmarks.length"
    svg-icon="/icons/bookmark.svg"
    :title="t('bookmarks.empty')"
    :description="t('bookmarks.emptyDescription')"
  />

  <div v-else class="bookmarksFeed">
    <StoryCard
      v-for="(story, index) in bookmarksStore.bookmarks"
      :key="story.id"
      :story="story"
      :index="index"
    />
  </div>
</template>

<style scoped lang="scss">
.bookmarksFeed {
  display: flex;
  flex-direction: column;
}
</style>
