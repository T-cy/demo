<template>
<el-button :icon="Refresh" circle  @click="updateRefsh"></el-button>
<el-button :icon="FullScreen" circle  @click="fullScrean"></el-button>

  <el-popover
    :visible="drawer"
    placement="bottom"
    title="主题设置"
    :width="300"
    content="this is content, this is content, this is content"
  >
    <el-form  label-width="80px">
        <el-form-item label="主题颜色">
          <el-color-picker v-model="color" show-alpha :predefine="predefineColors" />
        </el-form-item>
        <el-form-item label="暗黑模式">
           <el-switch size="small" active-text="Open" inactive-text="Close" v-model="dark" @change="changeDark"/>
        </el-form-item>
    </el-form>

    <template #reference>
      <el-button :icon="Setting" circle  @click="showblack"></el-button>
    </template>
  </el-popover>


<img :src="userStore.avatar?userStore.avatar:'../../../../public/dog.png'" style="width: 30px;height:30px;margin:0 10px;border-radius:50%">  
<el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
</el-dropdown>






</template>

<script setup lang="ts">
import {Refresh,FullScreen,Setting } from '@element-plus/icons-vue'
import useLayoutStore from '../../../store/setting'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// import { reqLogout } from '../../../api/user/index'


//获取用户相关的小仓库
import useUserStore from '../../../store/modules/user'
let userStore=useUserStore()


let LayStore=useLayoutStore()

let router=useRouter()

//刷新的回调
let updateRefsh=()=>{
LayStore.reflsh=!LayStore.reflsh
}
let fullScrean=()=>{
  //全屏，利用dom操作，此时的full当全屏是true，否则为false
  let full=document.fullscreenElement
  if(!full){
    //这个是dom元素的全屏方法
    document.documentElement.requestFullscreen()
  }
  else{
    //退出全屏
    document.exitFullscreen()
  }
}
//退出登录
let logout=async()=>{
  //发请求，退出登录

  
  await userStore.userLogout()
  // 仓库中的数据token清除

  // 跳转到登录页面
  router.push({
    path:'/login'
  })
}


let drawer=ref(false)
//收集开关的数组
let dark=ref(false)

//暗黑模式切换
let showblack=()=>{
  drawer.value=!drawer.value
}
let changeDark=()=>{
  //获取HTML根节点
  let html =document.documentElement
  // console.log(html);
  //判断HTML标签是否有dark这一个类名
  dark.value?html.className='dark':html.className=''
  

}
// 颜色组件
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

</script>

<style scoped lang="scss">

</style>