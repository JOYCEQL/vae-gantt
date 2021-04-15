/*
 * @Author: yuguangzhou
 * @Date: 2021-04-13 16:55:59
 * @LastEditTime: 2021-04-14 09:55:09
 * @LastEditors: yuguangzhou
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import yuui from '../packages/index'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(yuui)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
