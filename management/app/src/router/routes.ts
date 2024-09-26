import login from '../view/login/login.vue'
import home from '../view/home/home.vue'
import failRoute from '../view/404/failRoute.vue'
import layout from '../layout/layout.vue'
import screen from '../view/screen/screen.vue'
import user from '../view/acl/user/user.vue'
import role from '../view/acl/role/role.vue'
import permission from '../view/acl/permission/permission.vue'
import Acluser from '../view/acl/user/user.vue'
import Aclrole from '../view/acl/role/role.vue'
import Aclpermission from '../view/acl/permission/permission.vue'
import attr from '../view/product/attr/attr.vue'
import sku from '../view/product/sku/sku.vue'
import spu from '../view/product/spu/spu.vue'
import trademark from '../view/product/trademark/trademark.vue'

//路由信息静态
export const ConstantRoute=[
  // 登录路由
  {
    path:'/login',
    name:'login',
    component:login,
    meta:{
      title:'登录',//菜单需要的标题
      hidden:false,
      icon:"Position",
    }
  },
  // 主页路由
  {
    path:'/',
    redirect:'/home',
    name:'',
    component:layout,
    meta:{
      title:'',//菜单需要的标题
       hidden:true,
       icon:"",
    },
    children:[
      {
        path:'/home',
        component:home,
        meta:{
          title:'首页',//菜单需要的标题
           hidden:true,
           icon:"House",
        },        
      },
    ]
  },
  // 404路由
  {
    path:'/404',
    name:'404',
    component:failRoute,
    meta:{
      title:'404',
       hidden:false,
       icon:"Refresh",
    },
  },
  // 数据大屏路由
  {
    path:'/screen',
    name:'screen',
    component:screen,
    meta:{
      title:'数据大屏',
      hidden:true,
      icon:'Monitor'
    }
  }
 ]


 //异步路由
 export const asyncRoute=[

  //权限管理
  {
    path:'/acl',
    name:'Acl',
    component:layout,
    redirect:'/acl/user',
    meta:{
      title:'权限管理',
      hidden:true,
      icon:"Lock"
    },
    children:[
      {
        path:'/acl/user',
        name:'User',
        component:Acluser,
        meta:{
          title:'用户管理',
          hidden:true,
          icon:'User',
        },
      },
      {
        path:'/acl/role',
        name:'Role',
        component:Aclrole,
        meta:{
          title:'角色管理',
          hidden:true,
          icon:'UserFilled',
        }
      },
      {
        path:'/acl/permission',
        name:'Permission',
        component:Aclpermission,
        meta:{
          title:'菜单管理',
          hidden:true,
          icon:'Monitor',
        }
      },      
    ]
  },
  // 商品模块路由
  {
    path:'/product',
    name:'Product',
    component:layout,
    redirect:'/product/trademark',
    meta:{
      title:'商品管理',
      hidden:true,
      icon:'Goods'
    },
    children:[
      {
        path:'/product/trademark',
        name:'Trademark',
        component:trademark,
        meta:{
          title:'品牌管理',
          hidden:true,
          icon:'ShoppingCartFull'
        },        
      },
      {
        path:'/product/attr',
        name:'Attr',
        component:attr,
        meta:{
          title:'属性管理',
          hidden:true,
          icon:'ChromeFilled'
        },        
      },    
      {
        path:'/product/sku',
        name:'Sku',
        component:sku,
        meta:{
          title:'sku管理',
          hidden:true,
          icon:'Calendar'
        },        
      },       
      {
        path:'/product/spu',
        name:'Spu',
        component:spu,
        meta:{
          title:'spu管理',
          hidden:true,
          icon:'Calendar'
        },        
      },                  
    ]
  },


 ]

 //任意路由
 export const anyRoute=[
  // 其他路由
  {
    path:'/:pathMatch(.*)*',
    redirect:'/404',
    name:'any',
    meta:{
      title:'任意路由',
       hidden:false,
       icon:"Refresh",
    },
  },
 ]