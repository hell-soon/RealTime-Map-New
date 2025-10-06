<script setup lang="ts">
import type { YMap } from '@yandex/ymaps3-types'
import { GeolocationFeedback } from '@/components/02.features/geolocation'
import { useGeolocation } from '@/components/02.features/geolocation/composables/useGeolocation'
import MarksLayer from '@/components/02.features/get-marks/ui/marks-layer.vue'
import { BaseMapView } from '@/components/02.features/map-core'

const {
  userPosition,
  error: geolocationError,
  isLoading: isLoadingGeolocation,
} = useGeolocation()
const mapApi = shallowRef<null | YMap>(null)

function handleMapReady(map: YMap) {
  mapApi.value = map
}
</script>

<template>
  <main
    class="column items-stretch"
    style="height: 100dvh;"
  >
    <geolocation-feedback
      v-if="isLoadingGeolocation || geolocationError"
      :is-loading="isLoadingGeolocation"
      :error="geolocationError"
      class="absolute-center"
    />
    <base-map-view
      v-if="!isLoadingGeolocation && !geolocationError && userPosition"
      :center-coordinates="userPosition"
      :zoom-level="15"
      show-user-marker
      :user-marker-settings="{ title: 'Мое местоположение', color: 'red' }"
      class="col"
      @map-ready="handleMapReady"
    >
      <marks-layer
        :coordinates="userPosition"
      />
      <!-- <UMarker
        :coordinates="[24.937335, 60.169953]"
        :draggable="false"
        :media="{
          photoUrl: 'https://avatars.githubusercontent.com/u/71484693?v=4',
        }"
      /> -->
    </base-map-view>
  </main>
</template>
