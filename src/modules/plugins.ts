import { App } from 'vue'

import router from '../router'
import pinia from '../stores'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

import 'element-tiptap-vue3-fixed/lib/style.css'


export default (app: App) => {
  app
    .use(router)
    .use(pinia)
    .use(ElementPlus, {
      locale: zhCn
    })

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
