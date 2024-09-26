<template>
  <div  class="layout_box">
    <!-- 左侧菜单 -->
    <!-- 动态加类名，使得能够折叠菜单 -->
    <div class="layout_silder"  :class="LayStore.flod?'flod_silder':'layout_silder'">
      <logo></logo>
      <!-- //滚动条 -->
      <el-scrollbar class="silder_scoll" >
      <!-- 滚动菜单   -->
      
      <el-menu  :collapse="LayStore.flod?true:false" :default-active="route.path"  background-color="#001529"  text-color="#ffffff"  >
        <!-- //将路由信息放去了仓库，然后传递数据给路由组件 -->
        <Menu  :menuList="UserStore.menuRoute"></Menu>



      </el-menu>
  </el-scrollbar>
    </div >
    <!-- 顶部导航 -->
    <div class="layout_nav" :class="LayStore.flod?'flod_nav':'layout_nav'">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容区域 -->
    <div class="layout_main" :class="LayStore.flod?'flod':'layout_main'">
      <Main></Main>
    </div>

  </div>
</template>

<script lang="ts" setup>
import useLayoutStore from '../store/setting'
import logo from '../logo/logo.vue'
import Menu from './menu/menu.vue'
import useUserStore from '../store/modules/user'
import Main from './main/main.vue'
import Tabbar from './tabbar/tabbar.vue'
import {useRoute} from 'vue-router'

let UserStore=useUserStore()
let route=useRoute()
let LayStore=useLayoutStore()



// watch(flod,(newValue,oldValue)=>{
//   console.log(newValue,oldValue);
// },{deep:true})


//  height:calc(100vh - $base-nav-height);

</script>

<style scoped lang="scss">
--el-menu-bg-color{
  background-color:#001529 ;
}
.layout_box{
  width: 100%;
  height: 100vh;

  .layout_silder{
    
    width:$base-silder-width;
    color: white;
    height: 100vh;
    background-color: $base-silder-bgc;
    transition: all 0.5s;
    .silder_scoll{
      padding-top: 20px;
      width: 100%;
      height: calc(100% - $base-silder-logo);
    }

  }
  .flod_silder{
    width:$base-flod-silder-width;
    }
  .layout_nav{
    padding: 20px;
    position: fixed;
    top: 0;
    left:$base-silder-width;
    width: calc(100% - $base-silder-width);
    height:$base-nav-height;
    transition: all 0.3s;
    &.flod_nav{
    width: calc(100vw - $base-flod-silder-width);
    left:$base-flod-silder-width
  }
  }

  .layout_main{
    position: fixed;
    padding: 20px 0 0 20px;
    width: calc(100% - $base-silder-width);
    height:calc(100vh - $base-nav-height);
    overflow-y: auto;
    top:$base-nav-height;
    left:$base-silder-width;
    transition: all 0.3s;
    &.flod{
    width: calc(100vw - $base-flod-silder-width);
    left:$base-flod-silder-width
  }
  }
}
</style>