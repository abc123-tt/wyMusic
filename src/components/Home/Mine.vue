<template>
  <div class="container">
    <!-- 用户信息 -->
    <div class="userinfo-card">
      <img
        :src="data.accountDetail.profile?.avatarUrl"
        alt=""
        class="headPic"
      />
      <div class="info">
        <h1 class="nickName">{{ data.accountDetail.profile?.nickname }}</h1>
        <p class="baseinfo">
          <!-- 加上可选链操作符之后才能访问到profile里的数据 -->
          <span>{{ data.accountDetail.profile?.follows }} 关注</span>
          <span>{{ data.accountDetail.profile?.followeds }} 粉丝</span>
          <span>Lv {{ data.accountDetail.level }}</span>
        </p>
      </div>
    </div>
    <!-- 我喜欢的音乐 -->
    <div class="loveMusic" @click="toDetail">
      <img class="lovePic" :src="data.loveMusic.coverImgUrl" alt="" />
      <div class="loveName">
        <b>我{{ data.loveMusic.name }}</b>
        <span>{{ data.loveMusic.trackCount }}首</span>
      </div>
    </div>

    <!-- 歌单部分 -->
    <div class="playList">
      <van-tabs
        v-model:active="current"
        scrollspy
        sticky
        background="#ecebec"
        color="#f6314e"
        title-inactive-color="#9896a3"
        title-active-color="#272f3e"
      >
        <van-tab title="创建歌单">
          <div class="content createList">
            <div class="createTit">
              <span class="creLeft"
                >创建歌单({{ data.myCreateList.length }}个)</span
              >
              <div class="creRight">
                <van-icon name="plus" />
                <font-awesome-icon class="more-icon" icon="ellipsis-vertical" />
              </div>
            </div>
            <!-- 歌单列表 -->
            <ul>
              <li
                class="listItem"
                v-for="(item, index) in data.myCreateList"
                :key="index"
                @click="listDetail(item.id)"
              >
                <img :src="item.coverImgUrl" alt="" class="listPic" />
                <div class="listName">
                  <b>{{ item.name }}</b>
                  <span>{{ item.trackCount }}首</span>
                </div>
                <font-awesome-icon class="more-icon" icon="ellipsis-vertical" />
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="收藏歌单">
          <div class="content starList">
            <div class="createTit">
              <span class="creLeft"
                >收藏歌单({{ data.myStarList.length }}个)</span
              >
              <div class="rightIcon">
                <font-awesome-icon class="more-icon" icon="ellipsis-vertical" />
              </div>
            </div>
            <!-- 歌单列表 -->
            <ul>
              <li
                class="listItem"
                v-for="(item, index) in data.myStarList"
                :key="index"
                @click="listDetail(item.id)"
              >
                <img :src="item.coverImgUrl" alt="" class="listPic" />
                <div class="listName">
                  <b>{{ item.name }}</b>
                  <span>{{ item.trackCount }}首</span>
                </div>
                <font-awesome-icon class="more-icon" icon="ellipsis-vertical" />
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="歌单助手">
          <div class="content helper">
            <p class="title">歌单助手</p>
            <div class="content">
              <p class="tip">你可以从歌单中筛选出</p>
              <div class="filter">
                <span class="keyOne">张学友</span>
                <span class="keyTow">80年代</span>
                <span>老歌</span>
              </div>
              <van-button round type="danger"><span>试试看</span></van-button>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, toRef, toRaw, ref } from 'vue';
import { useStore } from '../../store/index';
import { getAPIdata } from '../../server/api';
import { useRouter } from 'vue-router';
const $router = useRouter();
const $store = useStore();
let data = reactive({
  userPlaylist: [],
  accountDetail: [],
  // 喜欢的音乐
  loveMusic: [],
  // 创建歌单
  myCreateList: [],
  // 收藏歌单
  myStarList: [],
});
const current = ref<string>();
const listDetail = (id) => {
  $router.push({
    path: '/detail',
    query: {
      id,
    },
  });
};

onMounted(async () => {
  let userID = localStorage.getItem('userID');
  // 账号详细信息
  const accountInfo = await getAPIdata('GET', `/user/detail?uid=${userID}`);
  data.accountDetail = accountInfo.data;
  // console.log(data.accountDetail);

  // 请求用户的歌单
  const mylist = await getAPIdata('GET', `/user/playlist?uid=${userID}`);
  data.myCreateList = mylist.data.playlist.splice(1, 13);

  data.myStarList = mylist.data.playlist.splice(1, 7);

  data.loveMusic = mylist.data.playlist[0];
  data.loveMusic.name = data.loveMusic.name.slice(4);
});
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  background-color: #ecebec;
  padding: 0.5rem 0.4rem;
  box-sizing: border-box;
  position: relative;
  .userinfo-card {
    width: 100%;
    background-color: #fff;
    border-radius: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    height: 2.8rem;
    .headPic {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      position: absolute;
      top: 10px;
    }
    .info {
      text-align: center;
      .nickName {
        font-size: 0.5rem;
        font-weight: 700;
        margin-top: 0.5rem;
      }
      .baseinfo {
        margin-top: 0.3rem;
        color: #666;

        span {
          margin-right: 0.5rem;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .loveMusic {
    padding: 0.4rem;
    background-color: #fff;
    display: flex;
    margin: 0.5rem 0;
    border-radius: 0.3rem;

    .lovePic {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 0.3rem;
    }
    .loveName {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.3rem;
      b {
        margin-bottom: 0.2rem;
        font-size: 0.4rem;
        font-family: '黑体';
      }
      span {
        color: #999;
      }
    }
  }
}
.playList {
  width: 100%;
  .content {
    margin-top: 0.3rem;
    background-color: #fff;
    padding: 0.4rem 0.4rem;
    border-radius: 0.3rem;
    .createTit {
      display: flex;
      justify-content: space-between;
      margin: 0.3rem 0;
      color: #999;
      .creLeft {
        font-weight: normal;
        font-size: 0.2rem;
        font-family: '黑体';
      }
      .creRight {
        width: 18%;
        display: flex;
        justify-content: space-between;
        font-size: 0.5rem;
      }
    }
    .listItem {
      display: flex;
      justify-content: space-between;
      padding: 0.13rem 0;
      align-items: center;
      .listPic {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 0.3rem;
        margin-right: 0.3rem;
      }
      .listName {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 65%;
        b {
          margin-bottom: 0.2rem;
          font-size: 0.4rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        span {
          color: #999;
        }
      }
      .more-icon {
        margin-left: auto;
        font-size: 0.4rem;
        color: #999;
        // margin:auto 0;
      }
    }
  }
  .starList {
    .rightIcon {
      font-size: 0.5rem;
    }
  }
  .helper {
    margin-bottom: 3rem;
    padding: .4rem .3rem;
    .title{
      font-size: .2rem;
      color: #999;
      margin:.3rem;
    }
    .content{
      text-align: center;
      color: #999;
      .filter{
        padding: .4rem 0;
        font-size: .3rem;
        .keyOne,.keyTow{
          display: inline-block;
          padding: .1rem .2rem;
          background-color: rgba(237, 132, 132,.3);
          color: rgb(246, 71, 71);
          font-family: '黑体';
          border-radius: .1rem;
        }
        .keyTow{
          color: rgb(106, 71, 182);
          background-color: rgba(87, 158, 245,.3);
          margin: 0 .3rem;
        }
      }
    }
  }
}
.van-button__content{
  height: 0;
}
.van-button{
  height: .8rem;
  span{
    padding: .3rem;
    font-size: .2rem;
  }
}
</style>
