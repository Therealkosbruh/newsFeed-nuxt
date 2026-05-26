<script setup lang="ts">
defineProps<{
  height?: string
  borderRadius?: string
}>()
</script>

<template>
  <div
    class="skeletonItem"
    :style="{
      height: height ?? '72px',
      borderRadius: borderRadius ?? '8px'
    }"
  />
</template>

<style scoped>
.skeletonItem {
  background: linear-gradient(
    90deg,
    var(--border) 25%,
    color-mix(in srgb, var(--border) 50%, var(--bg)) 50%,
    var(--border) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
