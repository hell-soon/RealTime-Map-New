<script setup lang="ts">
interface Props {
  isLoading: boolean
  error: string | null
}
defineProps<Props>()
</script>

<template>
  <div v-if="isLoading">
    <p>
      Getting location...
    </p>
  </div>
  <div v-else-if="error">
    <p>
      {{ error }}
    </p>
  </div>
</template>
