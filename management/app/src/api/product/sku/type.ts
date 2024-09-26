//服务器返回的接口类型
export interface ResponData{
  code:number,
  message:string,
  ok:boolean,
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

//sku对象的类型
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


//获取sku接口返回的数据类型
export interface SkuResponData extends ResponData{
  data:{
    records:SkuData[],
    total: number,
    size: number,
    current: number,
    orders: [],
    optimizeCountSql: boolean,
    hitCount: boolean,
    countId: null,
    maxLimit: null,
    searchCount: boolean,
    pages: number
  }
}