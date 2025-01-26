import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './FrontApp.vue'


const app = createApp(App)
app.use(ElementPlus)
app.mount('#frontAppAdsGeneratorModule')
//<div id="frontAppAdsGeneratorModule"></div>