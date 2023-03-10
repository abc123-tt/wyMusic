import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import getVant from './plugin/vant.js'
// 2. 引入组件样式
import 'vant/lib/index.css';
import getFontIcon from './plugin/fontIcon.js'
// 引入svg组件
import SvgIcon from './components/SvgIcon.vue'
// 注册svg解析脚本
import 'virtual:svg-icons-register'




// 引入font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
const app = createApp(App)
app.config.warnHandler = () => null



//使用font-awesome
getFontIcon(library)

// 3. 注册你需要的组件
// 要放在#app前
// 将app传到vant.js里面注册
getVant(app)
app.use(router)
app.component('svg-icon',SvgIcon)
app.component('font-awesome-icon',FontAwesomeIcon)
// 这个挂载必须放在最后
app.mount('#app')
