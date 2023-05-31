import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toast from '@/base/toast/index'
import 'element-ui/lib/theme-chalk/index.css'

import * as echarts from 'echarts'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(Toast)
new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
