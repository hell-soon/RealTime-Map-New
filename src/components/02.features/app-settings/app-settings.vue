<script setup lang="ts">
import {
  NH3,
  NP,
  NThing,
} from 'naive-ui'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
</script>

<template>
  <div class="settings-content">
    <n-h3>Настройки приложения</n-h3>
    <n-thing>
      <template #header>
        Тема оформления
      </template>
      <template #header-extra>
        <u-theme-switcher v-model="currentTheme" />
      </template>
    </n-thing>
    <n-p>Здесь будут находиться основные настройки вашего приложения.</n-p>
  </div>
</template>

<style lang="scss" scoped>
.settings-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
