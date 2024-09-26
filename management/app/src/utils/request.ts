//axios的二次封装
//为了使用axios的请求和响应拦截器
import axios from 'axios'
//引入elementplus来实现错误提示
import { ElMessage } from 'element-plus'

//在请求时获取用户信息（将token带过来）
import useUserStore from '../store/modules/user'

//第一步：利用axios对象的create方法区创建axios实例（其他配置：基础路径、超时时间）
let requests=axios.create({
  //基础路径会携带/api
  baseURL: import.meta.env.VITE_APP_BASE_API,
  //超时时间
  timeout: 300000,
  // headers: headers
})

// 第二步：请求与响应拦截器
// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //config配置对象，headers属性请求头，经常给服务器端携带公共参数
    // 返回配置对象


  let userStore= useUserStore();

  //如果存在token，那么header存放token
  if(userStore.token){
    config.headers.token=userStore.token
  }
  

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 成功触发该函数。
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 失败触发该函数。
    // 对响应错误做点什么
    let msg=''
    let status=error.message.status
    switch (status) {
      case 401:
        msg='token过期'
        break;
        case 403:
        msg='无权访问'
        break;
        case 404:
        msg='请求地址错误'
        break;
        case 500:
        msg='服务器出现问题'
        break;
      default:
        msg="网络出现问题"
        break;
    }
    //提示错误信息
    ElMessage({
    message: msg,
    type: 'error',
    })
    return Promise.reject(error);
  });


  export default requests;