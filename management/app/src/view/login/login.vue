<template>
  <div class="login_box">
    <el-row>
      <!-- //layout布局页面分成24份，12即代表占一半  :xs：<768px占多少分 -->
      <el-col :span="12" :xs="0">
      </el-col>
      <el-col :span="12" :xs:="24">
        <el-form class="login_form">
            <h1>Hello</h1>
            <h2>欢迎来到硅谷甄选</h2>
            <el-form :model="userInfo"  :rules="rules"  ref="LoginForm">
                <el-form-item prop="username">
                  <el-input type="text" :prefix-icon="User" placeholder="请输入用户名" v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" :prefix-icon="Lock" placeholder="请输入密码" v-model="userInfo.password" show-password></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button :loading="loading" type="primary" class="login_button" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
//引入输入框的图标
import {User,Lock} from "@element-plus/icons-vue"
import { ElNotification } from 'element-plus'

import {reactive,ref} from "vue"

//引入用户小仓库
import useUserStore from "../../store/modules/user.ts"

//获取路由器
import { useRouter } from 'vue-router'

//时间函数
import gettime from '../../utils/time'

let loading=ref(false)

let  UserStore= useUserStore()
//使用路由器
const router=useRouter()

let userInfo=reactive({
  username:'admin',
  password:'111111'
})

// let userInfo=reactive({
//   username:'',
//   password:''
// })


//自定义校验规则  rule就是校验规则的对象    value就是表单元素的文本对象    callback验证成功后的回调函数，如果不符合也是调用callback
let validateUsername=(_:any, value: any, callback: any)=>{
if(value.length>=5){
    callback()
}
else{
  callback(new Error('账号长度至少5位'))
}
}

let validatePassword=(_:any, value: any, callback: any)=>{
  if(value.length>=6){
    callback()
}
else{
  callback(new Error('密码长度至少6位'))
}
}

//规则
let rules={
  username:[
  //   {
  //   //required这段文字必须校验
  //   required: true,
  //   // 错误提示信息
  //   message: '输入内容不能为空',
  //   // 失去焦点的时候触发
  //   trigger: 'blur',
  // },
  {
    validator: validateUsername, trigger: 'blur'
  }
],
  password:[
    // {required: true,message: '输入内容不能为空',trigger: 'blur'}
    {validator: validatePassword, trigger: 'blur'}
],
}




//打了标签，拿到了表单本身
let LoginForm=ref()

//登录的方法
const login=async()=>{
//保证全部表单数据验证成功才能路由请求
await LoginForm.value.validate()
  loading.value=true
  //点击登录按钮，发送网络请求
  // 请求成功，路由跳转
  // 请求失败，弹出失败信息

  //返回的是一个Promise对象
  try {
  await UserStore.userLogin(userInfo)
  loading.value=false
  //登录成功跳转路由
  router.push('/')
  
  ElNotification({
    type:'success', 
    title:`Hi ${gettime(new Date().getHours())}`,
    message: '欢迎回来',
  })
    
  } catch (error) {
    loading.value=false
    ElNotification({
      type:'error', 
      message: (error as Error).message,
  })
  }
  // console.log(res);
  
  
//   let res=await reqLogin({username:'admin',password:'111111'})
// console.log(res);

  
}


</script>

<style scoped lang="scss">
.login_form{
  padding: 40px;
  position: relative;
  width: 80%;
  background: url(../../assets/images/login_form.png) no-repeat;
  background-size: cover;
  top: 30vh;
  h1{
    color: #fff;
    font-size: 40px;
  }
  h2{
    font-size: 20px;
    margin: 20px 0;
  }
  .login_button{
    width: 100%;
  }
}
.login_box{
  width:100%;
  height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: cover;
}
</style>