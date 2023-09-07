<template>
  <div class="music-list">
    <van-sticky
      width="100%"
      :offset-top="props.isTop ? '1.32rem' : '0'"
    >
      <div class="listTitle">
        <div class="playAll">
          <van-icon
            class="playIcon"
            name="play-circle"
            @click="allPlay"
          />
          <b>播放全部 <span>({{ songList.songs.length }})</span></b>
        </div>
        <div class="downLoad">
          <van-icon
            class="down-icon"
            name="down"
          />
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
              <span
                v-if="item.fee != 8"
                class="vip"
              >VIP</span>
              <span
                class="singer"
                v-for="(singerName, index) in item.ar"
                :key="index"
              >{{ singerName.name
                }}<span v-if="item.ar.length >= 2">&nbsp;</span></span>
            </div>
          </div>
          <div class="song-right">
            <div class="mv-icon">
              <van-icon
                @click="playMV(item.mv)"
                name="play-circle-o"
                v-if="item.mv != 0"
              />
              <font-awesome-icon
                class="more-icon"
                icon="ellipsis-vertical"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div
    class="loadingBox"
    v-if="isLoading"
  >

    <van-loading
      color="#fff"
      class="loadingIcon"
      size="60px"
      vertical
      type="spinner"
    >加载中...</van-loading>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, defineProps } from "vue";
import { getAPIdata } from "../../server/api";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store/index";
import { showFailToast } from "vant";
import PlayVue from "../../components/item/Play.vue";
const store = useStore();
const route = useRoute();
const router = useRouter();
const songList = reactive({
  songs: [] as any[],
});
const isLoading = ref<boolean>(false);
const props = defineProps<{
  isTop: any;
}>();
const id = route.query.id;

const getData = async () => {
  const res = await getAPIdata("GET", `/playlist/track/all?id=${id}&limit=30`);
  songList.songs = res.data.songs;
};

// 播放单首歌曲
const playSong = async (item: any, index: number) => {
  store.play(item, index);
  const res = await getAPIdata("GET", `/check/music?id=${item[index].id}`);
  if (!res.data.success) {
    showFailToast("对不起，该歌曲暂时无版权");
    return false;
  }
};
// 播放所有歌曲
const allPlay = () => {
  store.play(songList.songs, 0);
};
// 跳转到mv页面
const playMV = (mvId) => {
  isLoading.value = true;
  let timer = null;
  setTimeout(() => {
    router.push({
      path: "/mv",
      query: {
        id: mvId,
      },
    });
  }, 1500);
  clearTimeout(timer);
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
        color: #346ced;
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
.loadingBox {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  z-index: 1111111;
  position: fixed;
  top: 0;
  left: 0;
  .loadingIcon {
    position: absolute;
    top: 9rem;
    left: 4.3rem;
  }
}
</style>
