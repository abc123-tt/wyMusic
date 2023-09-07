<template>
  <div class="content">
    <ul class="footerlist" >
        <li
        class="listItem"
        v-for="(item, index) in data.itemData"
        :key="index"
        @click="changeItem(index,item.tit)"
      >
        <div :class="['icon-box', index === flag ? 'active' : '',]">
          <svg-icon
            class="itemIcon"
            :iconName="index === flag ? `white-${item.normalIcon}` : `grey-${item.normalIcon}`"
          ></svg-icon>
        </div>
        <!-- <p>{{ item.tit }}</p> -->
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {useRouter} from 'vue-router'
import {useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
const data = reactive({
  itemData: [
    {
      id: 1,
      normalIcon: "discovery",
      tit: "发现",
    },
    {
      id: 2,
      normalIcon: "podcast",
      tit: "MV",
    },
     {
      id: 3,
      normalIcon: "attention",
      tit: "歌手",
    },
    {
      id: 4,
      normalIcon: "my",
      tit: "我的",
    },
   
    // {
    //   id: 5,
    //   normalIcon: "community",
    //   tit: "社区",
    // },
  ],
}

);
let flag = ref<any>(0);

const changeItem = (i,str) => {
  
  flag.value = i;
  
  if(str == '发现'){
    router.push('/discovery')
  }
  if(str == 'MV'){
    router.push('/podcast')
  }
  
  if(str == '歌手'){
    router.push('/attention')
  }
  if(str == '我的'){
    router.push('/mine')
    
  }
  // if(str == '社区'){
  //   router.push('/community')
  // }

};
onMounted(()=>{
  const navBarActive = window.location.pathname
  if(navBarActive == '/discovery'){
    flag.value = 0
  }else if(navBarActive == '/podcast'){
    flag.value = 1
  }else if(navBarActive == '/attention'){
    flag.value = 2
  }
  else if(navBarActive == '/mine'){
    flag.value = 3
  }
  // else if(navBarActive == '/community'){
  //   flag.value = 4
  // }
})
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  .footerlist {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #eee;
    padding: 0.4rem 0;
    // border: 1px solid red;
    .listItem {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon-box {
        border-radius: 50%;
        width: 0.9rem;
        height: 0.9rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .itemIcon {
          width: 0.75rem;
          height: .75rem;
          &:nth-child(2){
            width: 2rem;
            height: 2rem;
          }
        }
      }
      p{
      margin-top:.2rem;

      }
      .active {
        background-color: transparent;
      }
    }
  }
}
</style>
