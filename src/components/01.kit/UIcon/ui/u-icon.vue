<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  /**
   * Icon name from Iconify collection
   * @example 'mdi:home' or 'lucide:arrow-left'
   */
  icon: string
}>()
</script>

<template>
  <Icon :icon="icon" />
</template>

<style scoped>
.iconify {
  color: inherit;
}
</style>
