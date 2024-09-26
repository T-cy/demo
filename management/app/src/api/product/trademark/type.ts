export interface ResponData{
  code:number,
  message:string,
  ok:boolean
}

//已有品牌的数据类型
export interface TradeMark{
  id?:number,
  tmName:string,
  logoUrl:string
}

//包含全部品牌数据的类型
export type Records=TradeMark[];

//获取已有品牌数据的类型
export interface TradeMarkReaponData extends ResponData{
  data:{
    Records:Records,
    total:number,
    size:number,
    searchCount:boolean,
    page:number
  }
}