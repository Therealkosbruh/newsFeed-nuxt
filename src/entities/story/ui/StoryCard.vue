<script setup lang="ts">
import type { Story } from '../../../shared/types/story'
import { timeAgo } from '../../../shared/lib/time'

const props = defineProps<{
  story: Story
  index: number
}>()

const { t } = useI18n()
const num = computed(() => String(props.index + 1).padStart(2, '0'))
const isTouched = ref<boolean>(false)

const bookmarksStore = useBookmarksStore()
const isBookmarked = computed(() => bookmarksStore.isBookmarked(props.story.id))
const isBookmarkTouched = ref(false)
</script>

<template>
  <div
    class="storyCard"
    :class="{ storyCardTouched: isTouched }"
    @touchstart="isTouched = true"
    @touchend="isTouched = false"
    @touchcancel="isTouched = false"
  >
    <NuxtLink :to="`/story/${story.id}`" class="storyCardLink">
      <span class="storyCardIndex">{{ num }}</span>
      <div class="storyCardContent">
        <span class="storyCardTitle">{{ story.title }}</span>
        <p class="storyCardMeta">
          {{ story.by }}
          · {{ timeAgo(story.time) }} · {{ story.score }} pts
          <span v-if="story.descendants != null" class="storyCardComments">
            · {{ story.descendants }}
            <NuxtImg src="/icons/comment.svg" alt="comments" class="storyCardCommentIcon" />
          </span>
        </p>
      </div>
    </NuxtLink>

    <button
      class="storyCardBookmark"
      :class="{
        storyCardBookmarkActive: isBookmarked,
        storyCardBookmarkTouched: isBookmarkTouched,
      }"
      :aria-label="t(isBookmarked ? 'story.bookmarkRemove' : 'story.bookmarkAdd')"
      @click="
        isBookmarked ? bookmarksStore.removeBookmark(story.id) : bookmarksStore.addBookmark(story)
      "
      @touchstart="isBookmarkTouched = true"
      @touchend="isBookmarkTouched = false"
      @touchcancel="isBookmarkTouched = false"
    >
      <span class="storyCardBookmarkIcon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.storyCard {
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: none;
  }

  &.storyCardTouched .storyCardTitle {
    color: var(--accent);
  }
}

.storyCardLink {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
  min-width: 0;
  text-decoration: none;
  cursor: pointer;

  &:hover .storyCardTitle {
    color: var(--accent);
  }
}

.storyCardIndex {
  flex-shrink: 0;
  width: 28px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  padding-top: 2px;
  font-variant-numeric: tabular-nums;
}

.storyCardContent {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.storyCardBookmark {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  align-self: center;
  transition: transform 0.15s;

  &:hover,
  &.storyCardBookmarkTouched {
    transform: scale(1.25);
  }
}

.storyCardBookmarkIcon {
  display: block;
  width: 14px;
  height: 14px;
  background-color: var(--text-muted);
  mask: url('/icons/bookmark.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/bookmark.svg') center / contain no-repeat;
  transition: background-color 0.15s;
}

.storyCardBookmarkActive .storyCardBookmarkIcon {
  background-color: var(--accent);
}

.storyCardTitle {
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.4;
  transition: color 0.15s;
}

.storyCardMeta {
  font-size: 12px;
  color: var(--text-muted);
}

.storyCardComments {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.storyCardCommentIcon {
  width: 16px;
  height: 16px;
  filter: invert(75%) sepia(0%) saturate(0%) brightness(90%);
  vertical-align: middle;
}
</style>
