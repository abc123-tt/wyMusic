<template>
  <div class="container">
    <div class="topNav">
       <van-icon name="arrow-left" @click="goBack" class="backIcon"/>
       <van-icon name="share-o" class="shareIcon"/>
       {{info.musicInfo}}
    </div>
  </div>
</template>
<script setup lang='ts'>
import { onMounted } from "vue";
import {useStore} from '../store/index'
const $store = useStore()
const info = defineProps<{
  musicInfo:{
    type:Array,
    default:[]
  }
}>()
const goBack = ()=>{
  $store.isShowLyric = false
}
 onMounted(()=>{
  console.log(info);
  
 })
</script>
<style lang='less' scoped>
  .container{
    .topNav{
      .backIcon,.shareIcon{
        font-size: .8rem;
        color: #000;
      }
    }
  }
</style>
