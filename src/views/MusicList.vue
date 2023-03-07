<template>
  <div class="tit">
    <!-- 标题部分 -->
    <div class="tit-font">
      <b>推荐歌单</b>
      <font-awesome-icon
        class="titIcon"
        icon="angle-right"
      />
    </div>
    <div class="tit-more">
      <font-awesome-icon
        class="titMore"
        icon="ellipsis-vertical"
        @click="showMore"
      />
    </div>
    <!-- 更多 -->
    <van-action-sheet
      v-model:show="moreBtn"
      :actions="actions"
      description="这是一段描述信息"
      close-on-click-action
    />
  </div>
  <div class="music-list">
    neirong 
  </div>
</template>
<script setup lang='ts'>
import { ref } from "vue";
// 推荐歌单的三个点
let moreBtn = ref(false);
const actions = [
  { name: "优先推荐" },
  { name: "减少推荐" },
  { name: "更多推荐" },
];
const showMore = () => {
  moreBtn.value = true;
};
</script>
<style lang='less' scoped>
.tit {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  &-font {
    font-size: 0.5rem;
    color: #5e6571;
    font-weight: bold;
    b {
      margin-right: 5px;
    }
  }
  &-more {
    font-size: 0.5rem;
    color: #999;
  }
}
</style>
