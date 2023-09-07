<template>
  <div>
    <Header></Header>
    <Context></Context>
  </div>
</template>
<script setup lang="ts">
import Header from "./Header.vue";
import Context from "./Context.vue";
import { getAPIdata } from "../../server/api";
import { onMounted, reactive } from "vue";
import {useStore} from '../../store/index'
const $store = useStore()
const getBaseInfo = async() => {
  let loginCookie = sessionStorage.getItem("loginCookie");
  if(loginCookie){
    const res = await getAPIdata("GET", `/login/status?cookie=${loginCookie}`);

  sessionStorage.setItem("userID", res.data.data.account.id);
  let userID = sessionStorage.getItem("userID");
   const accountInfo = await getAPIdata("GET", `/user/detail?uid=${userID}`);
   $store.userPicUrl = accountInfo.data.profile.avatarUrl
   $store.userName = accountInfo.data.profile.nickname
  }
};

onMounted(() => {
  getBaseInfo()
});
</script>
<style lang="less" scoped></style>
