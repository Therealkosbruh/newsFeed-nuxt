<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <h1 class="storyDetailHeadTitle">{{ title }}</h1>
</template>

<style scoped lang="scss">
.storyDetailHeadTitle {
  font-size: 42px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.04em;
  line-height: 1.1;

  @media (max-width: 600px) {
    font-size: 28px;
  }
}
</style>
