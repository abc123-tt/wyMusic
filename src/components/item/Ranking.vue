<template>
  <div class="container">
    <div class="tit">
      <!-- 标题部分 -->
      <div class="tit-font">
        <b>排行榜</b>
        <font-awesome-icon
          class="titIcon"
          icon="angle-right"
        />
      </div>
      <div class="tit-more">
        <font-awesome-icon
          class="titMore"
          icon="ellipsis-vertical"
          @click="showMore"
        />
      </div>
      <!-- 更多 -->
      <van-action-sheet
        v-model:show="moreBtn"
        :actions="actions"
        description="这是一段描述信息"
        close-on-click-action
      />
    </div>
    <!-- 内容 -->
    <van-swipe
      class="my-swipe"
      :loop="false"
      :show-indicators="false"
      :width="350"
    >
      <van-swipe-item
        class="swipeItem"
        v-for="(item,index) in data.rankList"
        :key="index"
      >
        <div class="card-box">
          <p class="rankName">{{item.name}}<van-icon
              name="arrow"
              class="right-icon"
            /></p>
          <div
            class="content"
            v-for="(musicItem,index) in data.rankMusic[index]"
            :key="index"
          >
            <div class="item">
              <img
                :src="musicItem.al.picUrl"
                alt=""
                class="musicPic"
              >
              <span class="number">{{index+1}}</span>
              <div class="nameBox">
                <p class="musicName">{{musicItem.name}}</p>
                <p class="singerBox">
                  <span
                    class="singer"
                    v-for="(singerName,index) in musicItem.ar"
                    :key="index"
                  >{{singerName.name}}&emsp;</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script setup lang='ts'>
import { Swipe, SwipeItem } from "vant";
import { onMounted, reactive, Raw, computed } from "vue";
import { getAPIdata } from "../../server/api";
import {useStore} from '../../store/index'
const $store = useStore()
const data = reactive({
  rankList: [],
  rankMusic: [],
});
const getRanking = async () => {
  const res = await getAPIdata("GET", "/toplist?limit=5");
  data.rankList = res.data.list.splice(0, 4);
  
  getRankMusic();
};
const getRankMusic = () => {
  data.rankList.forEach(async (item, index) => {
    const res = await getAPIdata(
      "GET",
      `/playlist/track/all?id=${item.id}&limit=3`
    );
    data.rankMusic.push(res.data.songs);
  });
};

onMounted(() => {
  getRanking();
});
</script>
<style lang='less' scoped>
.container {
  .tit {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    &-font {
      font-size: 0.5rem;
      color: #5e6571;
      font-weight: bold;
      b {
        margin-right: 5px;
      }
    }
    &-more {
      font-size: 0.5rem;
      color: #999;
    }
  }
  .my-swipe {
    .swipeItem {
      box-sizing: border-box;
      padding-right: 0.3rem;
    }
    .card-box {
      width: 100%;
      border: 1px solid #cccc;
      border-radius: 0.2rem;
      box-shadow: 0 0 0.2rem 0 rgba(0, 0, 0, 0.1);
      padding: 0.3rem;
      box-sizing: border-box;
      .rankName,
      .right-icon {
        font-size: 0.4rem;
        color: #5e6571;
        font-weight: bold;
        margin: 0.1rem 0;
      }
      .content {
        margin-top: 0.3rem;
        .item {
          margin: 0.3rem 0;
          display: flex;
          align-items: center;
          .musicPic {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.3rem;
          }
          .number {
            font-size: 0.35rem;
            font-weight: bold;
            margin: 0 0.3rem;
          }
          .nameBox {
            width: 65%;
            .musicName {
              width: 100%;
              font-size: 0.4rem;
              font-weight: bold;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .singerBox {
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              .singer {
                display: inline-block;
                margin-top: 0.2rem;
                color: #999;
              }
            }
          }
        }
      }
    }
  }
}
</style>
