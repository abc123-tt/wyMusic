import { createRouter, createWebHistory } from "vue-router";


// 这个RouterRecordRaw规定了必须要传入一个path和components
const routes = [
  {
    path:"/",
    name:"home",
    redirect:"/discovery",
    component:()=>import("../components/Home/Home.vue"),
    children:[
      {
        path:'discovery',
        name:'discovery',
        component:()=>import("../components/Discovery.vue")
      },
      {
        path:'podcast',
        name:'podcast',
        component:()=>import('../components/Podcast.vue')
      },
      {
        path:'mine',
        name:'mine',
        component:()=>import('../components/Mine.vue')
      },
      {
        path:'attention',
        name:'attention',
        component:()=>import('../components/Attention.vue')
      },
      {
        path:'community',
        name:'community',
        component:()=>import('../components/Community.vue')
      },
    ]
  },
  {
    path:"/search",
    // 路由懒加载，会进行代码分割，不会打包到一起
    component:()=>import("../components/item/SearchPage.vue")
  },
  {
    path:"/searchlist",
    name:'searchlist',
    component:()=>import('../components/item/SearchList.vue')
  },
  {
    path:'/detail',
    name:'detail',
    component:()=>import('../views/MusicDetail.vue')
  },
  {
    path:'/player',
    name:'player',
    component:()=>import('../components/Player.vue')
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router