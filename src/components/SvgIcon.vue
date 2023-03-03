<template>
  <svg :class="svgIcon">
    <use :href="'#icon-'+iconName"></use>
  </svg>
</template>
<script setup lang='ts'>
//  定义当前这个组件所需要的props 
defineProps<{
  iconName:string,
  svgIcon:{
    type:string,
    defind:()=>'icon-svg'
  }
}>()
</script>
<style lang='less'>
 .icon-svg{
  width: 100px;
  height: 20px;
 }
</style>
