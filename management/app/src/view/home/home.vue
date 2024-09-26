<template>
<el-card >
  <div class="box">
     <div class="image">
      <img :src="userStore.avatar" alt="">
    </div>
    <div class="bottom">
      <h3 style="font-weight: 600;font-size: 24px;margin-bottom: 20px;" >{{getHour}}~{{userStore.username}}</h3>
      <h3 style="color: #ccc;">硅谷甄选平台</h3>  
    </div>
  </div>
</el-card>

  <div class="bottom_svg">
    <SvgIcons name="welcome" width="500px" height="500px"></SvgIcons>
  </div>
</template>

<script setup lang="ts">
import { onMounted ,computed} from 'vue'
import useUserStore from '../../store/modules/user'
import gettime from '../../utils/time'

//获取仓库里面的用户信息
let userStore=useUserStore()

let getHour=computed(()=>{
  const date =new Date()
  return gettime(date.getHours())
})

//挂载就发请求获取用户信息
onMounted(async() => {
  
  
})


</script>

<style scoped lang="scss">
.box{
  display: flex;
  align-items: center;
  .image{
  width: 100px;
  height: 100px;
  img{
    widows: 100%;
    height: 100%;
    border-radius: 50%;
    margin-right: 20px
  }
}
  .bottom{
  margin-left: 20px;  
  }
}
.bottom_svg{
  display: flex;
  justify-content: center;
}

</style>