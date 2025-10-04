<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types'
import { useDebounceFn } from '@vueuse/core'
import { useMarksSocket } from '../composables/useMarksSocket'

const props = defineProps<{
  coordinates: LngLat
}>()

const { marks, fetchMarks } = useMarksSocket()

const debouncFetchMark = useDebounceFn((coordinat: LngLat) => {
  const [longitude, latitude] = coordinat
  fetchMarks({
    show_ended: true,
    longitude,
    latitude,
    radius: 100000,
  })
}, 30000)

watch(
  () => props.coordinates,
  (newCord) => {
    if (newCord)
      debouncFetchMark(newCord)
  },
)
</script>

<template>
  <UMarker
    v-for="mark in marks"
    :key="mark.id"
    :coordinates="mark.geom.coordinates as any"
    :draggable="false"
    :title="mark.mark_name"
    :media="{
      photoUrl: mark.photo ? mark.photo[0] : undefined,
    }"
  />
</template>
