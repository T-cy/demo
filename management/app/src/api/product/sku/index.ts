import requests from '../../../utils/request'
import type{ SkuResponData } from './type'

enum API{
  //获取已有的sku数据
  SKU_URL='/admin/product/list/',
  //商品的上架和下架
  Sale_URL='/admin/product/onSale/',
  CANCLE_URL='/admin/product/cancelSale/',
  //商品的详细属性信息
  SKUINFO_URL='/admin/product/getSkuInfo/',
  //删除已有的商品
  DELETESKU_URL='/admin/product/deleteSku/'
}

export const reqSkuList=(page:number,limit:number)=>{
  return requests<any,SkuResponData>({
    url:API.SKU_URL+`${page}/${limit}`,
    methos:'get'
  })
}
//商品的上架和下架
export const reqSkuSaleUp=(id:number)=>{
  return requests<any,any>({
    url:API.Sale_URL+`${id}`,
    methos:'get'
  })
}
export const reqSkuSaleCancel=(id:number)=>{
  return requests<any,any>({
    url:API.CANCLE_URL+`${id}`,
    methos:'get'
  })
}
export const reqSkuInfo=(id:number)=>{
  return requests<any,any>({
    url:API.SKUINFO_URL+`${id}`,
    methos:'get'
  })
}
export const reqDeleteSku=(id:number)=>{
  return requests<any,any>({
    url:API.DELETESKU_URL+`${id}`,
    methos:'get',
  })
}