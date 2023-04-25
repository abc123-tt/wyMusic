<template>
  <div class="music-list">
    <van-sticky positioon="bottom" :offset-top="props.isTop ? '49.5' : '0'">
      <div class="listTitle">
        <div class="playAll">
          <van-icon class="playIcon" name="play-circle" @click="allPlay" />
          <b
            >播放全部 <span>({{ songList.songs.length }})</span></b
          >
        </div>
        <div class="downLoad">
          <van-icon class="down-icon" name="down" />
          <font-awesome-icon icon="fa-list-check"></font-awesome-icon>
        </div>
      </div>
    </van-sticky>
    <!-- 歌曲列表 -->
    <div class="list-box">
      <ul>
        <li
          class="listItem"
          v-for="(item, index) in songList.songs"
          :key="item.id"
        >
          <div
            class="song-left"
            @click="playSong(songList.songs, index)"
            ref="activePlay"
          >
            <span class="listId">{{ index + 1 }}</span>
            <div class="songName-box">
              <p class="songName">{{ item.name }}</p>
              <span v-if="item.fee != 8" class="vip">VIP</span>
              <span
                class="singer"
                v-for="(singerName, index) in item.ar"
                :key="index"
                >{{ singerName.name
                }}<span v-if="item.ar.length >= 2">&nbsp;</span></span
              >
            </div>
          </div>
          <div class="song-right">
            <div class="mv-icon">
              <van-icon name="play-circle-o" v-if="item.mv != 0" />
              <font-awesome-icon class="more-icon" icon="ellipsis-vertical" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, defineProps } from 'vue';
import { getAPIdata } from '../../server/api';
import { useRoute } from 'vue-router';
import { useStore } from '../../store/index';

const store = useStore();
const route = useRoute();


// 歌曲数据
const songList = reactive({
  songs: [] as any[],
});
// 获取父组件传过来的数据
const props = defineProps<{
  // playList;
  // 控制播放全部的吸附的偏移值
  isTop: any;
}>();
const id = route.query.id;
// 获取歌曲数据
const getData = async () => {
  const res = await getAPIdata('GET', `/playlist/track/all?id=${id}&limit=30`);
  songList.songs = res.data.songs;
  // console.log(songList.songs);
};

// 播放单首歌曲
const playSong = (item: any, index: number) => {
  // 将歌单传过去和点击时是哪首歌的索引值传过去，在那边将currentSongIndex覆盖掉，然后在歌单中播放索引值为当前值的歌曲就能实现精准播放
  // 例如播放第十一首歌：playlist[10]
  store.play(item, index);
  // console.log(store.currentSongIndex);

};
// 播放所有歌曲
const allPlay = () => {
  store.setAllSongs(songList.songs);
  // 全部播放时将歌单传过去，并传一个默认值为0，表示从第一首歌开始播放，这样在播放过程中再次点击全部播放按钮就可以实现从第一首重新播放
  store.play(songList.songs,0);
};

onMounted(() => {
  getData();
  
});
</script>
<style lang="less" scoped>
.music-list {
  // 歌曲列表的头部
  .listTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0.28rem;
    background-color: #fff;
    border-radius: 0.3rem 0.3rem 0 0;

    .playAll {
      display: flex;
      align-items: center;
      .playIcon {
        margin-right: 0.3rem;
        font-size: 0.6rem;
        color: #fc473c;
      }
      b {
        font-size: 0.39rem;
        font-weight: 600;
        span {
          font-size: 0.3rem;
          font-weight: normal;
          color: #999;
        }
      }
    }
    .downLoad {
      font-size: 0.45rem;
      color: #666;
      .down-icon {
        margin-right: 0.5rem;
      }
      &:last-child {
        margin-right: 0.2rem;
      }
    }
  }
  // 歌曲列表
  .list-box {
    padding: 0.3rem 0.3rem;
    background-color: #fff;
    ul {
      padding-bottom: 1.1rem;
    }
    .listItem {
      display: flex;
      padding: 0.3rem 0;
      align-items: center;
      justify-content: space-between;
      .song-left {
        display: flex;
        width: 80%;
        align-items: center;
      }

      .listId {
        font-size: 0.35rem;
        color: #999;
        width: 8%;
        text-align: center;
        margin-right: 0.25rem;
      }
      .songName-box {
        width: 70%;
        .vip {
          display: inline-block;
          border-radius: 0.1rem;
          border: 1px solid #fc473c;
          font-size: 10px;
          color: #fc473c;
          margin-right: 0.1rem;
        }
        .songName {
          font-size: 0.38rem;
          font-weight: 400;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .singer {
          color: #999;
          display: inline-block;
          padding: 0.1rem 0;
        }
      }
      .mv-icon {
        margin-left: auto;
        color: rgb(182, 180, 180);
        font-size: 0.5rem;
        .more-icon {
          margin: 0 0.3rem 0 0.7rem;
          color: #ccc;
        }
      }
    }
  }
}
.isActive {
  color: #fc473c;
}
</style>
