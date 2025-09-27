import App from './App.vue'

import { withI18n } from './providers/withI18n'
import { withNaiveUI } from './providers/withNaiveUI'
import router from './router'
import './styles/index.scss'

import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)

withI18n(app)
withNaiveUI(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
