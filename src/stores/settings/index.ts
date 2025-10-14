import { defineStore } from 'pinia'
import { useLanguage } from './settings-parts/useLanguage'
import { useTheme } from './settings-parts/useTheme'

export const useSettingsStore = defineStore('settings', () => {
  const themeSettings = useTheme()
  const languageSettings = useLanguage()

  return {
    ...themeSettings,
    ...languageSettings,
  }
})
