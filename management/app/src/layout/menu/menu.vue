<template>
  <div>
    <template v-for="(item) in menuList" :key="item.path">
      <!-- //没有子路由 -->
      <template  v-if="!item.children">
        <el-menu-item v-if="item.meta.hidden" :index="item.path"  @click="goRoute">
          <el-icon size="18"  color="white">
              <component :is="item.meta.icon"></component>
            </el-icon>   
        <template #title>
          
          <span>{{ item.meta.title }} </span>
        </template>
      </el-menu-item>
      </template>

      <!-- 有子路由，但是只有一个子路由 -->
      <template  v-if="item.children&&item.children.length==1">
        <el-menu-item :index="item.children[0].path"  v-if="item.children[0].meta.hidden" @click="goRoute">
          <el-icon size="18"  color="white">
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>            
        <template #title>


          <span>{{ item.children[0].meta.title }} </span>
        </template>
      </el-menu-item>
      </template>

      <!-- 有子路由，且路由大于两个 -->
      <template  v-if="item.children&&item.children.length>1">
        <el-sub-menu  :index="item.path" style="display: grid;">
        <template #title >  
          <el-icon size="18"  color="white">
              <component :is="item.meta.icon"></component>
            </el-icon>   
          <span  :class="LayStore.flod?'bgc':'white'">{{ item.meta.title }}</span>
        </template>
        <el-menu-item   v-for="element in item.children"  v-show="element.meta.hidden" :index="element.path" @click="goRoute">

        <el-icon size="18"  color="white">
              <component :is="element.meta.icon"></component>
            </el-icon>    
          <template #title  >
          
            <span>{{ element.meta.title }}</span>
          </template>
          </el-menu-item>
      </el-sub-menu>
      </template>


    </template>






  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'

import useLayoutStore from '../../store/setting'
let LayStore=useLayoutStore()

console.log(LayStore.flod);


//这个是动态生成路由
defineProps(['menuList'])
// console.log(props.menuList);

let router=useRouter()
// console.log(router);


//el-menu-item 身上存在一个方法，e可以获取路由跳转信息
let goRoute=(e:any)=>{
  router.push(e.index)
  // console.log(e.index);
  
  
}

</script>

<style scoped lang="scss">
div{
  color: aliceblue;
}
.bgc{
  color: $base-silder-bgc;
}
.white{
  color: #fff;
}
</style>
