<template>
  <div class="container">
    <h1 class="title">MV广场</h1>
    <main>
      <ul>
        <li
          class="mvItem"
          v-for="(item,index) in data.mvData"
          :key="index"
          @click="playMv(item.id)"
        >
          <img
            :src="item.cover"
            alt=""
            class="mvCover"
          >
          <p class="mvName">{{item.name}}</p>
          <div class="authInfo">
          
            <span class="author">{{item.artistName}} </span>
            <span class="like">
              <span class="likeNum">{{item.playCount}}</span>
            </span>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script setup lang='ts'>
import { onMounted, reactive, ref } from "vue";
import { getAPIdata } from "../../server/api";
import {useRouter} from 'vue-router'
const $router = useRouter()
const data = reactive<Object<T>>({
  mvData: [],
});

const getMv = async () => {
  const res = await getAPIdata("GET", "/mv/first?limit=30");
  data.mvData = res.data.data;
};
const playMv = (mvId)=>{
  $router.push({
    path:'/mv',
    query:{
      id:mvId
    }
  })
}
onMounted(() => {
  getMv();
});
</script>
<style lang='less' scoped>
.container {
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background-color: #f6f6f6;
  .title {
    width: 100%;
    padding: 0.5rem 0;
    text-align: center;
    font-size: 0.6rem;
  }
  main {
    ul {
      width: 100%;
      margin-bottom: 3rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.2rem;
      .mvItem {
        background: #fff;
        border-radius: 0.3rem;
        .mvCover {
          width: 4.5rem;
          height: 3rem;
          border-radius: 0.3rem 0.3rem 0 0;
        }
        .mvName {
          font-size: 0.4rem;
          font-weight: 700;
          padding: 0.3rem;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 4.5rem;
          white-space: nowrap;
        }
        .authInfo{
          display: flex;
          justify-content: space-between;
          padding: 0 .3rem .3rem .3rem;
          box-sizing:border-box;
          
        }
      }
    }
  }
}
</style>
