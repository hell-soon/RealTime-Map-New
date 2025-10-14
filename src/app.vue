<script setup lang="ts">
import {
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
} from 'naive-ui'
import DefaultLayout from '@/components/03.layouts/default-layout.vue'
import EmptyLayout from '@/components/03.layouts/empty-layout.vue'

import { useSettingsStore } from './stores/settings'

const layouts = {
  empty: EmptyLayout,
  default: DefaultLayout,
}
const route = useRoute()

const layoutComponent = computed(() => {
  const layoutName = route.meta.layout as keyof typeof layouts || 'empty'
  return layouts[layoutName] || EmptyLayout
})

const settingsStore = useSettingsStore()
</script>

<template>
  <n-config-provider
    :theme="settingsStore.theme"
    :theme-overrides="settingsStore.themeOverrides"
    :style="settingsStore.customThemeVars"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <component :is="layoutComponent">
              <router-view />
            </component>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
</template>
