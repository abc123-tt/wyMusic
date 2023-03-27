<template>
  <div>
    <router-view></router-view>
    <div class="bottom-box">
      <FooterVue :isBottom="true"></FooterVue>
    </div>
  </div>
</template>
<script setup lang="ts">
import FooterVue from "./Footer.vue";
</script>
<style lang="less" scoped>
.bottom-box {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
