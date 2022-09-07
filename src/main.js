import { createApp } from 'vue'
import '@/assets/styles/style.scss'
import App from '@/App.vue'
import router from '@/routers/index'
import components from '@/components/UI/index.js'
import store from './store'

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
});

app.use(router).use(store);

app.mount('#app')
