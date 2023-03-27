<template>
  <div>
    <router-view></router-view>
    <div :class="[route.name == 'detail'? 'musicPlay':'defStyle']">
      <PlayVue></PlayVue>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import PlayVue from "./components/item/Play.vue";
const route = useRoute();
</script>
<style scoped lang="less">
.musicPlay {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  
}
.defStyle {
  position: fixed;
  left: 0;
  bottom: 1.5rem;
  width: 100%;
  }
</style>
