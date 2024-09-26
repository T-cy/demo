import requests from '../../../utils/request'

//属性管理接口
enum API{
  //获取一级分类的接口
  C1_URL='/admin/product/getCategory1',
  C2_URL='/admin/product/getCategory2/',
  C3_URL='/admin/product/getCategory3/',
  //获取已有属性的属性值
  ATTR_URL='/admin/product/attrInfoList/',
  //添加或者修改已属性
  ADDORUPDATEATTR_URL='/admin/product/saveAttrInfo',
  //删除已有商品属性
  DELETEATTR_URL='/admin/product/deleteAttr/'
}

// 获取一级分类的接口
export const reqC1=()=>{
  return requests<any,any>({
    url:API.C1_URL,
    method:'get'
  })
}

// 获取二级路由接口
export const reqC2=(id2:number)=>{
  return requests<any,any>({
    url:`${API.C2_URL}+${id2}`,
    method:'get'
  })
}

// 获取三级路由接口
export const reqC3=(id3:number)=>{
  return requests<any,any>({
    url:API.C3_URL+id3,
    method:'get'
  })
}

//获取对应分类下的属性和属性值
export const reqAttr=(category1Id,category2Id,category3Id)=>{
  return requests({
    url:API.ATTR_URL+`${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
  })
}

//添加或者修改已有的商品属性
export const reqAddOrUpdateAttr=(data)=>{
  return requests({
    url:API.ADDORUPDATEATTR_URL,
    method:'post',
    data
  })
}

//删除已有属性的接口
export const reqDeleteAttr=(attrId)=>{
  return requests({
    url:API.DELETEATTR_URL+`${attrId}`,
    method:'delete'
  })
}