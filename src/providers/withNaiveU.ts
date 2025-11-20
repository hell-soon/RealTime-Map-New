import type { App } from 'vue'
import {
  create,
  NCard,
  NConfigProvider,
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,

  NNotificationProvider,
} from 'naive-ui'

const naive = create({
  components: [
    NConfigProvider,
    NMessageProvider,
    NDialogProvider,
    NNotificationProvider,
    NLoadingBarProvider,
    NCard,
  ],
})

export function withNaiveUI(app: App) {
  app.use(naive)
  return app
}
