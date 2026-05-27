<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <footer class="footer">
    <span>{{ t("footer.made") }}</span>
    <NuxtLink
      to="https://github.com/Therealkosbruh"
      target="_blank"
      rel="noopener noreferrer"
      class="footerLink"
    >
      @Therealkosbruh
    </NuxtLink>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  border-top: 1px solid var(--border);
  padding: 24px;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.footerLink {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}
</style>
