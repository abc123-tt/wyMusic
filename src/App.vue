<template>
  <div>
    <!-- <LoadingVue></LoadingVue> -->
    <router-view></router-view>
    <div :class="[$store.playPosition ? 'otherStyle':'defStyle']">
      <PlayVue v-if="$store.isPlayCom"></PlayVue>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import {useStore} from './store/index'
import PlayVue from "./components/item/Play.vue";
const route = useRoute();
const $store = useStore()
</script>
<style scoped lang="less">
.defStyle {
  position: fixed;
  left: 0;
  bottom: 1.6rem;
  width: 100%;
}
.otherStyle {
  position: fixed;
  left: 0;
  bottom: -3px;
  width: 100%;
}


  
</style>
