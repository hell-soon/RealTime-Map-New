import { createYmaps } from 'vue-yandex-maps'

import App from './app.vue'
import websocketPlugin from './plugins/websocket'
import { withI18n } from './providers/withI18n'
import { withNaiveUI } from './providers/withNaiveUi.ts'
import router from './shared/lib/router.ts'
import './assets/scss/index.scss'

import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)

withI18n(app)
withNaiveUI(app)
app.use(createPinia())
app.use(router)
app.use(websocketPlugin)
app.use(createYmaps({
  apikey: '9811b22a-e004-49b4-ac9a-4103a26f10ee',
}))

app.mount('#app')
