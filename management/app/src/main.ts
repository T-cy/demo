import { createApp } from "vue";
//引入elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//elementplus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from "./App.vue";

//全局注册svg组件
import SvgIcons from './components/SvgIcons/SvgIcons.vue'
import Catagory from './components/Catagory/Catagory.vue'


//引入全局样式
import './style/index.scss'

//引入路由
import router from './router/index'

//引入仓库
import pinia from './store/index'

//引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


//暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

const app=createApp(App)
app.use(ElementPlus)
app.use(ElementPlus, {
  locale: zhCn,//中文
})


//安装路由
app.use(router)

//安装仓库
app.use(pinia)



//全局注册svg组件
app.component('SvgIcons',SvgIcons)
app.component('Catagory',Catagory)

// 图标组件注册为全局
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


import {BgcColor} from './utils/color'
BgcColor()

// console.log(import.meta.env);//开发环境
//svg插件需要配置代码
import 'virtual:svg-icons-register'


//路由鉴权
import  './permission'







app.mount("#app");
