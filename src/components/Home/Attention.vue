<template>
  <div class="container">
    <p><span>热门歌手</span></p>
    <main class="content">
      <ul>
        <li
          v-for="(item,index) in data.artists"
          :key="index"
          @click="artDetail(index)"
        >
          <img
            :src="item.img1v1Url"
            alt=""
          >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </main>
  </div>

  <van-popup
    v-model:show="$store.isShowArtists"
    position="right"
    :style="{ width: '100%', height: '100%' }"
  >

    <ArtDetailVue :artistInfo="data.artists[flag]"></ArtDetailVue>
  </van-popup>
  <div class="backBox" v-if="$store.isShowArtists">
      <van-icon
        name="arrow-left"
        class="goBack"
        @click="$store.isShowArtists = false"
      />
    </div>
</template>
<script setup lang='ts'>
import { onMounted, reactive, ref } from "vue";
import { getAPIdata } from "../../server/api";
import { useStore } from "../../store/index";
import ArtDetailVue from "../../views/ArtDetail.vue";
const $store = useStore();
const data = reactive<Object<T>>({
  artists: [],
});

const flag = ref<number>();
const getArtists = async () => {
  const res = await getAPIdata("GET", "/toplist/artist");
  data.artists = res.data.list.artists.slice(0, 20);
};
const artDetail = (index) => {
  $store.isShowArtists = true;
  flag.value = index;
};
onMounted(() => {
  getArtists();
});
</script>
<style lang='less' scoped>
.container {
  background-color: #f6f6f6;
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
  margin-bottom: 2.5rem;
  p {
    text-align: center;
    padding: 0.3rem 0;
    margin-bottom: 0.8rem;
    span {
      font-size: 0.8rem;
      border-bottom: 2px solid red;
      padding-bottom: 0.3rem;
    }
  }
  .content {
    ul {
      li {
        margin: 0.5rem 0.3rem;
        display: flex;
        align-items: center;
        img {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 100%;
        }
        span {
          font-size: 0.5rem;
          margin-left: 0.5rem;
        }
      }
    }
  }
}

.backBox {
    padding: 0.3rem;
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 11111;
    background-color: #17181f;
    .goBack {
      font-size: 0.8rem;
      z-index: 1111;
      color: #fff;
    }
  }
</style>
