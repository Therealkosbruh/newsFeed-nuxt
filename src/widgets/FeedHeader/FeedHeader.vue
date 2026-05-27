<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="section">
    <h1 class="feedHeaderTitle">
      <i18n-t keypath="home.title">
        <template #highlight>
          <span class="feedHeaderHighlight">{{
            t("home.titleHighlight")
          }}</span>
        </template>
      </i18n-t>
    </h1>
    <p class="feedHeaderSubtitle">{{ t("home.description") }}</p>
  </section>
</template>

<style scoped lang="scss">
.feedHeaderTitle {
  font-size: 42px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.04em;
  line-height: 1.1;
  max-width: 560px;
}

.feedHeaderHighlight {
  color: var(--accent);
}

.feedHeaderSubtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 12px;
  max-width: 480px;
}
</style>
