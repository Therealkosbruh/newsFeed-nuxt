<script setup lang="ts">
import { getCommentsByIds } from "../../entities/comment/api/commentApi";

const props = defineProps<{ child?: number[] }>();

const { t } = useI18n();

const {
  items: comments,
  isLoading,
  hasMore,
  allIds,
  loadMore,
} = usePaginatedIds(() => props.child ?? [], getCommentsByIds);

await loadMore();

useInfiniteScroll(() => {
  if (hasMore.value && !isLoading.value) loadMore();
});
</script>

<template>
  <section class="storyComments">
    <h2 class="storyCommentsTitle">{{ t("story.comments") }}</h2>

    <p v-if="!allIds.length" class="storyCommentsEmpty">
      {{ t("story.noComments") }}
    </p>

    <div v-else class="storyCommentsList">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />

      <div ref="sentinel" class="storyCommentsSentinel" />

      <div v-if="isLoading" class="storyCommentsLoader">
        <NuxtImg
          src="/icons/loader.svg"
          alt="loading"
          class="storyCommentsLoaderIcon"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.storyComments {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.storyCommentsTitle {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
}

.storyCommentsEmpty {
  font-size: 14px;
  color: var(--text-muted);
}

.storyCommentsList {
  display: flex;
  flex-direction: column;
}

.storyCommentsSentinel {
  height: 1px;
}

.storyCommentsLoader {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.storyCommentsLoaderIcon {
  width: 28px;
  height: 28px;
  filter: invert(75%) sepia(0%) saturate(0%) brightness(90%);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
