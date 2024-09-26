<template>
  <div class="container">
    <!-- 数据大屏展示内容的区域 -->
    <div class="screen">
        <div class="top">
          顶部
        </div>
        <div class="buttom">
          底部
          <div class="left">
            左侧
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

</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen{
    width: 1920px;
    height: 1080px;
    background-color: antiquewhite;
  }
}
</style>