<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Bread></Bread>
    </div>
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Bread from './bread/bread.vue'
import Setting from './setting/setting.vue'


</script>

<style scoped lang="scss">
.tabbar{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .tabbar_left{
    display: flex;
    align-items: center;
  }
  .tabbar_right{
    display: flex;
   align-items: center;
  }
}
</style>