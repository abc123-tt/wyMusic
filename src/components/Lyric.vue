<template>
  <img
    :src="info.musicInfo.picUrl"
    alt=""
    class="backgroundImg"
  />
  <div class="flow"></div>
  <div class="container">
    <div class="topNav">
      <van-icon
        name="arrow-down"
        @click="goBack"
        class="backIcon"
      />
      <div class="musicName-box">
        <p class="musicName">
          <Vue3Marquee>{{ info.musicInfo.name }}</Vue3Marquee>
        </p>
        <span class="singerName">{{ info.musicInfo.singerName }} <van-icon name="arrow" /></span>
      </div>
      <svg-icon
        class="shareIcon"
        iconName="shareMusic"
      ></svg-icon>
    </div>
    <!-- 歌词 -->
    <div
      class="lyric-box"
      @click="showLyric = !showLyric"
      v-if="showLyric"
    >
      <img
        src="../assets/needle-ab.png"
        alt=""
        class="needleImg"
        :class="{ isDown: $store.isPlay }"
      />
      <img
        src="../assets/cd.png"
        alt=""
        class="cdImg"
      />
      <img
        :src="info.musicInfo.picUrl"
        alt=""
        class="musicPic"
        :class="{ isRotate: $store.isPlay }"
      />
    </div>
    <div
      v-else
      class="lyric"
      @click="showLyric = !showLyric"
      ref="lyricDiv"
    >
      <p
        v-for="(item,index) in data.lyric"
        :key="index"
        :class="{active:($store.currentTime*1000>=item.time && $store.currentTime*1000 < item.next)}"
      >{{item.lrc}}</p>
    </div>
    <!-- 底部控制组件 -->
    <div class="control-box">
      <ul class="conTop">
        <li
          class="menu"
          v-for="(item, index) in data.iconData"
          :key="index"
          @click="toComment(index)"
        >
          <svg-icon
            :iconName="item"
            class="menuIcon"
          ></svg-icon>
        </li>
      </ul>
      <!-- 进度条 -->
      <div class="conCenter">
        <span class="startTime">{{filterStartTime}}</span>
        <input
          type="range"
          step="0.05"
          class="progress"
          min="0"
          :max="$store.durationTime"
          v-model="$store.currentTime"
        >

        <span class="endTime">{{filterEndTime}}</span>

      </div>
      <ul class="conBottom">
        <li class="play-mode">
          <svg-icon
            iconName="rotate"
            class="conIcon modeIcon"
          ></svg-icon>
        </li>
        <!-- 上一曲 -->
        <li class="preSong">
          <svg-icon
            iconName="preSong"
            class="conIcon preIcon"
            @click="changeSong(-1)"
          ></svg-icon>
        </li>
        <!-- 暂停 -->
        <li
          v-if="$store.isPlay"
          class="pausedSong"
        >
          <svg-icon
            iconName="paused-w"
            class="conIcon pausedIcon"
            @click="playMusic"
          ></svg-icon>
        </li>
        <!-- 播放 -->
        <li
          v-else
          class="playSong"
        >
          <svg-icon
            iconName="play-w"
            class="conIcon playIcon"
            @click="playMusic"
          ></svg-icon>
        </li>
        <!-- 下一曲 -->
        <li class="nextSong">
          <svg-icon
            iconName="nextSong"
            class="conIcon nextIcon"
            @click="changeSong(1)"
          ></svg-icon>
        </li>
        <li class="playlist">
          <svg-icon
            iconName="music-list"
            class="conIcon playlistIcon"
          ></svg-icon>
        </li>
      </ul>
    </div>
  </div>
  <!--顶部返回 -->
  <div
    class="back"
    v-if="$store.isShowComment"
  >
    <van-icon
      name="arrow-left"
      class="goBack"
      @click="backOff"
    />
    <span>评论({{totalCom}})</span>
  </div>
  <van-popup
    v-model:show="$store.isShowComment"
    position="right"
    :style="{ width: '100%', height: '100%' }"
  >
    <CommentVue @on-click="getComTotal"></CommentVue>

  </van-popup>
  
</template>
<script setup lang="ts">
import {
  onMounted,
  computed,
  reactive,
  ref,
  defineEmits,
  toRaw,
  watch,
} from "vue";
import { useStore } from "../store/index";
import { Vue3Marquee } from "vue3-marquee";
import { getAPIdata } from "../server/api";
import { useRouter } from "vue-router";
import "vue3-marquee/dist/style.css";
import CommentVue from "../views/Comment.vue";
const $store = useStore();
const $router = useRouter();
const lyricDiv = ref(null);
const totalCom = ref<string>();
const comCentent = ref<string>('')
const info = defineProps<{
  musicInfo: {
    type: Array;
    default: [];
  };
  lyricId: {
    type: String;
    default: "";
  };
}>();

const showLyric = ref<boolean>(true);

