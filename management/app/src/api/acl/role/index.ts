import requests from '../../../utils/request'

enum API{
  //获取全部职位的接口
  ALLROLE_URL='/admin/acl/role/',
  //新增岗位的接口地址
  ADDROLE_URL='/admin/acl/role/save',
  //更新已有的职位
  UPDATEROLE_URL='/admin/acl/role/update',
  //获取全部菜单与按钮的数据
  ALLPERMISSION_URL='/admin/acl/permission/toAssign/',
  //给下相应的职位分配权限
  SETPERMISTION_URL='/admin/acl/permission/doAssign/',
  //删除已有的职位
  REMOVEROLE_URL='/admin/acl/role/remove/'
}

export const reqAllRoleList=(page:number,limit:number,roleName:string)=>{
  return requests<any,any>({
    url:API.ALLROLE_URL+`${page}/${limit}/?roleName=${roleName}`,
    method:'get'
  })
}

//添加职位与更新职位
export const reqAddOrUpdateRole=(data)=>{
  if(data.id){
      return requests<any,any>({
        url:API.UPDATEROLE_URL,
        method:'put',
        data
      })
  }
  else{
      return requests<any,any>({
        url:API.ADDROLE_URL,
        method:'post',
        data
      })    
  }
}

  //获取全部菜单与按钮的数据
export const reqAllMenuList=(roleId:number)=>{
  return requests<any,any>({
    url:API.ALLPERMISSION_URL+`${roleId}`,
    method:'get'
  })
}  


export const reqSetPermission=(roleId:number,permissionId:number[])=>{
  return requests<any,any>({
    url:API.SETPERMISTION_URL+`?roleId=${roleId}&permissionId=${permissionId}`,
    method:'post'
  })
}  

export const reqRemoveRole=(id:number)=>{
  return requests<any,any>({
    url:API.REMOVEROLE_URL+`${id}`,
    method:'delete'
  })
}  