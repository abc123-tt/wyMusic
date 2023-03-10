<template>
  <div class="con">
    <MusicList></MusicList>

  </div>
</template>
<script setup lang='ts'>
import { ref } from "vue";
import MusicList from "../views/MusicList.vue";
</script>
<style lang='less' scoped>
.con {
  padding: 0 15px;
  position: relative;
 
}
</style>
