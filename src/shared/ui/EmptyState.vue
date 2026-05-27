<script setup lang="ts">
defineProps<{
  svgIcon: string;
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="emptyState">
    <NuxtImg :src="svgIcon" class="emptyStateIcon" alt="" />
    <p class="emptyStateTitle">{{ title }}</p>
    <p v-if="description" class="emptyStateDescription">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 64px 0;
}

.emptyStateIcon {
  width: 48px;
  height: 48px;
  filter: invert(65%) sepia(0%) saturate(0%) brightness(85%);
  margin-bottom: 4px;
}

.emptyStateTitle {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-muted);
}

.emptyStateDescription {
  font-size: 13px;
  color: var(--text-muted);
  opacity: 0.7;
}
</style>
