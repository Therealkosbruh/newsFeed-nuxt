<script setup lang="ts">
import type { Story } from "../../../shared/types/story";

const props = defineProps<{ story: Story }>();
const { t } = useI18n();

const content = ref<string | null>(props.story.text ?? null);

if (props.story.url && !content.value) {
  try {
    const result = await $fetch<{ content: string | null }>(
      `/api/parse?url=${encodeURIComponent(props.story.url)}`,
    );
    content.value = result.content;
  } catch {
    content.value = null;
  }
}
</script>

<template>
  <div class="storyArticle">
    <ArticleContent v-if="content" :content="content" />
    <EmptyState
      v-else
      svg-icon="/icons/sad.svg"
      :title="t('story.noContent')"
      :description="t('story.noContentHint')"
    />
  </div>
</template>

<style scoped lang="scss">
.storyArticle {
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
</style>
