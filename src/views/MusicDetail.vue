<template>
  <div class="content">
    <!-- 背景图片 -->
    <img :src="songData.musicList.coverImgUrl" alt="" class="bgPic" />
    <!-- 歌单头部 -->
    <van-sticky position="top">
      <header class="header">
        <SearchVue class="tit">
          <template #menuBtn>
            <font-awesome-icon
              class="leftIcon"
              icon="arrow-left"
              @click="back"
            />
          </template>

          <template #searchBox>
            <span class="tit-font">歌单</span>
          </template>

          <template #songIcon>
            <div class="right-icon">
              <span>
                <van-icon name="search" />
              </span>
              <span>
                <font-awesome-icon icon="ellipsis-vertical"></font-awesome-icon>
              </span>
            </div>
          </template>
        </SearchVue>
      </header>
    </van-sticky>
    <!-- 歌单详情头部信息 -->
    <ItemTopVue :playList="songData.musicList"></ItemTopVue>
    <ItemContentVue :playList="songData.musicList"></ItemContentVue>

    <div class="playCom">
      <PlayVue></PlayVue>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { getAPIdata } from "../server/api";
import ItemTopVue from "./detailItem/ItemTop.vue";
import ItemContentVue from "./detailItem/ItemContent.vue";
import SearchVue from "./SearchCom.vue";
import PlayVue from "../components/item/Play.vue";

const router = useRouter();

const songData = reactive({
  musicList: [] as any,
});
onMounted(async () => {
  // 获取接口数据
  const {
    query: { id },
  } = useRoute();
  const res = await getAPIdata("GET", `/playlist/detail?id=${id}`);
  songData.musicList = res.data.playlist;

  // 监听屏幕滚动
  // window.addEventListener("scroll", handleScroll);
});
// 监听屏幕滚动
// const handleScroll = () => {
//   let scorllTop =
//     window.pageYOffset ||
//     document.documentElement.scrollTop ||
//     document.body.scrollTop;
//   console.log(scorllTop);
// };

// 后退函数
const back = () => {
  router.go(-1);
};
</script>
<style lang="less" scoped>
.content {
  position: relative;
  .bgPic {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 8rem;

    top: 0;
    left: 0;
    filter: blur(0.8rem);
  }
  .playCom{
    width:100%;
    position:fixed;
    bottom: 0;
  }
}
.header {
  padding: 0.4rem 0.25rem;

  .tit {
    display: flex;
    justify-content: space-between;
    font-size: 0.5rem;
    color: #fff;
  }
  .tit-font {
    margin-left: 0.5rem;
  }
  .right-icon {
    margin-left: auto;
    .van-icon {
      margin-right: 0.6rem;
    }
  }
}
</style>
