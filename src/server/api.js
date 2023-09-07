import service from './index'
export function getAPIdata(method,url,data){
  return service({
    method,
    url,
    data
  })
}


