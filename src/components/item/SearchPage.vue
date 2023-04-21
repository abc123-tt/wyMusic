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
          ref="myInput"
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
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <!-- 搜索历史 -->
    <div class="history">
      <div class="his-title">
        <span>搜索历史</span>
        <font-awesome-icon
          class="clean"
          :icon="['fasl', 'trash-can']"
          @click="clearRecorde"
        />
      </div>
      <!-- 搜索历史数组 -->
      <van-tag
        v-for="(words, index) in data.keyWordArray"
        :key="index"
        round
        color="#fff"
        class="his-label"
        @click="hisSearch(words)"
        >{{ words }}</van-tag
      >
    </div>
    <!-- 热搜榜 -->
    <div class="hot">
      <van-swipe
        class="hot-swipe"
        :loop="false"
        :show-indicators="false"
        :width="220"
      >
        <van-swipe-item>
          <div class="hotlist">
            <h1>热搜榜</h1>
            <div class="line"></div>
            <ul>
              <li
                v-for="(item, index) in searchData.hotList"
                :key="index"
                @click="searchKeyWord(item.searchWord)"
              >
                <span>{{ index + 1 }}</span
                >{{ item.searchWord }}
              </li>
            </ul>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="hotlist">
            <h1>有声书榜</h1>
            <div class="line"></div>
            <ul>
              <li v-for="(item, index) in searchData.booksData" :key="index">
                <span>{{ index + 1 }}</span
                >{{ item }}
              </li>
            </ul>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchVue from '../../views/SearchCom.vue';
import localData from '../../plugin/localData.js';
import SearchListVue from './SearchList.vue';
import { onMounted, onUnmounted, reactive, ref, watch, computed } from 'vue';
import { showNotify } from 'vant';
import { showConfirmDialog } from 'vant';
import { showToast } from 'vant';
import { getAPIdata } from '../../server/api';
import { Swipe, SwipeItem } from 'vant';
import { useRouter } from 'vue-router';
import { useStore } from '../../store/index';
const $store = useStore();
const router = useRouter();
// 存放搜索历史
const data = reactive<Object<T>>({
  keyWordArray: [],
});
const searchData = reactive<Object<T>>({
  hotList: [],
  booksData: [],
  searchList: [],
});

const searchValue = ref<string | number>();
// 获取输入框元素
const myInput = ref(null);

// 搜索
const toSearch = async () => {
  // 对输入框做过滤
  const keyWord = searchValue.value.trim();
  if (keyWord === '' || keyWord == ' ') {
    showNotify({ type: 'danger', message: '请输入内容', duration: 2000 });
    searchValue.value = '';
    return false;
  }
  // 保存到数组里面之前先判断是否存在该关键词
  if (data.keyWordArray.indexOf(searchValue.value) == -1) {
    data.keyWordArray.unshift(searchValue.value);
  }
  localStorage.setItem('keyWordArray', JSON.stringify(data.keyWordArray));

  const res = await getAPIdata(
    'GET',
    `/cloudsearch?keywords=${searchValue.value}`
  );

  searchData.searchList = res.data.result.songs;
  $store.storageList(searchData.searchList,searchValue.value);
  router.push('/searchlist');
  searchValue.value = '';
};
// 清除历史记录
const clearRecorde = () => {
  showConfirmDialog({
    message: '确定要清空搜索记录吗？',
  })
    .then(() => {
      localStorage.removeItem('keyWordArray');
      data.keyWordArray =
        JSON.parse(localStorage.getItem('keyWordArray')) || [];
      showToast('删除成功');
    })
    .catch(() => {
      showToast('已取消操作');
    });
};

// 点击热搜榜可以直接搜索
const searchKeyWord = (key) => {
  searchValue.value = key;
  toSearch();
};
// 点击搜索历史可以快捷搜索
const hisSearch = (keyWord) => {
  searchValue.value = keyWord;
  toSearch();
};
onMounted(async () => {
  $store.playPosition = true
  const searchHot = await getAPIdata('GET', '/search/hot/detail');

  searchData.hotList = searchHot.data.data;

  searchData.booksData = localData.booksList;

  data.keyWordArray = JSON.parse(localStorage.getItem('keyWordArray')) || [];
  myInput.value.focus();
});
</script>
<style lang="less" scoped>
.page {
  background-color: #f6f8fe;
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
    font-family: '宋体';
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
    font-family: '微软雅黑';
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
    margin-top: 0.6rem;
  }
  /deep/.van-tag {
    padding: 0.1rem 0.3rem;
  }
}
.hot {
  padding: 0 0.4rem;
  padding-bottom: 1.5rem;
  .hot-swipe {
    width: 100%;
    .van-swipe-item {
      padding-right: 0.2rem;
      box-sizing: border-box;
      &:last-child {
        padding-right: 0 !important;
        background-color: #fff;
        border-radius: 0.2rem;
      }
    }
    .hotlist {
      position: relative;
      background-color: #fff;
      border-radius: 0.2rem;
      h1 {
        font-size: 0.4rem;
        font-weight: 700;
        padding: 0.3rem 0.2rem;
        margin-left: 0.15rem;
        &:after {
          width: 90%;
          height: 1px;
          display: block;
          position: absolute;
          left: calc(100% - 95%);
          top: 1rem;
          content: '';
          background-color: #eee;
        }
      }
      ul {
        padding: 0.1rem 0;
        li {
          margin: 0.5rem 0.4rem;
          font-size: 0.35rem;
          &:nth-child(-n + 3) {
            font-weight: bold;
            span {
              color: #fa3937;
            }
          }
          span {
            margin-right: 0.3rem;
            color: #666;
            display: inline-block;
            width: 0.4rem;
            // text-align: right;
          }
        }
      }
    }
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
