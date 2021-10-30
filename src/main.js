import Vue from 'vue'
import App from './App'
import router from "./router"
import store from "./store"
import toast from "components/common/Toast"
import VueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'assets/css/base.css'

Vue.config.productionTip = false

Vue.use(toast).use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/preLoadImg.png')
}).use(VueAwesomeSwiper) 

Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
