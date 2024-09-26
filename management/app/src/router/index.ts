import {createRouter, createWebHashHistory } from 'vue-router'
import { ConstantRoute } from './routes'

const router=createRouter({
 history:createWebHashHistory(),//哈希模式
 routes:ConstantRoute,
 //滚动行为
 scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // 始终滚动到顶部
    return { 
    top: 0,
    left:0
    }
  }
})
export default  router;