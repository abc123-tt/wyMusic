<template>
  <div class="box">
    <header>
      <!-- 搜索 -->
      <SearchVue class="searchCom">
        <!-- 菜单按钮 -->
        <template #menuBtn>
          <van-icon class="menu-icon" name="wap-nav" @click="drawerOpen" />
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
      class="showLeft"
    >
      <div class="user-box">
        <div class="userInfo">
          <img src="" alt="" class="userPic" />
          <span class="username">立即登录</span>
          <van-icon name="arrow" />
        </div>
        <svg-icon iconName="sweep" class="sweep-icon"></svg-icon>
      </div>
      <div class="blackVIP">
        
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchVue from '../../views/SearchCom.vue';
import BannerVue from '../../views/Banner.vue';
import FasteEnterVue from '../../views/FastEnter.vue';
// 搜索关键字存储
const searchValue = ref('');
// 个人中心抽屉的显示
const showLeft = ref(true);
// 抽屉开关函数
const drawerOpen = () => {
  showLeft.value = true;
};
// 使用路由
const router = useRouter();

// 跳转到搜索页
const toSearch = () => {
  router.push('/search');
};
</script>
<style lang="less">
@defaultFont: '黑体';
.box {
  .menu-icon {
    font-size: 0.7rem;
    color: #fff;
  }
  .searchCom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 0.25rem;
    background-color: #da4036;
    padding: 0.2rem 0.25rem;

    .search-input {
      background-color: transparent;
      font-size: 0.1rem;
      width: 100%;
      padding: 0;
      margin: 0 0.2rem;
      .van-search__content {
        border-radius: 0.4rem !important;
        color: #666;
        ::placeholder {
          color: #999;
        }
      }
    }
  }
  main,
  footer {
    padding: 0 0.25rem;
  }
  .songSvg {
    width: 0.8rem;
    height: 0.8rem;
  }

  // 左侧弹出
  .showLeft {
    padding: 0.4rem 0.35rem;
    background-color: #f6f6f6;
    .user-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .userInfo {
        display: flex;
        align-items: center;
        font-size: 0.4rem;
        font-family: @defaultFont;
        .userPic {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 0.5rem;
          margin-right: 0.2rem;
          // border:1px solid #ccc;
        }
      }
      .sweep-icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
    .blackVIP {
      width: 100%;
      border-radius: 0.3rem;
      height: 3rem;
      background: #3e3939; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to left,
        #5b4d4a,
        #3e3939
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to left,
        #5b4d4a,
        #3e3939
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

      margin: 0.6rem 0;
    }
  }
}
</style>
