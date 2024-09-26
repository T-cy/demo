//spu接口
import requests from '../../../utils/request'
import {type HasSpu,type AllTrademarkResponData,type SpuHasImage,type SaleAttrResponData,type HasSaleAttrResponData ,type SkuData,type SkuInfoData } from './type'




enum API{
  //获取已有的spu
  HASSPU_URL='/admin/product/',
  //获取全部品牌
  ALLTRADEMARK_URL='/admin/product/baseTrademark/getTrademarkList',
  //获取品牌的照片墙
  IMAGE_URL='/admin/product/spuImageList/',
  //获取某一个spu下的全部已有的销售属性
  SPUHASSALEATTR_URL='/admin/product/spuSaleAttrList/',
  //获取整个项目全部的销售属性【颜色、版本、尺寸】
  ALLSALEATTR_URL='/admin/product/baseSaleAttrList',
  //追加一个新的spu
  ADDSPU_URL='/admin/product/saveSpuInfo',
  //更新已有的spu
  UPDATESPU_URL='/admin/product/updateSpuInfo',
  //删除sku
  DELETESPU_URL='/admin/product/deleteSpu/',
  //添加一个新的sku
  ADDSKU_URL='/admin/product/saveSkuInfo',
  //查看某一个已有的全部售卖商品sku
  SKUINFO_URL='/admin/product/findBySpuId/'
}

//获取已有的spu接口
export const reqHasSpu=(page:number,limit:number,c3id:number|string)=>{
  return requests<any,HasSpu>({
    url:API.HASSPU_URL+`${page}/${limit}?category3Id=${c3id}`,
    method:'get',
  })
}

//获取全部品牌的数据
export const reqAllTrademark=()=>{
  return requests<any,AllTrademarkResponData>({
    url:API.ALLTRADEMARK_URL,
    method:'get'
  })
}

//获取已有spu照片墙的接口
export const reqImageList=(id:number)=>{
  return requests<any,SpuHasImage>({
    url:API.IMAGE_URL+`${id}`,
    method:'get'
  })
}

//获取某一个已有的SPU拥有的销售属性
export const reqSpuHasSaleAttr=(id)=>{
  return requests<any,SaleAttrResponData>({
    url:API.SPUHASSALEATTR_URL+`${id}`,
    method:'get'
  })
}

//获取全部的销售属性
export const reqAllSaleAttr=()=>{
    return requests<any,HasSaleAttrResponData>({
    url:API.ALLSALEATTR_URL,
    method:'get'
  })
}

//添加一个新的spu
//更新已有的spu
//data就是新增的对象或者已有的spu对象
export const reqAddOrUpdate=(data)=>{
  //如果有id那么就是修改
  if(data.id){
    return requests<any,any>({
      url:API.UPDATESPU_URL,
      method:'post',
      data
    })
  }
  //没有id就是新增
  else{
    return requests<any,any>({
      url:API.ADDSPU_URL,
      method:'post',
      data
    })
  }
    
}


//删除spu
export const reqDeletSpu=(id)=>{
    return requests<any,any>({
    url:API.DELETESPU_URL+`${id}`,
    method:'delete'
  })
}


//添加sku
 export const reqAddSku=(data:SkuData)=>{
    return requests<any,any>({
    url:API.ADDSKU_URL,
    method:'post',
    data
  })
}


//获取sku的数据
 export const reqSkuList=(spuid:number|string)=>{
    return requests<any,SkuInfoData>({
    url:API.SKUINFO_URL+`${spuid}`,
    method:'get',
  })
}







