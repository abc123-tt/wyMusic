<template>
  <svg :class="SvgIcon">
    <use :href="`#icon-${iconName}`"></use>
  </svg>
</template>
<script setup lang='ts'>
//  定义当前这个组件所需要的props 
defineProps<{
  iconName:string,
  SvgIcon:{
    type:string,
    defind:()=>'svg-icon'
  }
}>()
</script>
<style lang='less'>
 
</style>
