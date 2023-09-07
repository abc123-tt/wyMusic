<template>
  <div class="container">
    <van-icon
      name="arrow-left"
      class="back"
      @click="back"
    />

    <div class="body">
      <h1>扫码登录</h1>
      <img
        :src="qrimg"
        alt=""
        class="code"
      />
      <p class="tip">使用网易云音乐App扫码登录</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAPIdata } from "../server/api";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "../store/index";
import { useRouter } from "vue-router";
import { showSuccessToast, showFailToast } from "vant";
const $router = useRouter();
const $store = useStore();

const unikey = ref<string>();
const qrimg = ref<string>();
const getKey = async () => {
  const nowDate = new Date().getTime();
  const res = await getAPIdata("GET", "/login/qr/key", {
    params: {
      timestamp: nowDate,
    },
  });
  unikey.value = res.data.data.unikey;
  loginCode();
};
const loginCode = async () => {
  const codeData = await getAPIdata(
    "GET",
    `/login/qr/create?qrimg=true&key=${unikey.value}`
  );

  qrimg.value = codeData.data.data.qrimg;

  checkLogin();
};
let check
const checkLogin = () => {
  check = setInterval(async () => {
    let nowTime2 = new Date().getTime();
    const res = await getAPIdata(
      "GET",
      `/login/qr/check?key=${unikey.value}&timestamp=${nowTime2}`
    );
    if (res.data.code == 800) {
      showFailToast(res.data.message);
      clearInterval(check);
    }
    if (res.data.code == 803) {
      showSuccessToast(res.data.message);
      sessionStorage.setItem("loginCookie", res.data.cookie);
      let delay = setTimeout(() => {
        $router.push("/discovery");
      }, 2000);
      clearInterval(check);
    }
  }, 5000);
};
const back = ()=>{
  clearInterval(check)
  $router.go(-1)
}
onMounted(() => {
  getKey();
});
</script>
<style lang="less" scoped>
.container {
  position: relative;
  .back {
    font-size: 0.8rem;
    box-sizing: border-box;
    position:absolute;
    left: .4rem;
    top:.4rem;
  }
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
}
</style>
