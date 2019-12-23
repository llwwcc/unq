import Vue from 'vue'
import App from './App'

//引入vuex
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$imgUrl = "https://wx.zzsnqyjxh.org/test"
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
