<template>
  <div v-if="showOverLay">
    <img src="../../assets/loading.jpg" alt="" class="overlay" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref} from "vue";

const showOverLay = ref(true);
onMounted(() => {
   setTimeout(() => {
    showOverLay.value = false;
  }, 1500);
  
});
</script>
<style lang="less" scoped>
.overlay {
  z-index: 111;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center center;
}
</style>
