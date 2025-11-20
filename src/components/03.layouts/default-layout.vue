<script setup lang="ts">
import ProfileFormView from '@/components/02.features/authentication/ui/profile-form-view.vue'
import BottomNavigation from '@/components/02.features/button-navigation/button-navigation.vue'
import AppSettings from '../02.features/app-settings/app-settings.vue'

const activeNavItem = ref('Map')
</script>

<template>
  <div class="default-layout">
    <main class="default-layout__main">
      <slot />
    </main>

    <footer class="default-layout__footer">
      <bottom-navigation v-model:active-item="activeNavItem" />
    </footer>

    <u-app-panel :show="activeNavItem === 'Settings'">
      <app-settings />
    </u-app-panel>

    <u-app-panel :show="activeNavItem === 'Person'">
      <profile-form-view />
    </u-app-panel>

    <u-modal-wrapper />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex-grow: 1;
    position: relative;
  }
}
</style>
