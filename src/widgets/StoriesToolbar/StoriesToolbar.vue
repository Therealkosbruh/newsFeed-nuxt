<template>
  <div class="storiesToolbar">
    <StorySearch />
    <StoryFilters />
  </div>
</template>

<style scoped lang="scss">
.storiesToolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
