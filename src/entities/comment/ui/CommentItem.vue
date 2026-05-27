<script setup lang="ts">
import type { Comment } from "../../../shared/types/comment";
import { getCommentsByIds } from "../api/commentApi";
import { timeAgo } from "../../../shared/lib/time";

const props = defineProps<{
  comment: Comment;
  depth?: number;
}>();

const { t } = useI18n();

const currentDepth = computed(() => props.depth ?? 0);
const expanded = ref(false);
const replies = ref<Comment[]>([]);
const loading = ref(false);

async function showReplies() {
  if (expanded.value || !props.comment.kids?.length) return;
  loading.value = true;
  replies.value = await getCommentsByIds(props.comment.kids);
  loading.value = false;
  expanded.value = true;
}
</script>

<template>
  <article class="commentItem" :style="{ '--depth': currentDepth }">
    <header class="commentItemHeader">
      <span class="commentItemAuthor">{{
        comment.by ?? t("story.deleted")
      }}</span>
      <span class="commentItemTime">{{ timeAgo(comment.time) }}</span>
    </header>

    <ArticleContent
      v-if="comment.text"
      :content="comment.text"
      class="commentItemText"
    />
    <p v-else class="commentItemDeleted">{{ t("story.deleted") }}</p>

    <button
      v-if="comment.kids?.length && !expanded"
      class="commentItemRepliesBtn"
      @click="showReplies"
    >
      <NuxtImg
        v-if="loading"
        src="/icons/loader.svg"
        class="commentItemLoader"
        alt=""
      />
      <template v-else>
        {{ t("story.showReplies", { count: comment.kids.length }) }}
      </template>
    </button>

    <div v-if="expanded" class="commentItemReplies">
      <CommentItem
        v-for="reply in replies"
        :key="reply.id"
        :comment="reply"
        :depth="currentDepth + 1"
      />
    </div>
  </article>
</template>

<style scoped lang="scss">
.commentItem {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0 12px calc(var(--depth, 0) * 16px);
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: none;
  }
}

.commentItemHeader {
  display: flex;
  align-items: center;
  gap: 8px;
}

.commentItemAuthor {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.commentItemTime {
  font-size: 12px;
  color: var(--text-muted);
}

.commentItemText {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);

  :deep(a) {
    color: var(--accent);
    text-decoration: none;
    &:hover {
      opacity: 0.75;
    }
  }

  :deep(pre) {
    background: var(--border);
    border-radius: var(--radius);
    padding: 10px 12px;
    overflow-x: auto;
    font-size: 12px;
  }

  :deep(p) {
    margin-bottom: 6px;
    font-size: 14px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.commentItemDeleted {
  font-size: 13px;
  color: var(--text-muted);
  font-style: italic;
}

.commentItemRepliesBtn {
  align-self: flex-start;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.15s;

  &:hover {
    color: var(--text);
  }
}

.commentItemLoader {
  width: 14px;
  height: 14px;
  filter: invert(75%) sepia(0%) saturate(0%) brightness(90%);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.commentItemReplies {
  border-left: 2px solid var(--border);
  padding-left: 12px;
  margin-top: 4px;
}
</style>
