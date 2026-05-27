<script setup lang="ts">
defineProps<{ content: string }>();
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="articleContent" v-html="content" />
</template>

<style scoped lang="scss">
.articleContent {
  font-size: 16px;
  line-height: 1.75;
  color: var(--text);

  :deep(p) {
    font-size: 16px;
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4) {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--text);
    margin: 28px 0 10px;
  }

  :deep(h1) {
    font-size: 24px;
  }
  :deep(h2) {
    font-size: 20px;
  }
  :deep(h3) {
    font-size: 17px;
  }

  :deep(a) {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    &:hover {
      opacity: 0.75;
    }
  }

  :deep(img) {
    max-width: 100%;
    border-radius: var(--radius);
    margin: 16px 0;
    display: block;
  }

  :deep(pre) {
    background: var(--border);
    border-radius: var(--radius);
    padding: 14px 16px;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.6;
    margin: 16px 0;
  }

  :deep(code) {
    font-family: monospace;
    font-size: 13px;
    background: var(--border);
    padding: 2px 5px;
    border-radius: 4px;
  }

  :deep(pre code) {
    background: none;
    padding: 0;
  }

  :deep(blockquote) {
    border-left: 3px solid var(--accent);
    padding: 4px 0 4px 14px;
    color: var(--text-muted);
    margin: 16px 0;
    font-style: italic;
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 20px;
    margin-bottom: 16px;

    li {
      margin-bottom: 6px;
      font-size: 16px;
    }
  }

  :deep(figure) {
    margin: 16px 0;

    figcaption {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 6px;
      text-align: center;
    }
  }

  :deep(hr) {
    border: none;
    border-top: 1px solid var(--border);
    margin: 24px 0;
  }
}
</style>
