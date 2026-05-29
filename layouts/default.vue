<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const visible = computed(() => y.value > 300)
const { t, locale } = useI18n()
useHead({ htmlAttrs: { lang: locale } })

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  useBookmarksStore().hydrate()
})
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppFooter />

    <Transition name="scrollTop">
      <button
        v-if="visible"
        class="scrollTopBtn"
        :aria-label="t('nav.scrollTop')"
        @click="scrollToTop"
      >
        <NuxtImg src="/icons/arrowUp.svg" alt="" class="scrollTopIcon" />
      </button>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
  transition:
    background 0.2s,
    color 0.2s;
}

.main {
  flex: 1;
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.scrollTopBtn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.15s,
    opacity 0.15s;
  z-index: 100;

  &:hover {
    transform: scale(1.1);
  }
}

.scrollTopIcon {
  width: 22px;
  height: 22px;
  filter: brightness(0) invert(1);
}

.scrollTop-enter-active,
.scrollTop-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.scrollTop-enter-from,
.scrollTop-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
