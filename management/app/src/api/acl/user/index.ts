import requests from '../../../utils/request'
import type{ UserResponData } from './type'

enum API{
  //获取用户管理名单
  ALLUSER_URL='/admin/acl/user/',
  //添加用户
  ADDUSER_URL='/admin/acl/user/save',
  //更新用户
  UPDATEUSER_URL='/admin/acl/user/update',
  //获取全部职位以及当前账号拥有的职位
  ALLROLE_URL='/admin/acl/user/toAssign/',
  //给已有的用户分配角色接口
  SETROLE_URL='/admin/acl/user/doAssignRole',
  //删除单个账号
  DELETEUSER_URL='/admin/acl/user/remove/',
  //批量删除用户
  DELETEALLUSER_URL='/admin/acl/user/batchRemove'
}

//获取全部用户管理的信息
export const reqAllUser=(page:number,limit:number,username:string)=>{
  return requests<any,UserResponData>({
    url:API.ALLUSER_URL+`${page}/${limit}/?username=${username}`,
    method:'get'
  })
}

//添加用户
export const reqAddOrUpdateUser=(data:User)=>{
  if(data.id){
      return requests<any,any>({
        url:API.UPDATEUSER_URL,
        method:'put',
        data
      })
  }
  else{
      return requests<any,any>({
        url:API.ADDUSER_URL,
        method:'post',
        data
      })
  }
}

//获取全部职位以及当前账号拥有的职位
export const reqAllRole=(adminId:number)=>{
  return requests<any,any>({
    url:API.ALLROLE_URL+`${adminId}`,
    method:'get'
  })
}

//分配职务
export const reqSetUserRole=(data:any)=>{
  return requests<any,any>({
    url:API.SETROLE_URL,
    method:'post',
    data
  })
}

//删除单个账号
export const reqDeleteUser=(id)=>{
  return requests<any,any>({
    url:API.DELETEUSER_URL+`${id}`,
    method:'delete'
  })
}

//批量删除用户
export const reqDeleteAllUser=(data)=>{
  return requests<any,any>({
    url:API.DELETEALLUSER_URL,
    data,
    method:'delete',
  })
}