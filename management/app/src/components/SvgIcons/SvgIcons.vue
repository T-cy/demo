<template>
  <div>    
    <!-- svg图标为外层容器节点，内部需要与use标签结合使用 -->
    <!-- 在svg标签里面可以设置宽高 -->
    <svg  :style="{width: width,height:height}">
    <!-- xlink:herf来执行哪一个图标,属性值务必是#icon-图标名字-->
    <!-- use标签fill属性可以设置标签的颜色 -->
      <use :xlink:href="prefix+name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
//接受父组件传过来的数据
defineProps({
  //xlink:herf属性值的前缀
  prefix:{
    type:String,
    default:'#icon-'
  },
  //使用图标的名字
  name:{
    type:String,
  },
  //接收父组件传递的颜色
  color:{
    type:String,
    default:''
  },
  //接收父组件传递过来的宽度
  width:{
    type:String,
    default:'16px'
  },
  height:{
    type:String,
    default:'16px'
  }
})

</script>

<style scoped>
  
</style>