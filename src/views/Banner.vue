<template>
  <div class="banner">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item v-for="item in state.imageUrl"><img
          :src="item.pic"
          alt=""
        ></van-swipe-item>
    </van-swipe>
    
  </div>
</template>
<script setup lang='ts'>
import { onMounted,reactive} from "@vue/runtime-core";
import { getBanner } from "../server/api";
// 因为使用常量无法赋值，使用reactive是一个响应式操作，不会影响原来的地址
const  state = reactive({
  imageUrl:[]
})
onMounted(async () => {
  const res = await getBanner();
  state.imageUrl = res.data.banners
  console.log(state.imageUrl);
  
  // function test(...obj){
  //   console.log(obj);
    
  // }
  // test("GET","abc")
});
</script>
<style lang='less' scoped>
.my-swipe {
  border-radius: 12px;
  height: 3.25rem;
  .van-swipe-item {
    line-height: 150px;
    text-align: center;
    img {
      width: 100%;
      max-height: 100%;
    }
  }
  .van-swipe__indicators {
    left: 20%;
  }
}
</style>
