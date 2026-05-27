<script setup lang="ts">
import type { Story } from "../../../shared/types/story";
import { timeAgo } from "../../../shared/lib/time";

const props = defineProps<{
  story: Story;
  index: number;
}>();

const num = computed(() => String(props.index + 1).padStart(2, "0"));
const isTouched = ref<boolean>(false);
</script>

<template>
  <NuxtLink
    :to="`/story/${story.id}`"
    class="storyCard"
    :class="{ storyCardTouched: isTouched }"
    @touchstart="isTouched = true"
    @touchend="isTouched = false"
    @touchcancel="isTouched = false"
  >
    <span class="storyCardIndex">{{ num }}</span>
    <div class="storyCardContent">
      <span class="storyCardTitle">{{ story.title }}</span>
      <p class="storyCardMeta">
        {{ story.by }}
        · {{ timeAgo(story.time) }} · {{ story.score }} pts
        <span v-if="story.descendants != null" class="storyCardComments">
          · {{ story.descendants }}
          <NuxtImg
            src="/icons/comment.svg"
            alt="comments"
            class="storyCardCommentIcon"
          />
        </span>
      </p>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.storyCard {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover .storyCardTitle,
  &.storyCardTouched .storyCardTitle {
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
