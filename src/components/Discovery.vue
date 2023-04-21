<template>
  <div>
    <Header></Header>
    <Context></Context>
  </div>
</template>
<script setup lang="ts">
import Header from './Home/Header.vue';
import Context from './Home/Context.vue';
import { getAPIdata } from '../server/api';
import { onMounted,reactive,ref } from 'vue';
import {useStore} from '../store/index'
const $store = useStore()

const getStatus = async () => {
  // 扫码登录成功后将cookie保存到本地，请求用户信息时要带上
    let loginCookie = localStorage.getItem('loginCookie');
    const res = await getAPIdata('GET', `/login/status?cookie=${loginCookie}`);
    // console.log('用户登录状态');
    // console.log(res);
    
    // 将用户id保存到本地，要请求用户详细信息时要用到，方便调试
    localStorage.setItem('userID',res.data.data.account.id)
    let userID = localStorage.getItem('userID')
    // 账号详细信息
    const accountInfo = await getAPIdata('GET',`/user/detail?uid=${userID}`) 
    $store.accountDetail = accountInfo.data
  
    
    // 用户名和用户头像
    $store.userName = accountInfo.data.profile.nickname
    $store.userPicUrl = accountInfo.data.profile.avatarUrl

    const userPlaylist = await getAPIdata('GET',`/user/playlist?uid=${userID}`)
    // console.log('用户歌单信息');
    // console.log(userPlaylist);
    $store.userPlaylist = userPlaylist.data.playlist
    // const test2 = await getAPIdata('GET',`/playlist/track/all?id=2480463352`)
    // console.log(test2);
    
  };
onMounted( () => {
  // 获取登录之后的状态
  getStatus()
  
});
</script>
<style lang="less" scoped></style>
