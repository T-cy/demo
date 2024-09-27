<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span style="color: yellowgreen;">99999</span>人</p>
    </div>
    <div class="number" >
      <span v-for="item,index in people" :key="index">
        {{item}}
      </span>
    </div>
    <!-- echar将来展示的图标 -->
    <div class="chars" ref="charts">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'
import * as echarts from 'echarts'
//水球图
import 'echarts-liquidfill'


let people=ref('21690人')
let charts=ref()
onMounted(()=>{
  //获取dom实例
  let myCharts=echarts.init(charts.value)
  //设置实例的配置项
  myCharts.setOption({
    //标题组件
    // title:{
    //   text:'水球图'
    // },
    //x轴和y轴组件
    // xAxis: {
          
    //     },
    // yAxis: {},
    // 系列：决定展示什么样的图形图标
    series: [{
        type: 'liquidFill',
        data: [0.6],
        radius: '94%',
    }],
   
    //布局组件
    grid:{
      left:0,
      right:0,
      top:0,
      bottom:0
    }
  })
})


</script>

<style scoped lang="scss">
.box{
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top{
    margin-left: 20px;
    .title{
      color: #fff;
    font-size: 20px;
    }
    .bg{
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100%;
      width: 70px;
      height: 7px;
    }
    .right{
      float: right;
      margin-right: 20px;
      color: #fff;
      font-size: 20px;
    }
  }
  .number{
    margin:0 10px;
    margin-top: 50px;
    display: flex;
    span{
      flex: 1;
      height: 97px;
      text-align: center;
      line-height: 97px;
      color: #29fcff;
      background: url(../../images/total.png) no-repeat;
      background-size: 100%;
      font-size: 30px;
    }
  }
  .chars{
    width: 100%;
    height: 200px;
    
  }
}
</style>