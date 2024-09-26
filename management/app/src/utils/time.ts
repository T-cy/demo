//判断时间
let gettime=(hour:number)=>{
if (hour >= 6 && hour < 12) {
      return '早上好';
    } else if (hour >= 12 && hour < 18) {
        return '下午好';
    } else if (hour >= 18 && hour < 24) {
        return '晚上好';
    } else if (hour >= 0 && hour < 6) {
        return '凌晨好';
    }
}
export default gettime;