<template>
  <div class="box">
    <header>
      <!-- 搜索 -->
      <SearchVue class="searchCom">
        <!-- 菜单按钮 -->
        <template #menuBtn >
          <van-icon
            class="menu-icon"
            name="wap-nav"
            @click="drawerOpen"
          />
        </template>
        <!-- 搜索框 -->
        <template #searchBox>
          <van-search
            class="search-input"
            v-model="searchValue"
            placeholder="张学友"
            @click="toSearch"
          />
        </template>
        <!-- 听歌识曲Icon -->
        <template #songIcon>
          <svg-icon class="songSvg" iconName="songIcon"></svg-icon>
        </template>
      </SearchVue>
    </header>
    <main>
      <!-- 轮播图 -->
      <BannerVue></BannerVue>
    </main>
    <footer>
      <!-- 快速入口 -->
      <FasteEnterVue></FasteEnterVue>
    </footer>

    <!-- 左侧弹出 -->
<van-popup
  v-model:show="showLeft"
  position="left"
  :style="{ width: '80%', height: '100%' }"
/>

  </div>
</template>
<script setup lang='ts'>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchVue from "../../views/SearchCom.vue";
import BannerVue from "../../views/Banner.vue";
import FasteEnterVue from "../../views/FastEnter.vue";
// 搜索关键字存储
const searchValue = ref("");
// 个人中心抽屉的显示
const showLeft = ref(false)
// 抽屉开关函数
const drawerOpen = () =>{
  showLeft.value = true
}
// 使用路由
const router = useRouter()
// 跳转到搜索页
const toSearch = ()=>{
  router.push('/search')
}
</script>
<style lang='less'>
.box {
  .menu-icon {
    font-size: .7rem;
    color: #fff;
  }
  .searchCom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: .25rem;
    background-color: #da4036;
    padding: .2rem .25rem;
    
    .search-input {
      background-color: transparent;
      font-size: .1rem;
      width: 100%;
      padding: 0;
      margin: 0 .2rem;
      .van-search__content {
        border-radius: .4rem !important;
        color: #666;
        ::placeholder {
          color: #999;
        }
      }
    }
  }
  main,footer{
    padding:0 .25rem;
  }
  .songSvg{
    width: .8rem;
    height: .8rem;
  }
}
</style>
