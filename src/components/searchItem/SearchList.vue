<template>
  <div class="container">
    <div class="searchCom">
      <font-awesome-icon
        class="toBack"
        icon="arrow-left"
        @click="$router.go(-1)"
      />
      <van-search
        class="search-input"
        v-model="keyValue"
        clearable="true"
        ref="myInput"
        @clear="onClear"
      />
      <span class="searFont">搜索</span>
    </div>
    <!-- 搜索结果歌曲列表 -->
    <div class="card" v-if="data.songsList.length > 0">
      <div class="listHead">
        <b class="listTitle">单曲</b>
        <span class="all" @click="playAll">
          <van-icon name="play" class="play" />
          播放全部
        </span>
      </div>
      <ul class="list">
        <li class="listItem" v-for="(item,index) in data.songsList" :key="index">
          <div class="itemLeft" @click="playSong(data.songsList,index)">
            <span class="songsName">{{item.name}}</span>
            <p>
              <span class="isVip" v-if="item.fee != 8">VIP</span>
              <span v-for="(singerName , index) in item.ar" :key="index" class="singer">{{singerName.name}} - <span>{{item.name}}</span></span>
            </p>
          </div>
          <div class="itemRight">
            <van-icon
              name="play-circle-o"
              v-if="item.mv != 0"
              class="play-icon"
            />
            <font-awesome-icon class="more-icon" icon="ellipsis-vertical" />
          </div>
        </li>
      </ul>
    </div>
    <div class="empty" v-else>
      <van-empty description="暂时无版权" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '../../store/index';
import SearchComVue from '../../views/SearchCom.vue';
const $store = useStore();
const $route = useRoute();
const $router = useRouter();

const myInput = ref(null);
const keyValue  =ref<string>()
const data = reactive<Object<T>>({
  songsList: [],
});
// 清除输入框时返回搜索页
const onClear = () => {
  $router.push('/search');
};

// 播放一首歌曲
const playSong = (item,index)=>{
  $store.play(item,index);
}
// 播放全部歌曲
const playAll = ()=>{
   $store.setAllSongs(data.songsList); 
   $store.play()
}

onMounted(() => {
  $store.playPosition = true
  data.songsList = $store.searchList;
  keyValue.value = $store.searchKeyWord
  
  

  setTimeout(() => {
    myInput.value.focus();
  }, 300);
});
</script>
<style lang="less" scoped>
@defColor: #fa3937;
.container {
  background-color: #f6f6f6;
  padding: 0.3rem;
  height: 100vh;
  .searchCom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    .toBack {
      font-size: 0.6rem;
    }
    .searFont {
      font-size: 0.4rem;
      font-family: '黑体';
      font-weight: 700;
    }
    /deep/.van-search {
      padding: 0;
      width: 80% !important;
      border-radius: 0.5rem;
      border: 1px solid #ccc;
      .van-search__content {
        background-color: #fff;
        border-radius: 0.5rem;
      }
    }
  }
  .card {
    width: 100%;
    background-color: #fff;
    border-radius: 0.2rem;
    padding: 0.5rem 0.4rem;
    box-sizing: border-box;
    .listHead {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eeee;
      padding-bottom: 0.3rem;
      align-items: center;
      .listTitle {
        font-size: 0.5rem;
        font-weight: 700;
        font-family: '黑体';
      }
      .all {
        padding: 0.1rem 0.3rem;
        border: 1px solid @defColor;
        border-radius: 0.5rem;
        color: @defColor;
        display: flex;
        align-items: center;
        .play {
          font-size: 0.4rem;
        }
      }
    }
    .list {
      padding-bottom:.8rem;
      .listItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .itemLeft {
          width: 80%;
          padding: 0.2rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .songsName {
            padding: 0.15rem 0;
            font-size: 0.37rem;
            font-family: '黑体';
            font-weight: 400;
          }
          .isVip {
            display: inline-block;
            border-radius: .1rem;
            border: 1px solid @defColor;
            font-size: 10px;
            color: @defColor;
            margin-right: .2rem;
          }
          .singer{
            color: #666;
            
          }
        }
        .itemRight {
          width: 20%;
          text-align: right;
          font-size: 0.5rem;
          color: #666;
          .play-icon {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
}

.empty {
  width: 100%;
  height: 100vh;
}
</style>
