// 封装本地存储数据和读取数据的方法
export const SET_TOKEN=(token:string)=>{
  return  localStorage.setItem("Token",token)
}

export const GET_TOKEN=()=>{
  return localStorage.getItem("Token")
}

export const REMOVE_TOKEN=()=>{
  return localStorage.removeItem("Token")
}