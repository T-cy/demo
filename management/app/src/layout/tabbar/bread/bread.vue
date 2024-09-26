<template>
  <el-icon style="margin-right: 10px;" @click="changeIcon">
        <component :is="layStore.flod?'Fold':'Expand'"></component>
  </el-icon>

 

      <!-- 面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item,index in route.matched" :key="index"  v-show="item.meta.title&&item.meta.icon"  :to="item"> 
      <div style="display:flex;justify-content: center;"  >
        <el-icon size="14" style="margin: 0 5px;">
        <component :is="item.meta.icon"></component>
      </el-icon>  
      <span >{{ item.meta.title }} </span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight} from '@element-plus/icons-vue'
import useLayoutStore from '../../../store/setting'

import {useRoute} from 'vue-router'


let layStore=useLayoutStore()

const route=useRoute()

// console.log(route.matched);


// let fold=ref(false)

let changeIcon=()=>{
  layStore.flod=!layStore.flod

  // console.log(layStore.flod);
}


</script>

<style scoped lang="scss">

</style>