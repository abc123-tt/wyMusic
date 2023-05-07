<template>
  <div class="play-box">
    <div class="play-left" @click="toLyric">
      <div class="songImg" :class="{rotateImg:$store.isPlay}">
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
        name="pause-circle-o"
        v-if="$store.isPlay"
        @click="playSong"
      />
      <van-icon
        class="playIcon"
        name="play-circle-o"
        @click="playSong"
        v-else
      />
      

      <svg-icon class="playlistIcon" iconName="playlist"></svg-icon>
    </div>
  </div>
  <audio
    ref="audio"
    @ended="onEnded"
    @durationchange="changeDur"
    @timeupdate="updateTime"
    :src="`https://music.163.com/song/media/outer/url?id=${$store.defaultSong.id}.mp3`"
  ></audio>
  <!-- popup要挂载在body才能获得层级最高 
    Vue3：teleport="body"
    Vue2：get-container="body"
  -->

  <van-popup
    v-model:show="$store.isShowLyric"
    position="right"
    :style="{ width: '100%', height: '100%' }"
    teleport="body"
  >
    <LyricVue :musicInfo="songData.musicInfo" @on-play="conPlay" :lyric-id="songData.lyricId"></LyricVue>
  </van-popup>
</template>
<script setup lang="ts">
import LyricVue from '../Lyric.vue';
import router from '../../router';
import { onMounted, ref, watch, watchEffect, reactive ,computed} from 'vue';
import { useStore } from '../../store/index';
import { useRouter, useRoute } from 'vue-router';
import {getAPIdata} from '../../server/api'
const $router = useRouter();
const $route = useRoute();
const $store = useStore();
const audio = ref(null);


// 获取当前播放的歌曲的数据
const songData = reactive<T>({
  musicInfo: [],
  getLyric:[],
  lyricId:''
});

// 接收子组件传过来的数据
const conPlay = ()=>{
  playSong()
}

const playSong = () => {
   // 如果写在外面当歌词详情页点击暂停或播放时调用该函数，会重新取一次反，所以特效就不能做到同步
  // $store.isPlay = !$store.isPlay
  if (audio.value.paused) {
    audio.value.play();
    // 那就在播放和暂停时分开赋值
    $store.isPlay = true
  } else {
    audio.value.pause();
    $store.isPlay = false
  }
};

// 跳转到歌词详情页
const toLyric = () => {
  songData.musicInfo = $store.defaultSong;
  $store.isShowLyric = true;
};
// 当前播放时间
const updateTime = ()=>{
  $store.currentTime = audio._rawValue.currentTime
}
// 歌曲长度是否有变化
const changeDur = ()=>{
  
  $store.durationTime = audio._rawValue?.duration
}
// 监听对象中某个属性要把它变为一个函数
watch(
  () => $store.defaultSong.id,
  (newVal,oldVal) => {
    // console.log('改变前的id：'+oldVal,'改变后的id:'+newVal);
    audio.value.autoplay = true;
    $store.isPlay = true
    // 将更新的id传过去歌词详情页
    songData.lyricId = newVal
  }
);
// 监听歌曲是否播放完
const onEnded = () => {
  $store.isPlay = true;
  $store.playNext();
  $store.isPlay = false;
};

onMounted(() => {
  // 由于歌词详情页要监听id改变时才获取歌词，所以要先将默认歌曲传过去获取歌词
  songData.lyricId = $store.defaultSong.id
});

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
