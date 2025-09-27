import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'

type ThemeName = 'light' | 'dark'

const currentTheme = ref<ThemeName>('light')

export function useTheme() {
  const theme = computed(() => {
    return currentTheme.value === 'dark' ? darkTheme : null
  })

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    return {
      common: {
        primaryColor: '#4A90E2',
        primaryColorHover: '#357ABD',
        primaryColorPressed: '#2A629A',
        primaryColorSuppl: '#4A90E2',
      },
      Button: {
        textColorPrimary: '#FFFFFF',
      },
    }
  })

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    themeOverrides,
    toggleTheme,
    currentTheme,
  }
}