const data = reactive({
  iconData: ["like", "download", "music_bell", "comment", "more"],
  lyric: [],
});
const goBack = () => {
  $store.isShowLyric = false;
  showLyric.value = true;
};
// 接收子组件发过来的播放信号
const emit = defineEmits<{
  (event: "on-play");
}>();
// 暂停与播放
const playMusic = () => {
  $store.isPlay = !$store.isPlay;
  emit("on-play");
};
// 上/下一曲
const changeSong = (num: number) => {
  let newIndex = $store.currentSongIndex + num;
  if (newIndex < 0) {
    newIndex = $store.playlist.length - 1;
  }
  if (newIndex == $store.playlist.length) {
    newIndex = 0;
  }
  $store.play($store.playlist, newIndex);
};
// 获取歌词函数
const getLyric = async () => {
  const lyricRes = await getAPIdata(
    "GET",
    `/lyric?id=${$store.defaultSong.id}`
  );
  console.log(lyricRes.data);
  
  let arr = lyricRes.data.lrc.lyric.split("\n").map((item, index) => {
    let min = item.slice(1, 3);
    let sec = item.slice(4, 6);
    let mill = item.slice(7, 10);
    let lrc = item.slice(11, item.length);

    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);

    if (isNaN(Number(mill))) {
      mill = item.slice(7, 9);
      lrc = item.slice(10, item.length);
      time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
    }
    return { min, sec, mill, lrc, time };
  });
  data.lyric = arr;
  console.log(arr);
  
  arr.forEach((item, index) => {
    if (index === arr.length - 1 || isNaN(arr[index + 1].time)) {
      item.next = 10000000;
    } else {
      // 当前这一句的next = 下一句的time
      item.next = arr[index + 1].time;
    }
  });
};
watch(
  () => $store.currentTime,
  (oldVal, newVal) => {
    const p = document.querySelector("p.active");
    setTimeout(() => {
      if (p && p.offsetTop > 300) {
        lyricDiv.value.scrollTop = p.offsetTop - 280;
      }
    }, 10);
  }
);
watch(
  () => $store.defaultSong.id,
  (oldVal, newVal) => {
    getLyric();
  }
);


// 过滤歌曲开始时间
const filterStartTime = computed(() => {
  let m = Math.floor($store.currentTime / 60);
  let s = Math.floor($store.currentTime % 60);
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  return m + ":" + s;
});
// 过滤歌曲总时长
const filterEndTime = computed(() => {
  let sum = $store.durationTime;
  let min = Math.floor(sum / 60);
  let sec = Math.floor(sum % 60);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return min + ":" + sec;
});

// -----------------------------------------------

// 获取子组件传进来的总评论数
const getComTotal = (total: string) => {
  totalCom.value = total;
};
// 评论区
const toComment = (i) => {
  if (i == 3) {
    $store.isShowComment = true;
  }
};
// 返回
const backOff = () => {
  $store.isShowComment = false;
};
onMounted(() => {
  getLyric();
});
</script>
<style lang="less" scoped>
@fontColor: #5e6571;
.backgroundImg {
  width: 100%;
  height: 100%;
  filter: blur(0.9rem);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -2;
}
.flow {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  filter: blur(0.9rem);
}
.container {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .topNav {
    padding: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .musicName-box {
      width: 50%;
      text-align: center;
      .musicName {
        font-size: 0.5rem;
        color: #fff;
        margin-bottom: 0.2rem;
        display: block;
        .vue3-marquee {
          overflow: hidden;
        }
      }
      .singerName {
        font-size: 0.3rem;
        margin-top: 0.1rem;
        color: #fff;
        mix-blend-mode: difference;
      }
    }
    .backIcon {
      font-size: 0.8rem;
      color: #fff;
    }
    .shareIcon {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
  .lyric-box {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .needleImg {
      width: 2.5rem;
      height: 4.2rem;
      position: absolute;
      left: 45%;
      top: -8%;
      transform-origin: 0 0; // 锁定原点
      transform: rotate(-30deg);
      z-index: 111;
      transition: all 0.3s ease-in;
    }
    .isDown {
      transform: rotate(-10deg);
    }
    .cdImg {
      position: absolute;
      top: 0.8rem;
      width: 7rem;
      height: 7rem;
    }
    .musicPic {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      position: absolute;
      top: 2.1rem;
      animation: spin 8s linear infinite;
      animation-play-state: paused;
    }
    .isRotate {
      // 控制动画的暂停和播放：paused、running
      animation-play-state: running;
    }
  }
  .lyric {
    text-align: center;
    width: 100%;
    height: 60%;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    scroll-behavior: smooth;
    p {
      color: #999;
      // mix-blend-mode: difference;
      padding: 0.3rem 0;
      font-size: 0.4rem;
      padding: 0.4rem;
      // filter: invert(.8);
    }
    .active {
      color: #fff;
      font-size: 0.6rem;
    }
  }
  .control-box {
    width: 100%;
    height: 3.5rem;
    margin-bottom: 0.3rem;
    ul {
      display: flex;
      justify-content: space-around;
      .menu {
        .menuIcon {
          width: 0.7rem;
          height: 0.7rem;
        }
      }
    }
    .conCenter {
      margin: 0.5rem 0;
      text-align: center;
      color: #fff;
      padding: 0 0.65rem;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 1rem;
        color: #fff;
      }
      .startTime {
        padding-right: 0.3rem;
      }
      .endTime {
        padding-left: 0.3rem;
      }
      .progress {
        width: 100%;
        height: 0.1rem;
        outline:none &:focus {
          background: blue;
          outline: none;
        }
      }
    }
    .conBottom {
      display: flex;
      justify-content: space-around;
      height: 1.5rem;
      .playSong,
      .pausedSong {
        width: 1.5rem;
        display: flex;
        justify-content: center;
      }
      li {
        display: flex;
        align-items: center;
        .conIcon {
          width: 0.7rem;
          height: 0.7rem;
        }
        .pausedIcon {
          width: 1.3rem;
          height: 1.3rem;
        }
        .playIcon {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
}
// 顶部返回
.back {
  z-index: 111111;
  position: fixed;
  top: 0;
  padding: 0.2rem 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 0 0 0.2rem 0.2rem;
  width: 100%;
  .goBack {
    font-size: 0.8rem;
  }
  span {
    font-size: 0.5rem;
    margin-left: 0.4rem;
    font-weight: 700;
    color: @fontColor;
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
</style>
