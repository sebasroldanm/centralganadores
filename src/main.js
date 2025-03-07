import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import es from 'element-plus/dist/locale/es.mjs'
import App from './FrontApp.vue'


const app = createApp(App)
app.use(ElementPlus, {
    locale: es
  })
app.mount('#frontAppAdsGeneratorModule')
//<div id="frontAppAdsGeneratorModule"></div>