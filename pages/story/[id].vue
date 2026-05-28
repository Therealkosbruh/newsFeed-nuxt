<script setup lang="ts">
import { getStoryById } from '../../src/entities/story/api/storyApi'

const { t } = useI18n()
const route = useRoute()
const id = Number(route.params.id)

const { data: story, error, pending } = await useAsyncData(`story-${id}`, () => getStoryById(id))

const metaDescription = computed(() =>
  story.value
    ? `${story.value.score} pts by ${story.value.by} · ${story.value.descendants ?? 0} comments`
    : undefined,
)

useSeoMeta({
  title: () => (story.value ? `${story.value.title} - HN Reader` : 'HN Reader'),
  description: metaDescription,
  ogTitle: () => story.value?.title ?? 'HN Reader',
  ogDescription: metaDescription,
})
</script>

<template>
  <div class="storyPage">
    <div v-if="pending" class="storyPageSkeleton">
      <Skeleton height="20px" width="60px" border-radius="8px" />
      <Skeleton height="52px" border-radius="8px" />
      <Skeleton height="96px" border-radius="8px" />
    </div>

    <Message v-else-if="error || !story" severity="error" :closable="false">
      {{ t('story.error') }}
    </Message>

    <template v-else>
      <NuxtLink to="/" class="storyPageBack">
        <NuxtImg src="/icons/arrowBack.svg" class="storyPageBackIcon" alt="" />
        {{ t('story.back') }}
      </NuxtLink>

      <StoryDetailHead :title="story.title" />

      <StoryDetailInfo :story="story" />

      <article class="storyPageBody">
        <Suspense>
          <StoryArticle :story="story" />

          <template #fallback>
            <div class="storyPageParsing">
              <Skeleton v-for="i in 6" :key="i" height="18px" border-radius="4px" />
            </div>
          </template>
        </Suspense>

        <StoryComments :child="story.kids" />
      </article>
    </template>
  </div>
</template>

<style scoped lang="scss">
.storyPage {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.storyPageSkeleton {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.storyPageBack {
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: var(--text);
  }
}

.storyPageBackIcon {
  width: 18px;
  height: 18px;
  filter: invert(75%) sepia(0%) saturate(0%) brightness(90%);
}

.storyPageBody {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.storyPageParsing {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
</style>
