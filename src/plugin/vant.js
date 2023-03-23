// 1. 引入你需要的组件
import  {
  Icon,
  Search,
  Popup,
  Overlay,
  Swipe,
  SwipeItem,
  ActionSheet,
  Sticky ,
  List,
  Button
}  from 'vant';

let plugins = [
  Icon,
  Search,
  Popup,
  Overlay,
  Swipe,
  SwipeItem,
  ActionSheet,
  Sticky ,
  List,
  Button
]
// 将app传进来之前要先暴露函数
export default function getVant(app){
  plugins.forEach(item=>{
    return app.use(item)
  })
}