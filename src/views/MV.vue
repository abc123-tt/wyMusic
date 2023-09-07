<template>
  <div class="container">
    <div class="top">
      <van-icon
        name="arrow-left"
        class="goBack"
        @click="backOff"
      />
      <span
        class="desc"
        v-if="data.mvInfo.briefDesc != ''"
      >{{data.mvInfo.briefDesc}}</span>
      <span v-else-if="data.mvInfo.desc=''">{{data.mvInfo.desc}}</span>
      <span v-else>{{data.mvInfo.name}}</span>
    </div>
    <main class="mvBox">
      <video
        :src="mvUrl"
        controls
        :poster="data.mvInfo.cover"
        muted
        
      ></video>
    </main>
    <div class="authorInfo">
      <div class="artists">
        <img
          v-for="(pic,index) in data.mvInfo.artists"
          :key="index"
          :src="pic.img1v1Url"
          alt=""
          class="artPic"
        >
        <span
          class="artName"
          v-for="(item,index) in data.mvInfo.artists"
          :key="index"
        >{{item.name}} </span>
      </div>
      <h1 class="mvName">{{data.mvInfo.name}}</h1>
      <div class="baseInfo">
        <span>发布：{{data.mvInfo.publishTime}}</span>&emsp;
        <span>播放：{{data.mvInfo.playCount}}次</span>
      </div>
      <div
        class="group"
        v-if="data.mvInfo.videoGroup"
      >
        <van-tag
          round
          color="#f7f7f7"
          v-for="(tag,index) in data.mvInfo.videoGroup"
          :key="index"
        >{{tag.name}}</van-tag>
      </div>
    </div>
    <div class="comment">
      <van-tabs v-model:active="active">
        <van-tab title="最新评论">
          <div class="comContent">
            <ul class="comList">
              <li
                class="comItem"
                v-for="(item,index) in data.mvComments"
                :key="index"
              >
                <img
                  :src="item.user.avatarUrl"
                  alt=""
                >
                <div class="comInfo">
                  <div class="comTop">
                    <div class="baseInfo">
                      <p class="nickname">{{item.user.nickname}}</p>
                      <p class="time">{{item.timeStr}}</p>
                    </div>
                    <div class="likeIcon">
                      <span
                        class="likedCount"
                        v-if="item.likedCount > 0"
                      >{{item.likedCount}}</span>
                      <img
                        v-if="isLike"
                        src="../assets/pre-like.png"
                        alt=""
                        @click="likeCom(item.commentId)"
                      >
                      <img
                        v-else
                        src="../assets/liked.png"
                        alt=""
                      >
                    </div>
                  </div>
                  <p class="com">{{item.content}}</p>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="热门评论">
          <div class="comContent">
            <ul class="comList">
              <li
                class="comItem"
                v-for="(item,index) in data.hotComments"
                :key="index"
              >
                <img
                  :src="item.user.avatarUrl"
                  alt=""
                >
                <div class="comInfo">
                  <div class="comTop">
                    <div class="baseInfo">
                      <p class="nickname">{{item.user.nickname}}</p>
                      <p class="time">{{item.timeStr}}</p>
                    </div>
                    <div class="likeIcon">
                      <span
                        class="likedCount"
                        v-if="item.likedCount > 0"
                      >{{item.likedCount}}</span>
                      <img
                        v-if="isLike"
                        src="../assets/pre-like.png"
                        alt=""
                        @click="likeCom(item.commentId)"
                      >
                      <img
                        v-else
                        src="../assets/liked.png"
                        alt=""
                      >
                    </div>
                  </div>
                  <p class="com">{{item.content}}</p>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>
<script setup lang='ts'>
import { onMounted, reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../store/index";
import { getAPIdata } from "../server/api";
const $router = useRouter();
const $route = useRoute();
const $store = useStore();
const isLike = ref<boolean>(true);
const data = reactive<Object<T>>({
  mvInfo: [],
  hotComments: [],
  mvComments: [],
});
const mvUrl = ref<string>();
const backOff = () => {
  $router.go(-1);

};

// 获取mv
const getMv = async () => {
  // 接收上一个页面跳转传过来的mvId
  const mvId = $route.query.id;
  const mvData = await getAPIdata("GET", `/mv/detail?mvid=${mvId}`);
  data.mvInfo = mvData.data.data;

  const res = await getAPIdata("GET", `/mv/url?id=${mvId}`);
  mvUrl.value = res.data.data.url;
  const mvCom = await getAPIdata("GET", `/comment/mv?id=${mvId}`);
  data.hotComments = mvCom.data.hotComments;
  data.mvComments = mvCom.data.comments;
};

onMounted(() => {
  $store.isPlayCom = false;
  $store.isPlay = false 
  getMv();
});
</script>
<style lang='less' scoped>
@fontColor: #5e6571;
.container {
  // background-color: #f9fafc;
  .top {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #000;
    padding: 0.4rem 0.2rem;
    color: #fff;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    z-index: 9999999;
    .goBack {
      font-size: 0.8rem;
      margin-right: 0.3rem;
    }
  }
  .mvBox {
    width: 100%;
    height: 100%;
    margin-top: 1.6rem;
    video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .authorInfo {
    margin: 0.5rem 0 0.2rem 0;
    padding: 0 0.3rem;
    .artists {
      display: flex;
      align-items: center;
      // margin-bottom: .8rem;
      .artPic {
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 100%;
      }
      .artName {
        font-size: 0.4rem;
        margin-left: 0.3rem;
        color: #999;
      }
    }
    .mvName {
      font-size: 0.6rem;
      font-weight: 700;
      padding: 0.8rem 0 0.4rem 0;
    }
    .baseInfo {
      padding: 0 0 0.3rem 0;
      color: #ccc;
    }
    .group {
      padding: 0.1rem 0;
      /deep/.van-tag {
        color: #000;
        padding: 0.1rem 0.2rem;
        margin-right: 0.1rem;
      }
    }
  }
  .comment {
    padding: 0 0.3rem;

    .comList {
      .comItem {
        display: flex;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid #eeeeee;
        margin-top: 0.5rem;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 100%;
        }
        .comInfo {
          width: 100%;
          margin-left: 0.3rem;
          .comTop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .baseInfo {
              .nickname {
                padding: 0.1rem 0;
                color: @fontColor;
                font-size: 0.4rem;
                font-weight: 700;
              }
              .time {
                color: #999;
                // padding: .1rem
                font-size: 0.3rem;
              }
            }
            .likeIcon {
              display: flex;
              align-items: center;
              .likedCount {
                margin-right: 0.2rem;
                display: inline-block;
                text-align: right;
              }
              img {
                width: 0.5rem;
                height: 0.5rem;
              }
            }
          }
          .com {
            width: 8rem;
            margin: 0.2rem 0;
            font-size: 0.4rem;
            font-weight: 700;
            line-height: 0.8rem;
            color: @fontColor;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .replies {
            color: #4b8dae;
          }
        }
      }
    }
  }
}
</style>
