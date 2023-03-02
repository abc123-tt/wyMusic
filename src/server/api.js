import service from './index'

export function getBanner(){
  return service({
    method:"GET",
    url:"/banner?type=2",
  })
}