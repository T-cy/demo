//定义数据的类型

//登录接口需要携带的数据类型
export interface loginFrom{
  username:string,
  password:string,
}


//接口返回的数据类型，父类，后面的子类会继承
export interface ResponseData{
  code:number,
  message:string,
  ok:boolean
}


// 登录接口返回数据的数据类型
//继承
export interface loginResponseData extends ResponseData{
  data:string
}



// 服务器返回用户信息相关数据的类型
export  interface userInfoResponseData extends ResponseData{
  data:{
    routes:string[],
    button:string[],
    roles:string[],
    name:string,
    avatar:string
  }
}