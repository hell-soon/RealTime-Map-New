<script setup lang="ts">
import BottomNavigation from '@/components/05.features/button-navigation/button-navigation.vue'
</script>

<template>
  <div class="default-layout">
    <main class="default-layout__main">
      <slot />
    </main>

    <footer class="default-layout__footer">
      <bottom-navigation />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex-grow: 1;
  }
}
</style>
