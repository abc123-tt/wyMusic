<template>
  <div>
    <main class="song-content" v-if="playList.creator">
      <div class="song-desc">
        <img class="song-pic" :src="playList.coverImgUrl" alt="" />
        <div class="song-info">
          <p>{{ playList.name }}</p>
          <div class="song-author">
            <img
              class="author-icon"
              :src="playList.creator.backgroundUrl"
              alt=""
            />
            <span class="author">{{ playList.creator.nickname }}</span>
            <span><van-icon name="plus" /> 关注</span>
          </div>
          <span class="score">8.5分<van-icon name="arrow" /></span>
        </div>
      </div>

      <!-- 歌单描述和转发评论 -->
      <div class="bottom-box">
        <p>{{ playList.description }}</p>
        <div class="share-box">
          <div class="share" v-if="playList.shareCount">
            <van-icon name="share" /><span>{{ playList.shareCount }}</span>
          </div>
          <div class="comment" v-if="playList.commentCount">
            <van-icon name="chat" /><span>{{ playList.commentCount }}</span>
          </div>
          <div class="collect" v-if="star">
            <van-icon name="star" /><span>{{ star }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  playList;
}>();
const star = computed(()=>{
  let num = props.playList.subscribedCount
  if(num>=100000000){
    return num = (num/1000000000).toFixed(1)+'亿'
  }else if(num>=10000){
   return num = (num/10000).toFixed(1)+'万'
  }
})
</script>
<style lang="less" scoped>
// 歌单内容
.song-content {
  .song-desc {
    display: flex;
    padding: 0.3rem;
    .song-pic {
      margin-right: 0.3rem;
      width: 2.3rem;
      height: 2.3rem;
      border-radius: 0.2rem;
    }
    .song-info {
      p,
      .song-author {
        margin-bottom: 0.2rem;
      }
      p {
        color: #fafcfd;
        font-weight: bold;
        font-size: 0.4rem;
        font-family: "微软雅黑";
        line-height: .5rem;
      }
      .song-author {
        display: flex;
        align-items: center;
        .author-icon {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          background-color: #fff;
        }
        span {
          display: inline-block;
          margin-left: 0.15rem;

          &:last-child {
            height: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0.35rem;
            padding: 0.13rem 0.2rem 0rem 0.2rem;
            color: #9eacca;
          }
        }
        .author {
          color: #d4dcee;
        }
      }
      .score {
        padding: 0 .2rem;  
        background: rgba(255, 255, 255, 0.2);
        border-radius: 0.1rem;
        color: #f1f8ff;
      }
    }
  }
  .bottom-box {
    padding: 0.3rem;
    p {
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
      -webkit-line-clamp: 1; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。
      margin-bottom: 0.6rem;
    }
    .share-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      div {
        width: 33.33%;
        padding: 0.2rem;
        background: rgba(236, 236, 238, 0.3);
        margin-right: 0.5rem;
        border-radius: 0.6rem;
        color: #fff;
        font-size: 0.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &:last-child {
          margin-right: 0;
          background-color: #346ced;
        }
        span {
          font-size: 0.35rem;
          margin-left:.2rem;
        }
      }
    }
  }
}
</style>
