<script setup lang="ts">
import type { Component } from 'vue'
import {
  Map,
  MapOutline,
  Person,
  PersonOutline,
  Settings,
  SettingsOutline,
} from '@vicons/ionicons5'

import { NIcon } from 'naive-ui'

interface NavItem {
  id: string
  icon: Component
  activeIcon: Component
}

const navItems = ref<NavItem[]>([
  { id: 'Person', icon: PersonOutline, activeIcon: Person },
  { id: 'Map', icon: MapOutline, activeIcon: Map },
  { id: 'Settings', icon: SettingsOutline, activeIcon: Settings },
])

const activeItemId = ref<string>(navItems.value[1].id)
const itemRefs = shallowRef<HTMLLIElement[]>([])
const navList = ref<HTMLUListElement | null>(null)
const indicatorStyle = ref({})

function updateIndicatorPosition(activeIndex: number) {
  const activeItemEl = itemRefs.value[activeIndex]
  if (!activeItemEl || !navList.value)
    return

  const offsetLeft = activeItemEl.offsetLeft
  const clientWidth = activeItemEl.clientWidth
  const indicatorPosition = offsetLeft + clientWidth / 2

  indicatorStyle.value = {
    transform: `translateX(${indicatorPosition}px) translateX(-50%)`,
  }
}

function setActiveItem(id: string, index: number) {
  activeItemId.value = id
  updateIndicatorPosition(index)
}

const isReadyForAnimation = ref(false)

onMounted(() => {
  const initialActiveIndex = navItems.value.findIndex(item => item.id === activeItemId.value)
  if (initialActiveIndex !== -1) {
    updateIndicatorPosition(initialActiveIndex)
  }

  nextTick(() => {
    isReadyForAnimation.value = true
  })
})
</script>

<template>
  <UGlassWrapper
    :scale="40"
    :class="{ 'is-visible': isReadyForAnimation }"
    class="bottom-nav"
  >
    <div
      class="bottom-nav__indicator"
      :style="indicatorStyle"
    >
      <div class="bottom-nav__indicator-orb" />
    </div>
    <ul
      ref="navList"
      class="bottom-nav__list"
    >
      <li
        v-for="(item, index) in navItems"
        :key="item.id"
        :ref="el => { if (el) itemRefs[index] = el as HTMLLIElement }"
        class="bottom-nav__item"
        :class="{ 'bottom-nav__item--active': activeItemId === item.id }"
        @click="setActiveItem(item.id, index)"
      >
        <n-icon
          size="26"
          :class="{ 'bottom-nav__item--active__icon': activeItemId === item.id }"
          :component="activeItemId === item.id ? item.activeIcon : item.icon"
          class="bottom-nav__icon"
        />
      </li>
    </ul>
  </UGlassWrapper>
</template>

<style lang="scss" scoped>
$orb-background: var(--orb-background);
$nav-icon-inactive: var(--nav-icon-inactive);
$nav-icon-active: var(--nav-icon-active);

.bottom-nav {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  height: 60px;
  border-radius: 20px;
  box-shadow:
    0 6px 6px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(0, 0, 0, 0.1);

  transform: translateX(-50%) translateY(250%);
  opacity: 0;

  transition:
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s,
    opacity 0.6s ease-out;

  &.is-visible {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

.bottom-nav__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.bottom-nav__item {
  cursor: pointer;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-nav__icon {
  color: $nav-icon-inactive;
  transition:
    transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    color 0.4s ease;
  z-index: 3;
  position: relative;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.bottom-nav__item--active__icon {
  color: $nav-icon-active;
  transform: translateY(-30px);
}

.bottom-nav__indicator {
  position: absolute;
  top: -25px;
  height: 50px;
  width: 50px;
  z-index: 0;
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.bottom-nav__indicator-orb {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  background-color: $orb-background;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>
