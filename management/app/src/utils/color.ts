

export const BgcColor=(value='rgba(199, 21, 133, 0.46)')=>{
  let color=value
  localStorage.setItem('LocalColor',color)
  const html=document.documentElement
  // getComputedStyle(html).getPropertyValue(`--el-color-primary`)
  return  html.style.setProperty('--el-color-primary',localStorage.getItem('LocalColor'))
}