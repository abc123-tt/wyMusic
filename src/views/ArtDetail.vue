<template>
  <!-- <img :src="props.artistInfo.img1v1Url" alt="" class="bgc"> -->
  <div class="content">
    <header>
      <img
        :src="props.artistInfo.img1v1Url"
        alt=""
      >
      <p>{{props.artistInfo.name}}</p>
    </header>
    <main class="musicCard">
      <p class="tit">歌曲列表</p>
      <ul class="musicList">
        <li
          class="musicItem"
          v-for="(item,index) in data.artistsMusic"
          :key="index"
        >
          <div class="nameBox"  @click="playSong(data.artistsMusic, index)">
            <p class="name">{{item.name}}</p>
            <p class="singer">
              <span
                class="vip"
                v-if="item.fee != 8"
              >VIP</span><span
                v-for="(singer,index) in item.ar"
                :key="index"
              >{{singer.name}}&emsp;</span>
            </p>
          </div>
          <div class="musicIcon">
            <!-- <van-icon name="play-circle-o" v-if="item.mv != 0" class="mvIcon" /> -->
            <svg-icon iconName="more" class="moreIcon"></svg-icon>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script setup lang='ts'>
import { useStore } from "../store/index";
import { defineProps, onMounted, reactive } from "vue";
import { getAPIdata } from "../server/api";
const $store = useStore();
const data = reactive<Object<T>>({
  artistsMusic: [],
});
const props = defineProps<{
  artistInfo: {
    type: Array;
    default: "error";
  };
}>();

const getArtMusic = async () => {
  const res = await getAPIdata("GET", `/artists?id=${props.artistInfo.id}`);
  data.artistsMusic = res.data.hotSongs;
  // console.log(data.artistsMusic);
};
// console.log(props.artistInfo);
// 播放单首歌曲
const playSong = async (item: any, index: number) => {
  $store.play(item, index);
  const res = await getAPIdata("GET", `/check/music?id=${item[index].id}`);
  if (!res.data.success) {
    showFailToast("对不起，该歌曲暂时无版权");
    return false;
  }
};
onMounted(() => {
  getArtMusic();
});
</script>
<style lang='less' scoped>
.content {
  position: relative;
  height: 100vh;

  header {
    width: 100%;
    background-color: #17181f;
    margin: 0 auto;
    height: 8rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
      margin-top: 1.5rem;
      border-radius: 0.3rem;
      width: 4rem;
      height: 4rem;
    }
    p {
      font-size: 0.6rem;
      text-align: center;
      color: #fff;
      margin-top: 0.5rem;
    }
  }
  .musicCard {
    width: 100%;
    background-color: #0a0b0c;
    padding: 0.3rem 0.5rem;
    color: #fff;
    box-sizing: border-box;
    .tit {
      padding: 0.5rem 0 0.4rem 0;
      font-size: 0.4rem;
      border-bottom: 1px solid #2b2c31;
      color: #aeb0b5;
    }
    .musicList {
      margin: 0.4rem 0;
      .musicItem {
        padding: 0.4rem 0;
        display: flex;
        justify-content: space-between;
        .nameBox {
          width: 70%;
          .name {
            font-size: 0.5rem;
            color: #fff;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .singer {
            font-size: 0.35rem;
            margin-top: 0.2rem;
            color: #aeb0b5;
            .vip {
              display: inline-block;
              padding: 0 0.1rem;
              border: 1px solid #f00;
              font-size: 0.2rem;
              color: #f00;
              border-radius: 0.2rem;
              margin-right: 0.2rem;
            }
          }
        }
        .musicIcon{
          display: flex;
          align-items: center;
          .mvIcon{
            font-size: .5rem;
            margin-right: .35rem;
          }
          .moreIcon{
            width: .5rem;
            height: .5rem;
          }
        }
      }
    }
  }
}
</style>
