<template>
  <div class="play-box">
    <div class="play-left" @click="toLyric">
      <div class="songImg" :class="[isRotate ? 'rotateImg' : '']">
        <img :src="$store.defaultSong.picUrl" alt="" />
      </div>
      <div class="songInfo">
        <span> {{ $store.defaultSong.name }}</span>
        <span class="singerName">
          <span class="heng">-</span>{{ $store.defaultSong.singerName }}</span
        >
      </div>
    </div>
    <div class="play-right">
      <van-icon
        class="playIcon"
        name="play-circle-o"
        v-if="isPlay"
        @click="playSong"
      />
      <van-icon
        class="playIcon"
        name="pause-circle-o"
        v-else
        @click="playSong"
      />
      <svg-icon class="playlistIcon" iconName="playlist"></svg-icon>
    </div>
  </div>
  <audio
    ref="audio"
    @ended="onEnded"
    :src="`https://music.163.com/song/media/outer/url?id=${$store.defaultSong.id}.mp3`"
  ></audio>

  <van-popup
    v-model:show="$store.isShowLyric"
    position="right"
    :style="{ width: '100%', height: '100%' }"
  >
    <LyricVue :musicInfo = "songData.musicInfo"></LyricVue>
  </van-popup>
</template>
<script setup lang="ts">
import LyricVue from '../Lyric.vue';
import { onMounted, ref, watch, watchEffect, reactive } from 'vue';
import { useStore } from '../../store/index';
import { useRouter, useRoute } from 'vue-router';
import router from '../../router';
const $router = useRouter();
const $route = useRoute();
const $store = useStore();
// 控制音乐播放器的播放和暂停
const isPlay = ref<boolean>(true);
const audio = ref(null);
// 是否旋转歌曲头像
const isRotate = ref<boolean>(false);
// 是否正在播放歌曲
const isPlaying = ref<boolean>(false);

// 获取当前播放的歌曲的数据
const songData = reactive<T>({
  musicInfo: [],
});
const playSong = () => {
  isPlay.value = !isPlay.value;
  if (audio.value.paused) {
    audio.value.play();
    isRotate.value = !isRotate.value;
  } else {
    audio.value.pause();
    isRotate.value = !isRotate.value;
  }
};

// 跳转到歌词详情页
const toLyric = () => {
  songData.musicInfo = $store.defaultSong;
  $store.isShowLyric = true;
  // 点击音乐播放器到详情页时将当前路径保存到本地
  localStorage.setItem('historyPath', $route.path);
};
const goBack = () => {
  // 在详情页点击返回时跳转到上一个页面
  $router.push(localStorage.getItem('historyPath'));
};
// 监听对象中某个属性要把它变为一个函数
watch(
  () => $store.defaultSong.id,
  () => {
    // console.log('改变前的id：'+oldVal,'改变后的id:'+newVal);
    audio.value.autoplay = true;
    isPlay.value = false;
    isRotate.value = true;
  }
);

// 监听歌曲是否播放完
const onEnded = () => {
  isPlay.value = true;
  $store.playNext();
  isPlay.value = false;
};
onMounted(() => {});
</script>
<style lang="less" scoped>
.play-box {
  box-sizing: border-box;
  padding: 0 0.55rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.32rem;
  border-top: 0.5px solid #eee;
  background: rgba(255, 255, 255, 0.93);
  .play-left {
    display: flex;
    align-items: center;
    width: 75%;

    .songInfo {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.36rem;
      text-align: left;
      width: 80%;
    }
    .songImg {
      margin-right: 0.3rem;
      width: 1rem;
      height: 1rem;
      background-color: #000;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
      }
    }
    // 旋转头像
    .rotateImg {
      animation: spin 6s linear infinite;
    }
    .singerName {
      color: #999;
      font-size: 0.28rem;
      .heng {
        margin: 0 0.1rem;
      }
    }
  }
  .play-right {
    display: flex;
    .playIcon {
      font-size: 0.6rem !important;
      margin-right: 0.7rem;
    }
    .playlistIcon {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/deep/.van-popup--right {
  z-index: 11111 !important;
  background: red;
}
</style>
