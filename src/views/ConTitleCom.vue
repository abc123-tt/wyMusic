<template>
  <div class="tit">
    <div>
      <slot name="titFont">标题</slot>
      <slot name="titIcon">箭头</slot>
    </div>
    <div>
      <slot name="titMore">更多</slot>
    </div>
  </div>
</template>
<script setup lang='ts'>
</script>
<style lang='less' scoped>
.tit{
  display: flex;
  justify-content: space-between;
}
</style>
