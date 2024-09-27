export const SetBgcColor=(value)=>{
  return localStorage.setItem('LocalColor',value)
}

export const BgcColor=()=>{
  const html=document.documentElement
  getComputedStyle(html).getPropertyValue(`--el-color-primary`)
  return  html.style.setProperty('--el-color-primary',localStorage.getItem('LocalColor'))
}