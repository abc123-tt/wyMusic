<template>
  <div>
    <!-- <LoadingVue></LoadingVue> -->
    <!-- <LoginVue></LoginVue> -->
    <router-view></router-view>
    <div :class="[$store.playPosition ? 'musicPlay':'defStyle']">
      <PlayVue v-if="$store.isPlayCom"></PlayVue>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import {useStore} from './store/index'
import PlayVue from "./components/item/Play.vue";
// import LoadingVue from './components/Home/Loading.vue'
import LoginVue from './components/Login.vue'
const route = useRoute();
const $store = useStore()
</script>
<style scoped lang="less">
.musicPlay {
  position: fixed;
  left: 0;
  bottom: -3px;
  width: 100%;
}
.defStyle {
  position: fixed;
  left: 0;
  bottom: 1.5rem;
  width: 100%;
  }

  
</style>
