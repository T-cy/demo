// layout组件的小仓库
import { defineStore } from 'pinia'

let useLayoutStore=defineStore("SettingStore",{
  state:()=>{
    return{
      flod:false,//用于决定菜单折叠还是收起
      reflsh:false,//判断是否刷新
    }
  }
})

export default useLayoutStore;