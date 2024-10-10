import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/fr'
import 'quasar/dist/quasar.css'

import App from './App.vue'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
// Import Quasar css
import 'quasar/dist/quasar.css'

import './style.css';

const app = createApp(App)

app.use(Quasar, {
    lang: quasarLang
})

app.mount('#app')
