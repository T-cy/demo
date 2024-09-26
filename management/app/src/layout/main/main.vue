<template>
  <!-- 单独封装是为了过渡动画 -->
 <router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component"  v-if="flag"/>
  </transition>
</router-view>
</template>

<script setup lang="ts">
import useLayoutStore from '../../store/setting'
import { ref,watch,nextTick } from 'vue'

//监听仓库的数据reflsh有没有变化，变化了就代表用户点击了刷新
let LayStore=useLayoutStore()

//控制当前组件是否被销毁
let flag=ref(true)


watch(()=>LayStore.reflsh,()=>{
  flag.value=false
  nextTick(()=>{
    flag.value=true
  })
})
</script>

<style scoped lang="scss">
.fade-enter-form{
  opacity: 0;

}
.fade-enter-active{
  transition: all 1s;
}
.fade-enter-to{
  opacity: 1;
  
}
</style>