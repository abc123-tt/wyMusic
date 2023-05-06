import { createRouter, createWebHistory } from "vue-router";
import {useStore} from '../store/index'

// 这个RouterRecordRaw规定了必须要传入一个path和components
const routes = [
  {
    path:"/",
    name:"home",
    redirect:"/login",
    component:()=>import("../components/Home/Home.vue"),
    children:[
      {
        path:'discovery',
        name:'discovery',
        component:()=>import("../components/Home/Discovery.vue")
      },
      // {
      //   path:'podcast',
      //   name:'podcast',
      //   component:()=>import('../components/Home/PodCast.vue')
      // },
      {
        path:'mine',
        name:'mine',
        component:()=>import('../components/Home/Mine.vue')
      },
      // {
      //   path:'attention',
      //   name:'attention',
      //   component:()=>import('../components/Home/Attention.vue')
        
      // },
      // {
      //   path:'community',
      //   name:'community',
      //   component:()=>import('../components/Home/Community.vue')
      // },
    ]
  },
  {
    path:"/search",
    // 路由懒加载，会进行代码分割，不会打包到一起
    component:()=>import("../components/searchItem/SearchPage.vue")
  },
  {
    path:"/searchlist",
    name:'searchlist',
    component:()=>import('../components/searchItem/SearchList.vue')
  },
  {
    path:'/detail',
    name:'detail',
    component:()=>import('../views/MusicDetail.vue')
  },
  {
    path:'/player',
    name:'player',
    component:()=>import('../components/Lyric.vue'),
    meta:{
      keepAlive:true
    }
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../components/Login.vue')
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  const $store = useStore()
  if(to.path ==  '/login'){
    $store.isPlayCom = false
    next()       
  }else{
    // const cookie = localStorage.getItem('loginCookie')
    $store.isPlayCom = true
    // if(!cookie) return next('/login')
    next()
  }
  
  
})

export default router