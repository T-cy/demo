<template>
  <div class="logo">
    <img src="../../public/dog.png" alt="">
    <p>硅谷甄选后台管理平台</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.logo{
  display: flex;
  width:100%;
  height: $base-silder-logo;
  img{
    margin-left: 10px;
    margin-top: 10px;
    width: 40px;
  }
  p{
    color: #fff;
    line-height: 50px;
    padding-left: 10px;
  }
}
</style>