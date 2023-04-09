<template>
  <div class="page">
    <SearchVue class="searchCom">
      <template #menuBtn>
        <font-awesome-icon
          class="toBack"
          icon="arrow-left"
          @click="$router.push('/discovery')"
        />
      </template>
      <template #searchBox>
        <van-search
          class="search-input"
          v-model="searchValue"
          placeholder="KASTRA"
          @keydown.enter.stop="toSearch"
          clearable="true"
        />
      </template>
      <template #songIcon>
        <span class="search" @click="toSearch">搜索</span>
      </template>
    </SearchVue>
    <div class="other-search">
      <ul>
        <li v-for="(item, index) in localData.otherSear" :key="index">
          <svg-icon class="other-icon" :iconName="item.icon"></svg-icon>
          <span class="">{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <div class="history">
      <div class="his-title">
        <span>搜索历史</span>
        <font-awesome-icon
          class="clean"
          :icon="['fasl', 'trash-can']"
          @click="clearRecorde"
        />
      </div>
      <!-- 搜索历史 -->
      <van-tag
        v-for="(words, index) in data.keyWordArray"
        :key="index"
        round
        color="#fff"
        class="his-label"
        >{{ words }}</van-tag
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchVue from "../../views/SearchCom.vue";
import localData from "../../plugin/localData.js";
import { onMounted, onUnmounted, reactive, ref, watch ,computed} from "vue";
import { showNotify } from "vant";
import { showConfirmDialog } from 'vant';
import { showToast } from 'vant';
// 存放搜索历史
const data = reactive<Object<T>>({
  keyWordArray: [],
});
const searchValue = ref<string | number>();
  // 数组保存前去重
const newArrayFn = (arr)=>{
  return [...new Set(arr)]

}
// 搜索
const toSearch = () => {
  const keyWord = searchValue.value.trim();
  if (keyWord === "" || keyWord == " ") {
    showNotify({ type: "danger", message: "请输入内容", duration: 2000 });
    searchValue.value = "";
    return false;
  }
  data.keyWordArray.unshift(searchValue.value);
  localStorage.setItem("keyWordArray", JSON.stringify(newArrayFn(data.keyWordArray)));
  searchValue.value = "";
};
// 清除历史记录
const clearRecorde = ()=>{
showConfirmDialog({
  message:
    '确定要清空搜索记录吗？',
})
  .then(() => {
    localStorage.removeItem('keyWordArray')
    data.keyWordArray = JSON.parse(localStorage.getItem("keyWordArray")) || [];
  })
  .catch(() => {
    showToast('已取消操作');
  });
}
onMounted(() => {
  data.keyWordArray = JSON.parse(localStorage.getItem("keyWordArray")) || [];


});
</script>
<style lang="less" scoped>
.page {
  background-color: #f6f8fe;
  height: 100vh;
  width: 100%;
}
.searchCom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  padding: 0.35rem 0.25rem;
  .toBack {
    font-size: 0.7rem;
  }
  /deep/.search-input {
    font-size: 0.1rem;
    width: 80%;
    padding: 0;
    border-radius: 0.4rem;
    background-color: #fff;
    .van-search__content {
      border-radius: 0.4rem;
      padding-left: 0 !important;
      color: #666;
      ::placeholder {
        color: #999;
      }
    }
  }
  .search {
    font-size: 0.4rem;
    font-family: "宋体";
    font-weight: 700;
  }
}
.other-search {
  // padding: 0 .4rem;
  ul {
    display: flex;
    text-align: center;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      font-size: 0.35rem;
      font-weight: 700;
      color: #333;
      // background-color: red;
      border-right: 1px solid #ccc;
      .other-icon {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.1rem;
      }
      &:last-child {
        border: 0;
        .other-icon {
          width: 0.8rem;
          height: 0.6rem;
        }
      }
    }
  }
}
.history {
  padding: 0 0.4rem;
  margin: 0.5rem 0;
  .his-title {
    font-size: 0.35rem;
    font-family: "微软雅黑";
    display: flex;
    justify-content: space-between;
    // margin-bottom: 0.3rem;
    span {
      font-weight: 700;
      color: #333;
    }
    .clean {
      color: #666;
    }
  }
  .his-label {
    color: #666;
    font-weight: 700;
    margin-right: 0.3rem;
    margin-top: 0.3rem;
  }
  /deep/.van-tag {
    padding: 0.1rem 0.3rem;
  }
}
/deep/.van-field__left-icon {
  padding-left: 0.3rem;
}
/deep/.van-field__body {
  .van-icon {
    padding-right: 0.8rem;
  }
}
</style>
