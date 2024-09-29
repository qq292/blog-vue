

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Http from './components/Http.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css' 
import 'cherry-markdown/dist/cherry-markdown.css'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import  piniaPluginPersistedstate   from 'pinia-plugin-persistedstate'
import 'element-plus/theme-chalk/display.css'


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }




app.use(pinia)
app.component('Http', Http)
app.use(router)
app.use(ElementPlus,{
    locale: zhCn,
  })
app.mount('#app')


