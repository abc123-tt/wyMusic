<template>
  <div class="content">
    <!-- 背景图片 -->
    <img :src="songData.musicList.coverImgUrl" alt="" class="bgPic" />
    <!-- 歌单头部 -->
    <van-sticky position="top">
      <header class="header" :class="[isChange?'changebgc':'']">
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
                <font-awesome-icon class="ellipsis-icon" icon="ellipsis-vertical"></font-awesome-icon>
              </span>
            </div>
          </template>
        </SearchVue>
      </header>
    </van-sticky>
    <!-- 歌单详情头部信息 -->
    <ItemTopVue :playList="songData.musicList"></ItemTopVue>
    <!-- 歌曲列表 -->
    <ItemContentVue :playList="songData.musicList" :isTop="isChange"></ItemContentVue>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive,ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { getAPIdata } from "../server/api";
import ItemTopVue from "./detailItem/ItemTop.vue";
import ItemContentVue from "./detailItem/ItemContent.vue";
import SearchVue from "./SearchCom.vue";
import { useStore } from '../store/index';
const router = useRouter();
const songData = reactive({
  musicList: [] as any,
});

// 控制滚动时顶部导航背景颜色的切换
const isChange = ref<Boolean>(false)
// 监听屏幕滚动
const handleScroll = () => {
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  if(scrollTop>=300){
    isChange.value = true
  }else{
    isChange.value = false
  }
};

// 后退函数
const back = () => {
  router.go(-1);
};

onMounted(async () => {
 useStore().playPosition = true
  // 获取接口数据
  const {
    query: { id },
  } = useRoute();
  const res = await getAPIdata("GET", `/playlist/detail?id=${id}`);
  songData.musicList = res.data.playlist;

  // 监听屏幕滚动
  window.addEventListener("scroll", handleScroll);
});
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
  .playCom {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
.header {
  padding: 0.35rem 0.45rem;
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
      margin-right: 0.8rem;
      font-size: .6rem;
    }
    .ellipsis-icon{
      font-size: .6rem;
      // margin-right: .3rem;
    }
  }
}
.changebgc{
  background-color: #fc473c;
  transition: all .2s ease-in;
}
</style>
