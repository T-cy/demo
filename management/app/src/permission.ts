//路由鉴权，就是某个路由什么条件下可以被访问，什么条件下不可以被访问
import router from './router/index'

//进度条
import nprogress from 'nprogress'
//进度条样式
import "nprogress/nprogress.css"

// 获取user的小仓库，判断用户是否登录成功
// import pinia from './store/index'
import useUserStore from './store/modules/user'


//全局前置守卫
router.beforeEach(async(to, from) => {

let userStore=useUserStore()


  // ...
  // 返回 false 以取消导航
  nprogress.start()

  //用户登录判断
  if(userStore.token){
    //登录成功，跳转登录，不可以
    if(to.path=='/login'){
      return false
    }else{
      //登录成功访问除了登录页面
      if (userStore.username) {
        return true
      } else {
        //如果没有用户信息，那么发路由请求
        try {
          await userStore.userMessage()
          //万一刷新的时候是异步路由，有可能获取用户信息，异步路由没有加载完毕
          // console.log(11111111111,to);
          //继续当前的导航，不做任何改变
          // if(to.path=='/:pathMatch(.*)*'){
          //   return '/404'
          // }
          return ({...to})
          //  return true 
          
        } catch (error) {
          //这种情况就是token过期，退出登录，重新跳转到登录页面
          // console.log(error.message);
          await userStore.userLogout()
          return '/login'
          
        }
        
      }
    }
  }else{
    // 用户未登录判断
    if(to.path=='/login'){
      return true
    }else{
      return {path:'/login',query:{redirect:to.path}}
    }
  }
  
})

router.afterEach((to, from) => {
  nprogress.done()
})


// 登录、404、home、任意路由、数据大屏、权限管理（3个子路由）、商品管理（4个子路由）

// 用户未登录，可以去login，其他路由不能去
// 用户登录成功，不能去登录页，其余路由可以访问

