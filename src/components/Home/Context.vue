<template>
  <div class="con">
    <MusicList></MusicList>
    <RankingVue></RankingVue>  
  </div>
</template>
<script setup lang='ts'>
import MusicList from "../item/MusicList.vue";
import RankingVue from '../item/NewMusic.vue'
</script>
<style lang='less' scoped>
.con {
  padding: 0 15px;
  position: relative;
  margin-bottom: 3rem;
}
</style>
