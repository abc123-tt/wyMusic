import { createApp, useAttrs } from 'vue'
const app = createApp(App)
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

// 引入pinia
import {createPinia} from 'pinia'
const store = createPinia()
app.use(store)



import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

// 引入font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

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
app.component('font-awesome-layers', FontAwesomeLayers)
app.component('font-awesome-layers-text', FontAwesomeLayersText)


// 这个挂载必须放在最后
app.mount('#app')
