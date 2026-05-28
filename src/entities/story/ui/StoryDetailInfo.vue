<script setup lang="ts">
import type { Story } from "../../../shared/types/story";
import { timeAgo } from "../../../shared/lib/time";

const props = defineProps<{ story: Story }>();

const { t } = useI18n();
const bookmarksStore = useBookmarksStore();

const avatarLetter = computed(() => props.story.by?.[0]?.toUpperCase() ?? "?");
const isBookmarked = computed(() => bookmarksStore.isBookmarked(props.story.id));
const isBookmarkTouched = ref(false);
</script>

<template>
  <div class="storyDetailInfo">
    <div class="storyDetailInfoAvatar">{{ avatarLetter }}</div>

    <div class="storyDetailInfoBody">
      <span class="storyDetailInfoAuthor">{{ story.by }}</span>

      <span class="storyDetailInfoMeta">
        {{ timeAgo(story.time) }}
        · {{ story.score }} pts
        <template v-if="story.descendants != null">
          · {{ story.descendants }} comments
        </template>
      </span>

      <NuxtLink
        v-if="story.url"
        :to="story.url"
        target="_blank"
        rel="noopener noreferrer"
        class="storyDetailInfoLink"
      >
        {{ t("story.readOriginal") }} ↗
      </NuxtLink>
    </div>

    <button
      class="storyDetailInfoBookmark"
      :class="{ storyDetailInfoBookmarkActive: isBookmarked, storyDetailInfoBookmarkTouched: isBookmarkTouched }"
      :aria-label="t(isBookmarked ? 'story.bookmarkRemove' : 'story.bookmarkAdd')"
      @click="isBookmarked ? bookmarksStore.removeBookmark(story.id) : bookmarksStore.addBookmark(story)"
      @touchstart="isBookmarkTouched = true"
      @touchend="isBookmarkTouched = false"
      @touchcancel="isBookmarkTouched = false"
    >
      <span class="storyDetailInfoBookmarkIcon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.storyDetailInfo {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.storyDetailInfoAvatar {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.storyDetailInfoBody {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.storyDetailInfoAuthor {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.storyDetailInfoMeta {
  font-size: 12px;
  color: var(--text-muted);
}

.storyDetailInfoLink {
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  align-self: flex-start;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.75;
  }
}

.storyDetailInfoBookmark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.15s;

  &:hover, &.storyDetailInfoBookmarkTouched { transform: scale(1.25); }
}

.storyDetailInfoBookmarkIcon {
  display: block;
  width: 16px;
  height: 16px;
  background-color: var(--text-muted);
  mask: url('/icons/bookmark.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/bookmark.svg') center / contain no-repeat;
  transition: background-color 0.15s;
}

.storyDetailInfoBookmarkActive .storyDetailInfoBookmarkIcon {
  background-color: var(--accent);
}
</style>
