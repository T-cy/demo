//管理用户相关的接口
import requests from '../../utils/request'

//引入类型限制
import { type loginFrom,type loginResponseData,type userInfoResponseData} from './type'

//这个是mock的接口
//统一管理接口
// enum API{
//   LOGIN_URL="/user/login",
//   USERINFO_URL="/user/info"
// }
// //对外暴露请求函数
// //登录
// export const reqLogin=(data:loginFrom)=>{
// return requests<any,loginResponseData>({
//   url:API.LOGIN_URL,
//   method:'post',
//   data
// })
// }

// //获取用户信息
// export const reqUserInfo=()=>{
// return  requests<any,userResponData>({
//   url:API.USERINFO_URL,
//   method:'get',
// })
// }



//这个是真实的接口
enum API{
  LOGIN_URL="/admin/acl/index/login",
  USERINFO_URL="/admin/acl/index/info",
  LOGOUT_URL="/admin/acl/index/logout"
}


//登录
// loginFrom约束携带参数的类型，loginResponseData限制接口返回参数的类型
export const reqLogin=(data:loginFrom)=>{
return requests<any,loginResponseData>({
  url:API.LOGIN_URL,
  method:'post',
  data
})
}


//获取用户信息
export const reqUserInfo=()=>{
return  requests<any,userInfoResponseData>({
  url:API.USERINFO_URL,
  method:'get',
})
}

//退出登录
export const reqLogout=()=>{
return  requests<any,any>({
  url:API.LOGOUT_URL,
  method:'post',
})
}