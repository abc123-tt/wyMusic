<template>
  <div class="play-box">
    <div class="play-left">
      <div class="songImg"></div>
      <span>歌名</span>
    </div>
    <div class="play-right">
      <van-icon class="playIcon" name="play-circle-o" />
      <svg-icon class="playlist" iconName="playlist"></svg-icon>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="less" scoped>
.play-box {
  box-sizing: border-box;
  padding: 0 0.55rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.2rem;
  border-top: 0.5px solid #eee;
  background: rgba(255, 255, 255, 0.8);
 
  .play-left {
    display: flex;
    align-items: center;
    .songImg {
      width: 0.8rem;
      height: 0.8rem;
      background-color: red;
      border-radius: 50%;
      margin-right: 0.3rem;
    }
  }
  .play-right {
    .playIcon {
      font-size: 0.6rem !important;
      margin-right: 0.6rem;
    }
    .playlist {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
</style>
