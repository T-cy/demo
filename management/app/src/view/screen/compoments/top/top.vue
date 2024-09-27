<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间{{time}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref,onMounted,onUnmounted} from 'vue'
import dayjs from 'dayjs';

let timer=ref<any>(null)
let router=useRouter()
let goHome=()=>{
router.push('/home')
}

//当前时间
let time=ref(dayjs().format('YYYY年MM月DD日 HH:mm:ss'))
onMounted(()=>{
  timer.value=setInterval(() => {
    time.value=dayjs().format('YYYY年MM月DD日 HH:mm:ss')
  }, 1000);
})
onUnmounted(()=>{
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top{
  width: 100%;
  height: 40px;
  display: flex;
  .left{
  flex: 1;  
  background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
  background-size: cover;
  .lbtn{
    display: inline-block;
    width: 100px;
    height: 40px;
    float: right;
    background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
     background-size: 100% 100%;
     text-align: center;
     line-height: 40px;
     color: #29fcff;
     font-size: 14px;
  }
  }
  .center{
    flex: 2;
    .title{
      width: 100%;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      font-size: 30px;
      font-weight: 600;
      color: #29fcff;
    }
  }
  .right{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: 100% 100%;
    .rbtn{
    display: inline-block;
    width: 100px;
    height: 40px;
    float: left;
    background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
    background-size: 100% 100%;
     text-align: center;
     line-height: 40px;
     color: #29fcff;
     font-size: 14px;
     margin-left: 5px;
    }
    .time{
      color: #29fcff;
      margin-right: 20px
    }
  }
}
</style>