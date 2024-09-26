//服务器返回的接口类型
export interface ResponData{
  code:number,
  message:string,
  ok:boolean,
}


//spu数据类型
export interface SpuData{
  id?: number,
  spuName: string,
  description: string,
  category3Id: string|number,
  tmId: number,
  spuSaleAttrList: null,
  spuImageList: null,
}

//数组：元素都是已有spu的数据类型
export type Records=SpuData[]

//获取已有spu接口返回的数据类型
export interface HasSpu extends ResponData{
  data:{
    records:Records,
    total:number,
    size:number,
    current:number,
    searchCount:boolean,
    pages:number
  }
}

//获取全部品牌的数据
export interface TradeMark{
  id: number,
  tmName: string,
  logoUrl: string,
}

//获取所有品牌的数据的接口数据返回类型
export interface AllTrademarkResponData extends ResponData{
  data:TradeMark[]
} 

//商品照片墙的数据类型
export interface SpuImage{
  id: number,
  imgName?: string,
  imgUrl?: string,
  spuId: number,
  name?:string,
  url?:string
}

//照片墙接口返回的数据类型
export interface SpuHasImage extends ResponData{
  data:SpuImage[]
}

//销售属性值
export interface SaleAttrValue{
  id?: number,
  createTime: null,
  updateTime: null,
  spuId: number,
  baseSaleAttrId: number,
  saleAttrValueName: string,
  saleAttrName: string,
  isChecked: null,
}

//存储已有的销售属性值的数组类型
export type spuSaleAttrValueList=SaleAttrValue[]

//销售属性
export interface SaleAttr{
  id?: number,
  createTime: null,
  updateTime: null,
  spuId: number,
  baseSaleAttrId: number,
  saleAttrName: string,
  spuSaleAttrValueList:spuSaleAttrValueList,
}

//服务器返回的销售属性数据类型
export interface SaleAttrResponData extends ResponData{
  data:SaleAttr[]
}

//已有的全部spu返回类型
export interface HasSaleAttr{
  id:number,
  name:string
}

//已有的数据类型返回的接口数据类型
export interface HasSaleAttrResponData extends ResponData{
  data:HasSaleAttr[]
}


//平台属性
export interface Attr{
    attrId: string|number,//属性id
    valueId: string|number,//属性值id
}
//销售属性
export interface saleAttr{
    saleAttrId: string|number,//属性id
    saleAttrValueId: string|number,//属性值id 
}

//新增sku传给服务器的data的数据类型
export interface SkuData{
    category3Id: string|number,//三级分类id
    spuId: string|number,//已有的spu的id
    tmId: string|number,//品牌的id
    skuName: string,//新增的sku的名字
    price: string|number,//新增的sku价格
    weight: string|number,//新增sku的重量
    skuDesc: string,//新增sku的描述
    skuAttrValueList?: Attr[],//平台属性
    skuSaleAttrValueList?: saleAttr[],//销售属性
    skuDefaultImg: string,//sku图片的地址
}


//获取sku数据接口返回的数据
export interface SkuInfoData extends ResponData{
  data:SkuData{}
}