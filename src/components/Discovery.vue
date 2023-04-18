<template>
  <div>
    <Header></Header>
    <Context></Context>
    {{name}}
  </div>
</template>
<script setup lang="ts">
import Header from './Home/Header.vue';
import Context from './Home/Context.vue';
import { getAPIdata } from '../server/api';
import { onMounted,ref } from 'vue';
const name = ref()
const getStatus =async () => {
    let loginCookie = localStorage.getItem('loginCookie');
    const res = await getAPIdata('GET', `/login/status?cookie=${loginCookie}`);
    localStorage.setItem('userID',res.data.data.account.id)
    // localStorage.setItem('accNum',res.data.data.account.id)
    console.log(res);
    name.value = res.data.data.account.userName
    console.log(name.value);
    let userID = localStorage.getItem('userID')
    const accountInfo = await getAPIdata('GET',`/user/detail?uid=${userID}`) 
    console.log(accountInfo);
    const info = await getAPIdata('GET',`/user/account?uid=${userID}`) 
    console.log(info);
  };
onMounted( () => {
  // 获取登录之后的状态
  getStatus()
});
</script>
<style lang="less" scoped></style>
