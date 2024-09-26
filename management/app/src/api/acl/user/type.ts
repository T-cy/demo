
//服务器返回的接口类型
export interface ResponData{
  code:number,
  message:string,
  ok:boolean,
}


//一个账号信息的类型
export interface User{
  id?: number,
  createTime?: string,
  updateTime?: string,
  username: string,
  password: string,
  name:string,
  phone?: null,
  roleName?: string
}


//获取用户账号信息接口返回的类型
export interface UserResponData extends ResponData{
  data:{
    records:User[],
    total: number,
    size: number,
    current: number,
    pages: number
  }
}