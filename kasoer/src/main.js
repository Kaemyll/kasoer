import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/fr.js'
import 'quasar/dist/quasar.css'

import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
    lang: quasarLang
})

app.mount('#app')

