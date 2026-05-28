<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('home.meta.title'),
  description: () => t('home.meta.description'),
  ogTitle: () => t('home.meta.title'),
  ogDescription: () => t('home.meta.description'),
})
</script>

<template>
  <FeedHeader />
  <StoriesToolbar />
  <StoriesList />
</template>
