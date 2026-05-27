<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";

const { t } = useI18n();
const storiesStore = useStoriesStore();
const filtersStore = useFiltersStore();

const isEmpty = computed(
  () => !storiesStore.isLoading && storiesStore.stories.length === 0,
);

const { pending, error } = useAsyncData("stories", () =>
  storiesStore.fetchIds(filtersStore.activeType),
);

const sentinel = useTemplateRef<HTMLElement>("sentinel");

useIntersectionObserver(sentinel, ([entry]) => {
  if (
    entry?.isIntersecting &&
    storiesStore.canLoadMore &&
    !storiesStore.isLoading
  ) {
    storiesStore.loadMore();
  }
});
</script>

<template>
  <div class="storiesList">
    <div v-if="pending" class="storiesListSkeleton">
      <Skeleton v-for="i in 8" :key="i" height="72px" border-radius="8px" />
    </div>

    <Message v-else-if="error" severity="error" :closable="false">
      {{ t("errors.loadFailed") }}: {{ error.message }}
    </Message>

    <div v-else class="storiesListFeed">
      <EmptyState
        v-if="isEmpty && filtersStore.searchQuery"
        svg-icon="/icons/searchError.svg"
        :title="t('home.emptyListSearchMessage.title')"
        :description="t('home.emptyListSearchMessage.description')"
      />

      <template v-else>
        <StoryCard
          v-for="(story, index) in storiesStore.stories"
          :key="story.id"
          :story="story"
          :index="index"
        />
      </template>

      <div ref="sentinel" class="storiesListSentinel" />

      <div v-if="storiesStore.isLoading" class="storiesListLoader">
        <NuxtImg
          src="/icons/loader.svg"
          alt="loading"
          class="storiesListLoaderIcon"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.storiesListSkeleton {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.storiesListFeed {
  display: flex;
  flex-direction: column;
}

.storiesListSentinel {
  height: 1px;
}

.storiesListLoader {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

.storiesListLoaderIcon {
  width: 32px;
  height: 32px;
  filter: invert(75%) sepia(0%) saturate(0%) brightness(90%);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
