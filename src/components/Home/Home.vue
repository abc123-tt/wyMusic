<template>
  <div class="app">
    <router-view></router-view>
    <div class="bottom-box">
      <div class="footer">
        <FooterVue :show="true"></FooterVue>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FooterVue from "./Footer.vue";
</script>
<style lang="less" scoped>
.app {
  position: relative;
}
.bottom-box {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
