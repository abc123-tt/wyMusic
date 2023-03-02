// 封装获取rem大小的函数
function remSize(){
  // 获取设备的宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  // 设置宽度
  // 按750计算（普遍是750），超出也按750适配
  if(deviceWidth>=750) deviceWidth = 750
  if(deviceWidth<=320) deviceWidth = 320
  // 设置rem
  // 750px --> 1rem = 75px,375px --> 1rem = 37.5px
  document.documentElement.style.fontSize = (deviceWidth/10)+'px' 

  // 设置字体大小
  // 0.3 * 37.5 = 15px
  document.querySelector('body').style.fontSize = 0.3+'rem'
}
remSize()
// 在移动端不同屏幕上面显示时，视图窗口大小不一。 window.resize是窗口大小改变时触发的事件。
window.onresize = () =>{
  remSize()
}