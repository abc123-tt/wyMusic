<template>
  <div class="play-box">
    <div class="play-left">
      <div class="songImg">
        <img :src="store.defaultSong.picUrl" alt="" />
      </div>
      <div class="songInfo">
        <span
        >
        {{
          store.defaultSong.name
        }}</span
      >
      <span class="singerName"> <span class="heng">-</span>{{ store.defaultSong.singerName }}</span>
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
    :src="`https://music.163.com/song/media/outer/url?id=${store.defaultSong.id}.mp3`"
  ></audio>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useStore } from "../../store/index";
const store = useStore();

// 控制音乐播放器的播放和暂停
const isPlay = ref<boolean>(true);
const audio = ref();
const playSong = () => {
  console.log(audio);
  
  isPlay.value = !isPlay.value;
  if (audio.value.paused) {
    audio.value.play();
  } else {
    audio.value.pause();
  }
};
// 监听对象中某个属性要把它变为一个函数
watch(()=>store.defaultSong.id,()=>{
  // console.log('改变前的id：'+oldVal,'改变后的id:'+newVal);
  audio.value.autoplay = true
  isPlay.value = false;
})
// 监听歌曲是否播放完
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
  height: 1.2rem;
  border-top: 0.5px solid #eee;
  background: rgba(255, 255, 255, 0.9);
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
    .singerName{
      color:#999;
      font-size: .28rem;
      .heng{
        margin:0 .1rem;
        
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
</style>
