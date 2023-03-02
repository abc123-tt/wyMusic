import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import getVant from './plugin/vant.js'
// 2. 引入组件样式
import 'vant/lib/index.css';

const app = createApp(App)

// 3. 注册你需要的组件
// 要放在#app前
// 将app传到vant.js里面注册
getVant(app)
app.use(router)

// 这个挂载必须放在最后
app.mount('#app')
