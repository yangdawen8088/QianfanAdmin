import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import pinia from '@/Stores/index'
import App from './App.vue'
import router from './Router'
import '@/Styles/app.scss';
import '@/Styles/index.scss';
import '@/Styles/elementUI.scss';
import '@/Styles/special.scss';
import globalComponent from '@/Components/index.js'
import '@/Styles/iconfont/iconfont.css'


const app = createApp(App)
app.use(ElementPlus, { size: 'default', zIndex: 3000, locale: zhCn });
for (const name in ElementPlusIcons) {
  app.component(name, ElementPlusIcons[name])
}
app.use(pinia)
app.use(router)
app.use(globalComponent)
app.mount('#app')
