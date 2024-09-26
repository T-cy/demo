//品牌管理的接口
import requests from '../../../utils/request'

//类型限制
import {type TradeMarkReaponData,type TradeMark} from './type'

//品牌管理的接口地址
enum API{
  //获取已有品牌的接口
  TRADEMARK_URL="/admin/product/baseTrademark",
  //添加品牌的接口
  ADDTRADEMARK_URL="/admin/product/baseTrademark/save",
  //修改品牌的接口
  UPDATETRADEMARK_URL="/admin/product/baseTrademark/update",
  //删除已有商品的接口
  DELETETRADEMARK_URL="/admin/product/baseTrademark/remove/"
}

//获取已有品牌的接口
export const reqHasTrademark=(page:number,limit:number)=>{
  return requests<any,TradeMarkReaponData>({
    url:`${API.TRADEMARK_URL}/${page}/${limit}`,
    // query:{
    //   page:page,
    //   limit:limit
    // },
    method:'get'
  })
}

//添加与修改商品的接口
export const reqAddOrUpdateTrademark=(data:TradeMark)=>{
  //有id那就是修改已有品牌的接口
  if(data.id){
    return requests<any,any>({
      url:API.UPDATETRADEMARK_URL,
      method:"put",
      data,
    })
  }
  //没有id那就是新增品牌的接口
  else{
    return requests<any,any>({
      url:API.ADDTRADEMARK_URL,
      method:"post",
      data
    })
  }
}

//删除已有品牌的接口
export const reqDeleteTrademark=(id:number)=>{
  return requests<anny,any>({
    url:`${API.DELETETRADEMARK_URL}+${id}`,
    method:'delete'
  })
}