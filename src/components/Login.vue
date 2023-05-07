<template>
  <div class="body">
    <h1>扫码登录</h1>
    <img :src="qrimg" alt="" class="code" @click="newCode" />
    <p class="tip">使用网易云音乐App扫码登录</p>
  </div>
  <van-loading />
</template>
<script setup lang="ts">
import { getAPIdata } from '../server/api';
import { onMounted, reactive, ref } from 'vue';
import {useStore} from '../store/index'
import {useRouter} from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant';
const $router = useRouter()
const $store = useStore()
// 保存二维码key
const unikey = ref<string>();
// 保存二维码的base64
const qrimg = ref<string>();

 const getKey = async () => {
    const nowDate = new Date().getTime();
    const res = await getAPIdata('GET', '/login/qr/key', {
      params: {
        timestamp: nowDate,
      },
    });

    unikey.value = res.data.data.unikey;
    loginCode(unikey.value)
  };

  // 通过key去获取二维码
  const loginCode = async (key) => {
    const codeData = await getAPIdata(
      'GET',
      `/login/qr/create?qrimg=true&key=` + key
    );
    // 将二维码的base64保存
    qrimg.value = codeData.data.data.qrimg;
    // 调用检查函数检查登录状态
    checkLogin()
  };
// 检查登录状态
  const checkLogin = () => {
    // 每5秒check一次登录状态
    let check = setInterval(async () => {
      // 获取最新时间戳
      let nowTime2 = new Date().getTime();
      const res = await getAPIdata(
        'GET',
        '/login/qr/check?key=' + unikey.value + '&timestamp=' + nowTime2
      );
      console.log(res);
      
      if (res.data.code == 800) {
        showFailToast(res.data.message);
        clearInterval(check);
      }
      if (res.data.code == 803) {
        showSuccessToast(res.data.message);
        sessionStorage.setItem('loginCookie',res.data.cookie)
       let delay =  setTimeout(()=>{
          $router.push('/discovery') 
        },2000)
        clearInterval(check);
      }
    }, 5000);
  };

onMounted(() => {
  getKey()
});
</script>
<style lang="less" scoped>
.body {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
  .code {
    width: 7rem;
    height: 7rem;
  }
  .tip {
    margin-top: 0.4rem;
    font-size: 0.4rem;
  }
}
</style>
