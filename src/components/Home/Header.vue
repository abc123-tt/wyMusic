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
          <img
            class="songIcon"
            src="../../assets/image/songIcon.svg"
            alt=""
          >
        </template>
      </SearchVue>

      <!-- <SearchPage v-else>
        <template #backHome>
          返回
        </template>
        <template #search>
          搜素框
        </template>
        <template #font>
          搜索
        </template>
      </SearchPage> -->
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
// import SearchPage from '../SearchPage.vue'



const searchValue = ref("");
// 消息抽屉的显示
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
    font-size: 25px;
    color: #fff;
  }
  .searchCom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 15px;
    background-color: #c02532;
    padding: 10px;
    .songIcon {
      width: 5.667vw;
    }
    .search-input {
      background-color: transparent;
      font-size: 1.6vw;
      width: 100%;
      padding: 0;
      margin: 0 10px;
      .van-search__content {
        border-radius: 25px !important;
        // background: #dbe6f6; /* fallback for old browsers */
        // background: -webkit-linear-gradient(
        //   to left,
        //   #eebef1,
        //   #c2d5f1
        // ); /* Chrome 10-25, Safari 5.1-6 */
        // background: linear-gradient(
        //   to left,
        //   #eebef1,
        //   #c2d5f1
        // ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: #666;
        ::placeholder {
          color: #999;
        }
      }
    }
  }
  main,footer{
    padding:0 10px;
  }
}
</style>
