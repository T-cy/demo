<template>
  <div class="container">
    <!-- 数据大屏展示内容的区域 -->
    <div class="screen" ref="screen">

      <!-- 数据大屏顶部 -->
        <div class="top">
          <Top></Top>
        </div>
        <div class="buttom" >
          <div class="left">
            <Tourist class="tourist"></Tourist>
            <Sex class="sex"></Sex>
            <Age class="age"></Age>
          </div>
          <div class="center">
            中间
          </div>
          <div class="right">
            右侧
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue"

import Tourist from './compoments/tourist/tourist.vue'
import Age from './compoments/age/age.vue'
import Sex from './compoments/sex/sex.vue'


import Top from './compoments/top/top.vue'

//获取数据大屏展示内容盒子的dom元素
let screen=ref()

onMounted(()=>{
  screen.value.style.transform=`scale(${getScale()}) translate(-50%, -50%)` 
  // console.log(getScale());
  
})


//数据大屏的缩放比例
let getScale=(w=1920,h=1080)=>{
  const ww=window.innerWidth/w
  const wh=window.innerHeight/h
  return ww<wh?ww:wh
}

//监听视口的变化
window.onresize=()=>{
 screen.value.style.transform=`scale(${getScale()}) translate(-50%, -50%)` 
}


</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen{
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top:50%;
    //基点
    transform-origin: left top;
    .top{
      width: 100%;
      height: 40px;
    }
    .buttom{
      display: flex;
      .right{
        flex: 1;
      }
      .left{
        flex:1;
        display: flex;
        flex-direction: column;
        height: 1040px;
        .tourist{
          flex: 1.2;
        }
        .sex{
          flex: 1;
          background-color: aqua;
        }
        .age{
          flex: 1;
          background-color: blueviolet;
        }
      }
      .center{
        flex:2
      }
    }
  }
}
</style>