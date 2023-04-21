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
        <div class="userInfo" @click="goLogin">
          <div class="userPic">
            <!-- <svg-icon iconName="notLogin" class="notLogin" ></svg-icon> -->
            <img :src="$store.userPicUrl" alt="" class="headerPic" />
          </div>
          <span class="username">{{$store.userName}}</span>
          <van-icon name="arrow" />
        </div>
        <svg-icon iconName="sweep" class="sweep-icon"></svg-icon>
      </div>
      <div class="blackVIP">
        <div class="topPart">
          <div class="openVIP">
            <span>开通黑胶VIP</span>
            <span class="member">会员中心</span>
          </div>
          <p class="tip">立享超21项专属特权 ></p>
          <div class="line"></div>
          <p class="discount">黑胶低至5折！ 百万份好礼派送！</p>
        </div>
      </div>
      <div class="msg-card">
        <ul>
          <li v-for="item in localData.myMsg" :key="item.id">
            <div>
              <svg-icon :iconName="item.iconName" class="msgIcon"></svg-icon>
              <span class="tit">{{ item.title }}</span>
            </div>
            <van-icon name="arrow" class="right-arrow" />
          </li>
        </ul>
      </div>
      <!-- 音乐服务 -->
      <div class="service-card">
        <ul>
          <li v-for="item in localData.musicService" :key="item.id">
            <div>
              <svg-icon :iconName="item.iconName" class="msgIcon"></svg-icon>
              <span class="tit">{{ item.title }}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 退出按钮 -->
      <div class="loginOut" @click="loginOut">退出登录</div>
    
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import SearchVue from '../../views/SearchCom.vue';
import BannerVue from '../../views/Banner.vue';
import FasteEnterVue from '../../views/FastEnter.vue';
import localData from '../../plugin/localData';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { showConfirmDialog } from 'vant';
import { showLoadingToast } from 'vant';
import { getAPIdata } from '../../server/api';
import {useStore} from '../../store/index'
const $store = useStore()
// 搜索关键字存储
const searchValue = ref('');
// 个人中心抽屉的显示
const showLeft = ref(false);
// 抽屉开关函数
const drawerOpen = () => {
  showLeft.value = true;
};
// 使用路由
const $router = useRouter();

// 跳转到搜索页
const toSearch = () => {
  $router.push('/search');
};

// 登录
const goLogin = () => {};

// 注销
const loginOut = async () => {
  const logout = await getAPIdata('GET', '/logout');
  showConfirmDialog({
    title: '标题',
    message: '确定退出当前账号吗？',
  })
    .then(() => {
      localStorage.removeItem('loginCode');
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        overlay:true,
        duration:1000
      });
      let delay = setTimeout(()=>{
        $router.push('/login');
      },1000)
    })
    .catch(() => {});
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
          background-color: #f7ebeb;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.3rem;
          .username{
            font-size: .35rem;
          }
          .notLogin {
            width: 0.55rem;
            height: 0.55rem;
          }
          .headerPic {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 0.5rem;
          }
        }
      }
      .sweep-icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
    .blackVIP {
      padding: 0.4rem;
      box-sizing: border-box;
      width: 100%;
      border-radius: 0.3rem;
      height: 3.2rem;
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
      .topPart {
        .openVIP {
          font-size: 0.5rem;
          color: #fbe6e8;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.1rem;
          .member {
            font-size: 0.35rem;
            padding: 0.2rem 0.3rem;
            border: 1px solid #cfbcbe;
            border-radius: 0.4rem;
            color: #cfbcbe;
          }
        }
        .tip {
          font-size: 0.35rem;
          color: #968a8a;
        }
        .line {
          width: 100%;
          height: 0.5px;
          background-color: #968a8a;
          margin: 0.35rem 0;
        }
        .discount {
          font-size: 0.35rem;
          color: #968a8a;
        }
      }
    }
    .msg-card,
    .service-card {
      width: 100%;
      background-color: #fff;
      border-radius: 0.3rem;
      padding: 0.1rem 0.3rem;
      box-sizing: border-box;
      ul {
        li {
          display: flex;
          justify-content: space-between;
          padding: 0.35rem 0;
          border-bottom: 1px solid #eeeeee;
          color: @defaultFont;
          &:last-child {
            border-bottom: none;
          }
          div {
            display: flex;
            align-items: center;
            .tit {
              font-size: 0.35rem;
            }
          }
          .msgIcon {
            width: 0.5rem;
            height: 0.5rem;
            margin-right: 0.35rem;
          }
        }
      }
    }
    .service-card {
      margin-top: 0.5rem;
    }
    .loginOut {
      width: 100%;
      padding: 0.4rem 0;
      background-color: #fff;
      margin-top: 0.6rem;
      text-align: center;
      font-size: 0.4rem;
      color: #fa3937;
      border-radius: 0.3rem;
    }
  }
}
</style>
