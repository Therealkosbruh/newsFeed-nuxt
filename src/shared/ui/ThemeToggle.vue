<script setup lang="ts">
const props = defineProps<{ isDark: boolean }>();
const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <button
    class="themeToggle"
    :class="{ on: isDark }"
    :aria-pressed="isDark"
    aria-label="Toggle theme"
    @click="emit('toggle')"
  >
    <svg viewBox="0 0 24 24" fill="none">
      <defs>
        <mask id="morph-mask">
          <rect width="24" height="24" fill="white" />
          <circle class="themeToggleCut" r="8" fill="black" />
        </mask>
      </defs>
      <circle
        class="themeToggleBody"
        cx="12"
        cy="12"
        fill="currentColor"
        mask="url(#morph-mask)"
      />
      <g
        class="themeToggleRays"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      >
        <line x1="12" y1="1" x2="12" y2="3.5" />
        <line x1="12" y1="20.5" x2="12" y2="23" />
        <line x1="1" y1="12" x2="3.5" y2="12" />
        <line x1="20.5" y1="12" x2="23" y2="12" />
        <line x1="4" y1="4" x2="5.8" y2="5.8" />
        <line x1="18.2" y1="18.2" x2="20" y2="20" />
        <line x1="4" y1="20" x2="5.8" y2="18.2" />
        <line x1="18.2" y1="5.8" x2="20" y2="4" />
      </g>
    </svg>
  </button>
</template>

<style scoped>
.themeToggle {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  background: var(--bg);
  cursor: pointer;
  color: #e85d3a;
  transition:
    background 0.45s ease,
    border-color 0.45s ease,
    color 0.45s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(24, 24, 27, 0.06);
  }

  &.on {
    color: #fafaf7;
    background: #18181b;
    border-color: #27272a;
  }

  svg {
    width: 22px;
    height: 22px;
    overflow: visible;
  }
}

.themeToggleBody {
  r: 5;
  transition: r 0.5s cubic-bezier(0.5, 1.4, 0.4, 1);

  .themeToggle.on & {
    r: 8;
  }
}

.themeToggleCut {
  cx: 40;
  cy: -6;
  transition:
    cx 0.55s cubic-bezier(0.5, 1.4, 0.4, 1),
    cy 0.55s cubic-bezier(0.5, 1.4, 0.4, 1);

  .themeToggle.on & {
    cx: 18;
    cy: 8;
  }
}

.themeToggleRays {
  transform-origin: 12px 12px;
  transform-box: view-box;
  opacity: 1;
  transition:
    transform 0.45s cubic-bezier(0.5, 1.5, 0.4, 1),
    opacity 0.25s ease;

  .themeToggle.on & {
    transform: scale(0) rotate(40deg);
    opacity: 0;
  }
}
</style>
