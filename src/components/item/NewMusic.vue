<template>
  <div class="container">
    <div class="tit">
      <!-- 标题部分 -->
      <div class="tit-font">
        <b>推荐新音乐</b>
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

    <!-- 推荐新音乐内容 -->
    <van-swipe
      class="my-swipe"
      :loop="false"
      :show-indicators="false"
      :width="350"
    >
      <van-swipe-item
        v-for="(item,index) in data.newData"
        :key="index"
        class="swipeItem"
      >
      
        <ul class="newMusicList">
          <li v-for="(musicItem,index) in item" :key="index" class="listItem" @click="playSong(item,index)">
            <img :src="musicItem.picUrl" alt="" class="newPic">
            <div class="musicInfo">
              <strong class="musicName">{{musicItem.name}}</strong>
              <p class="singer" >
                <span class="vip" v-if="musicItem.song.fee != 8">VIP</span>
                <span v-for="ar in musicItem.song.artists" :key="ar">{{ar.name}}&emsp;</span>
              </p>
            </div>
            <van-icon name="like-o" class="likeIcon"/>
          </li>
        </ul>
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="line"></div>
</template>
<script setup lang='ts'>
import { getAPIdata } from "../../server/api";
import { onMounted, reactive,ref } from "vue";
import { Swipe, SwipeItem } from "vant";
import {useStore} from '../../store/index'
const $store = useStore()
const data = reactive({
  newData: {
    newMusic1: [],
    newMusic2: [],
    newMusic3: [],
  },
});

const getNewMusic = async () => {
  const res = await getAPIdata(
    "GET",
    "/personalized/newsong"
  );
  data.newData.newMusic1 = res.data.result.slice(0,3)
  data.newData.newMusic2 = res.data.result.slice(3,6)
  data.newData.newMusic3 = res.data.result.slice(6,9)
  
};
const playSong = (item,index)=>{
  $store.play(item,index)
}
onMounted(() => {
  getNewMusic();
});
</script>
<style lang='less' scoped>
.container {
  .tit {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    &-font {
      font-size: 0.5rem;
      color: #5e6571;
      font-weight: bold;
      display: flex;
      align-items: center;
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
    .newMusicList{
      .listItem{
        display: flex;
        margin-bottom: .3rem;
        align-items: center;
        box-sizing: border-box;
        .newPic{
          width: 1.5rem;
          height: 1.5rem;
          border-radius: .3rem;
          margin-right: .3rem;
        }
        .musicInfo{
          width: 65%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .musicName{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: .4rem;
            font-family: '黑体';
            font-weight: 700;
            color: #3d424b;
            margin-bottom: .2rem;
            padding: .1rem 0;
          }
          .singer{
            color: #999;
            .vip{
              display: inline-block;
              padding: 0 .1rem;
              border: 1px solid #fd3a3b ;
              border-radius:.2rem ;
              color: #fd3a3b;
              margin-right: .2rem;
            }
          }
        }
        .likeIcon{
          font-size: .5rem;
          margin-left: .3rem;
        }
      }
    }
  }
}
.line{
  width: 100%;
  height: 0.5px;
  background-color: #eee;
  margin: .3rem 0;
}
</style>