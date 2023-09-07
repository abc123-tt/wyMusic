<template>
  <!-- 整一个评论页面 -->
  <div class="comContainer">

    <!-- 评论区 -->
    <div class="comCard">
      <header class="title">评论区</header>
      <div class="content">
        <ul class="comList">
          <li
            class="comItem"
            v-for="(item,index) in data.commentData.comments"
            :key="index"
          >
            <img
              :src="item.user.avatarUrl"
              alt=""
            >
            <div class="comInfo">
              <div class="top">
                <div class="baseInfo">
                  <p class="nickname">{{item.user.nickname}}</p>
                  <p class="time">{{item.timeStr}}</p>
                </div>
                <div class="likeIcon">
                  <span class="likedCount" v-if="item.likedCount > 0">{{item.likedCount}}</span>
                  <img
                    v-if="isLike"
                    src="../assets/pre-like.png"
                    alt=""
                    @click="likeCom(item.commentId)"
                  >
                </div>
              </div>
              <p class="com">{{item.content}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script setup lang='ts'>
import { useRouter } from "vue-router";
import { useStore } from "../store/index";
import { onMounted, reactive, watch, ref, defineEmits } from "vue";
import { getAPIdata } from "../server/api";
const $router = useRouter();
const $store = useStore();
const isLike = ref<boolean>(true);
const data = reactive<Object<T>>({
  commentData: [],
  floorCom: [],
});
// 将总的评论数传给父组件
const emit = defineEmits<{
  (e: "on-click", comTotal: string): viod;
}>();
const getComment = async () => {
  let musicId = $store.defaultSong.id;
  const res = await getAPIdata("GET", `/comment/music?id=${musicId}&limit=30`);
  data.commentData = res.data;

  emit("on-click", `${data.commentData.total}`);

  let parentId;
  data.commentData.comments.forEach(async (item) => {
    if (item.parentCommentId != 0) {
      parentId = item.parentCommentId;
      const floorCom = await getAPIdata(
        "GET",
        `/comment/floor?parentCommentId=${parentId}&id=${$store.defaultSong.id}&type=0`
      );
      data.floorCom.push(floorCom.data.data.comments)
    }
  });
};

onMounted(() => {
  getComment();
});
</script>
<style lang='less' scoped>
@fontColor: #5e6571;
.comContainer {
  width: 100%;
  // margin-bottom: 1.5rem;
  // 中间评论区
  .comCard {
    width: 100%;
    padding: 0 0.35rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.2rem 0.2rem 0 0;
    margin-top: 1.5rem;
    .title {
      padding: 0.4rem 0;
      font-size: 0.4rem;
      font-weight: 700;
      color: @fontColor;
    }
    .content {
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
            .top {
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
                  font-size: 0.1rem;
                }
              }
              .likeIcon {
                display: flex;
                align-items: center;
                .likedCount{
                  margin-right: .2rem;
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
              width: 7.5rem;
              word-wrap: break-word;
              white-space: pre-wrap;
              margin: 0.2rem 0;
              font-size: 0.4rem;
              font-weight: 700;
              line-height: 0.8rem;
              color: @fontColor;
            }
            .replies {
              color: #4b8dae;
            }
          }
        }
      }
    }
  }
}
</style>
