<script setup lang="ts">
const { t, locale, setLocale } = useI18n();
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

function toggleTheme() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
  <header class="header">
    <div class="headerInner">
      <NuxtLink to="/" class="headerLogo">HN</NuxtLink>

      <nav class="headerNav">
        <NuxtLink to="/" class="headerLink">{{ t("nav.feed") }}</NuxtLink>
        <NuxtLink to="/bookmarks" class="headerLink">{{
          t("nav.bookmarks")
        }}</NuxtLink>
      </nav>

      <div class="headerActions">
        <button
          class="headerLocale"
          @click="setLocale(locale === 'en' ? 'ru' : 'en')"
        >
          {{ locale.toUpperCase() }}
        </button>

        <ClientOnly>
          <ThemeToggle :is-dark="isDark" @toggle="toggleTheme" />
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.headerInner {
  max-width: 860px;
  margin: 0 auto;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.headerLogo {
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: -0.04em;
}

.headerNav {
  display: flex;
  gap: 32px;
}

.headerLink {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s;

  &:hover,
  &.router-link-active {
    color: var(--text);
  }
}

.headerActions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.headerLocale {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  font-family: inherit;
  transition:
    color 0.15s,
    border-color 0.15s;

  &:hover {
    color: var(--text);
    border-color: var(--text-muted);
  }
}
</style>
