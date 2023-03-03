import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import getVant from './plugin/vant.js'
// 引入svg组件
import SvgIcon from './components/SvgIcon.vue'
// 注册svg解析脚本
import 'virtual:svg-icons-register'
// 2. 引入组件样式
import 'vant/lib/index.css';

// 引入font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
const app = createApp(App)



//使用font-awesome
library.add(faArrowLeft) 



// 3. 注册你需要的组件
// 要放在#app前
// 将app传到vant.js里面注册
getVant(app)
app.use(router)
app.component('SvgIcon',SvgIcon)
app.component('font-awesome-icon',FontAwesomeIcon)
// 这个挂载必须放在最后
app.mount('#app')
