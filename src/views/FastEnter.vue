<template>
  <div class="fast">
    <div class="icon-item">
      <div class="fast-bg">
        <font-awesome-icon
          class="icon"
          icon="calendar-day"
        />
      </div>
      <span>每日推荐</span>
    </div>
    <div class="icon-item">
      <div class="fast-bg">
        <font-awesome-icon
          class="icon"
          icon="radio"
        />
      </div>
      <span>私人FM</span>
    </div>
    <div class="icon-item">
      <div class="fast-bg">
        <font-awesome-icon
          class="icon"
          icon="list"
        />
      </div>
      <span>歌单</span>
    </div>
    <div class="icon-item">
      <div class="fast-bg">
        <font-awesome-icon
          class="icon"
          icon="ranking-star"
        />
      </div>
      <span>排行榜</span>
    </div>
    <div class="icon-item">
      <div class="fast-bg">
        <font-awesome-icon
          class="icon"
          icon="book-bookmark"
        />
      </div>
      <span>有声书</span>
    </div>
  </div>

</template>
<script setup lang='ts'>
</script>
<style lang='less'>
.fast {
  display: flex;
  margin: 18px 0 30px 0;
  justify-content: space-around;
  width: 100%;
  .icon-item {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .fast-bg {
      width: 1.2rem;
      height: 1.2rem;
      background-color: rgba(242, 199, 199, 0.3);
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.2rem;
    }
    span {
      color: #666;
    }
  }
}
.icon {
  font-size: 0.6rem;
  color: #ff3d4f;
}
</style>
