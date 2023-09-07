<template>
  <div class="con">
    <MusicList></MusicList>
    <NewMusicVue></NewMusicVue> 
    <RankingVue></RankingVue> 
  </div>
</template>
<script setup lang='ts'>
import MusicList from "../item/MusicList.vue";
import NewMusicVue from '../item/NewMusic.vue'
import RankingVue from "../item/Ranking.vue";
</script>
<style lang='less' scoped>
.con {
  padding: 0 15px;
  position: relative;
  margin-bottom: 3.5rem;
}
</style>
