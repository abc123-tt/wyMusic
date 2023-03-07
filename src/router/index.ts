import { createRouter, createWebHistory } from "vue-router";


// 这个RouterRecordRaw规定了必须要传入一个path和components
const routes = [
  {
    path:"/",
    name:"home",
    component:()=>import("../components/Home/Home.vue")
  },
  {
    path:"/search",
    // 路由懒加载，会进行代码分割，不会打包到一起
    component:()=>import("../components/SearchPage.vue")
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router