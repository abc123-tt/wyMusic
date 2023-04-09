<template>
  <div class="tit">
    <!-- 标题部分 -->
    <div class="tit-font">
      <b>推荐歌单</b>
      <font-awesome-icon
        class="titIcon"
        icon="angle-right"
      />
    </div>
    <div class="tit-more">
      <font-awesome-icon
        class="titMore"
        icon="ellipsis-vertical"
        @click="showMore"
      />
    </div>
    <!-- 更多 -->
    <van-action-sheet
      v-model:show="moreBtn"
      :actions="actions"
      description="这是一段描述信息"
      close-on-click-action
    />
  </div>
  <!-- 推荐歌单版块 -->
  <div class="music-list">
    <van-swipe
      :loop="false"
      :width="110"
      class="my-swipe"
      :show-indicators="false"
    >
      <van-swipe-item
        v-for="item in data.musicList"
        :key="item.id"
        @click="listDetail(item.id)"
      >
        <img
          class="music-pic"
          :src="item.picUrl"
          alt=""
        >
        <small>
          <font-awesome-icon
            class="play-icon"
            icon="fa-play"
          ></font-awesome-icon>
          <span class="playCount">{{ item.playCount }}</span>
        </small>
        <p class="playName">{{ item.name }}</p>
        <font-awesome-icon
          class="bigPlay"
          icon="fa-play"
        ></font-awesome-icon>
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="line"></div>
</template>
<script setup lang='ts'>
import { ref, onMounted, reactive } from "vue";
import { getAPIdata } from "../../server/api.js";
import { useRouter } from "vue-router";
import { useStore } from "../../store";
const store = useStore()
const router = useRouter();
// 推荐歌单的三个点
let moreBtn = ref(false);
const actions = [
  { name: "优先推荐" },
  { name: "减少推荐" },
  { name: "更多推荐" },
];
const showMore = () => {
  moreBtn.value = true;
};

// 推荐歌单数据存放处
let data = reactive({
  musicList: [],
});

const listDetail = (id) => {
  store.currentSongIndex = 0
  router.push({
    path: "/detail",
    query: {
      id,
    },
  });
};

// 获取歌单数据
onMounted(async () => {
  const res = await getAPIdata("GET", "/personalized?limit=10");
  data.musicList = res.data.result;
  // 处理播放数量显示的格式
  res.data.result.forEach((item) => {
    if (item.playCount >= 100000000) {
      item.playCount = (item.playCount / 100000000).toFixed(1) + "亿";
    } else if (item.playCount >= 10000) {
      item.playCount = (item.playCount / 10000).toFixed(1) + "万";
    }
  });
});
</script>
<style lang='less' scoped>
@fontColor: #5e6571;
.tit {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  &-font {
    font-size: 0.5rem;
    color: @fontColor;
    font-weight: bold;
    b {
      margin-right: 5px;
    }
  }
  &-more {
    font-size: 0.5rem;
    color: #999;
  }
}
// 推荐歌单
.music-list {
  width: 100%;
  .my-swipe {
    img {
      width: 100%;
      height: 2.6rem;
      border-radius: 0.2rem;
    }
    .van-swipe-item {
      position: relative;
      padding-right: 0.2rem;
      box-sizing: border-box;
      &:last-child {
        padding: 0 !important;
      }
    }
    .play-icon {
      font-size: 0.25rem;
      margin-right: 0.2rem;
    }

    .play-icon,
    .playCount {
      color: #fff;
    }
    small {
      position: absolute;
      top: 0.2rem;
      right: 0.5rem;
      display: flex;
      align-items: center;
    }
    .playName {
      color: @fontColor;
      margin-top: 0.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
      -webkit-line-clamp: 2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。
    }
    .bigPlay {
      position: absolute;
      bottom: 1rem;
      right: 0.5rem;
      color: #fff;
      font-size: 0.5rem;
    }
  }
}
.line {
  width: 100%;
  height: 0.5px;
  background-color: #eee;
  padding: 0 !important;
  margin: 0.8rem 0;
}
</style>
