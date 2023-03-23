<template>
  <div class="music-list">
    <div class="listTitle">
      <div class="playAll">
        <van-icon class="playIcon" name="play-circle" />
        <b
          >播放全部 <span>({{ songList.songs.length }})</span></b
        >
      </div>
      <div class="downLoad">
        <van-icon class="down-icon" name="down" />
        <font-awesome-icon icon="fa-list-check"></font-awesome-icon>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="list-box">
      <ul>
        <li
          class="listItem"
          v-for="(item, index) in songList.songs"
          :key="item.id"
        >
          <span class="listId">{{ index + 1 }}</span>
          <div class="songName-box">
            <p class="songName">{{ item.name }}</p>
            <span class="singer" v-for="(singerName,index) in item.ar" :key="index">{{singerName.name}}<span v-if="item.ar.length >=2">&nbsp;</span></span>
          </div>
          <div class="mv-icon">
            <van-icon name="play-circle-o" v-if="item.mv != 0"/>
            <font-awesome-icon
              class="more-icon"
              icon="ellipsis-vertical"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { getAPIdata } from "../../server/api";
import { useRoute } from "vue-router";
const route = useRoute();

// 歌曲数据
const songList = reactive({
  songs: [] as any[],
});
defineProps<{
  playList;
}>();
const id = route.query.id;

const getData = async () => {
  const res = await getAPIdata("GET", `/playlist/track/all?id=${id}&limit=30`);
  songList.songs = res.data.songs;
  console.log(songList.songs);
  
};
onMounted(() => {
  getData();
});
</script>
<style lang="less" scoped>
.music-list {
  height: 10rem;
  width: 100%;
  background-color: #fff;
  margin-top: 0.2rem;
  border-radius: 0.3rem 0.3rem 0 0;
  padding: 0.4rem 0.3rem;
  box-sizing: border-box;
  // 歌曲列表的头部
  .listTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.2rem;
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
    .listItem {
      display: flex;
      padding: .3rem 0;
      align-items: center;
      .listId {
        margin:0 0.5rem 0 .15rem;
        font-size: .35rem;
        color: #999;
      }
      .songName-box{
        .songName{
          font-size: .38rem;
          font-weight: 400;
        }
        .singer{
          color:#999;
          display: inline-block;
          padding: .1rem 0;
        }
      }
      .mv-icon{
        margin-left:auto;
        color: rgb(182, 180, 180);
        font-size: .5rem;
        .more-icon{
          margin:0 .3rem 0 .7rem;
          color: #ccc;
          
        }
      }
    }

  }
}
</style>
