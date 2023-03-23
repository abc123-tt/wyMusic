import service from './index'
// 获取数据函数
// export function getAPIdata(...obj){
//   return service({
//     method:obj[0],
//     url:obj[1],
//     data:obj[2]
//   })
// }
export function getAPIdata(method,url,data){
  return service({
    method,
    url,
    data
  })
}


