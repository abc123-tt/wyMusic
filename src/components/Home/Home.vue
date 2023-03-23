<template>
  <div class="app">
    <router-view></router-view>
    <div class="bottom-box">
      <div class="playCom">
        <PlayVue></PlayVue>
      </div>
      <div class="footer">
        <FooterVue></FooterVue>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FooterVue from "./Footer.vue";
import PlayVue from "../item/Play.vue";
</script>
<style lang="less" scoped>
.app{
  position:relative;
}
.bottom-box{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
