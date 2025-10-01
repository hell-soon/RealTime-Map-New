<script setup lang="ts">
import type { Component } from 'vue'
import {
  BarChart,
  BarChartOutline,
  Home,
  HomeOutline,
  Notifications,
  NotificationsOutline,
  Time,
  TimeOutline,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

interface NavItem {
  id: string
  icon: Component
  activeIcon: Component
}

const navItems = ref<NavItem[]>([
  { id: 'home', icon: HomeOutline, activeIcon: Home },
  { id: 'stats', icon: BarChartOutline, activeIcon: BarChart },
  { id: 'history', icon: TimeOutline, activeIcon: Time },
  { id: 'notifications', icon: NotificationsOutline, activeIcon: Notifications },
])

const activeItemId = ref<string>(navItems.value[0].id)
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

onMounted(async () => {
  await nextTick()
  const initialActiveIndex = navItems.value.findIndex(item => item.id === activeItemId.value)
  if (initialActiveIndex !== -1) {
    updateIndicatorPosition(initialActiveIndex)
  }
})
</script>

<template>
  <div class="bottom-nav">
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
          :component="activeItemId === item.id ? item.activeIcon : item.icon"
          class="bottom-nav__icon"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
$glass-background: rgba(255, 255, 255, 0.25);
$glass-border: rgba(255, 255, 255, 0.18);
$orb-background: #ffffff;
$nav-icon-inactive: #555555;
$nav-icon-active: #000000;

.bottom-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 20px;

  background: $glass-background;
  border: 1px solid $glass-border;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.1),
    inset 0 0 1px 1px rgba(255, 255, 255, 0.3);

  &__list {
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  &__item {
    cursor: pointer;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__icon {
    color: $nav-icon-inactive;
    transition:
      transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55),
      color 0.4s ease;
    z-index: 3;
    position: relative;
  }

  &__item--active &__icon {
    color: $nav-icon-active;
    transform: translateY(-30px);
  }

  &__indicator {
    position: absolute;
    top: -25px;
    height: 50px;
    width: 50px;
    z-index: 0;
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);

    &-orb {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      background-color: $orb-background;
      border-radius: 50%;
      z-index: 2;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
