<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="">
    <button @click="gohome">点击我去首页</button>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
let router=useRouter()
let gohome=()=>{
  router.push('/home')
}
</script>

<style scoped>
.box{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 800px;
    height: 400px;
  }
}
</style>