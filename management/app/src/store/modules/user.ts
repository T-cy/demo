//user数据的小仓库
import { defineStore } from "pinia";
import {reqLogin,reqUserInfo,reqLogout} from  "../../api/user/index"
// import { type storeState } from './type'


//静态路由、异步路由、任意路由
import { ConstantRoute,asyncRoute,anyRoute } from '../../router/routes'

import router from '../../router/index'


import cloneDeep from 'lodash/cloneDeep'

//引入数据类型
import { type loginFrom } from '../../api/user/type'

//引入本地存储的方法
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from '../../utils/token'


//过滤异步路由
let filterAsyncRoute=(asyncRoute,routes)=>{
  return asyncRoute.filter(item=>{
    if(routes.includes(item.name)){
      if(item.children &&item.children.length>0){
        //递归过滤
        item.children= filterAsyncRoute(item.children,routes)
      }
      return true
    }
  })
}




let useUserStore = defineStore("User", {
  //user小仓库存储数据的地方
  state(){
    return {
      // token:localStorage.getItem("Token")||''
      token:GET_TOKEN() ||'',
      menuRoute:ConstantRoute,//仓库存储生成菜单的路由
      username:'',
      avatar:'',
    };
  },
  //处理逻辑的地方
  actions:{
    //用户登录的方法
    async userLogin(data:any){
      // console.log(data);
      try {
        let res=await reqLogin(data)
        // console.log(1111111111,res);
        if(res.code==200){
          this.token=(res.data as string)
          // console.log(res.data.token);
          //获取到token还要本地存储
          // localStorage.setItem("Token",(res.data.token as string))
          SET_TOKEN((res.data as string))
          return 'ok'
        }
        else{
          return Promise.reject(new Error(res.data))
        }
        
      } catch (error) {
        console.log(error);       
      }    
    },
    //获取用户信息
    async userMessage(){
      //存储着用户的头像、名字
      let res=await reqUserInfo()
      // console.log(1111111111,res);



      //动态渲染路由信息（每个用户访问的页面是不一样的）
      // console.log(res.data.routes);
      



      if(res.code==200){
        this.username=res.data.name
        this.avatar=res.data.avatar
        // console.log(res.data.routes);

        //过滤异步路由
        let UserAsyncRoute=filterAsyncRoute(cloneDeep(asyncRoute),res.data.routes)
        this.menuRoute=[...ConstantRoute,...UserAsyncRoute,...anyRoute]
        console.log(router.getRoutes());
        
        
        //此时要注册路由
        [...UserAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        
        return 'ok'
      }else{
        return Promise.reject('获取用户信息失败')
      }
      
    },
    //用户退出登录
    async userLogout(){
      let res=await reqLogout()
      console.log(1111111111,res);
      if(res.code==200){
      this.token='',
      this.username='',
      this.avatar='',
      //清除token
      REMOVE_TOKEN()
      return 'ok'
      }else{
        return Promise.reject(new Error(res.message))
      }

      
    }

  },
  //计算属性getter
  getter:{

  }

});

export default  useUserStore;