import Vue from 'vue'
import App from './App'
import router from "./router"
import store from "./store"
import toast from "components/common/Toast"
import VueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'assets/css/base.css'
import Vuelidate from 'vuelidate'

import axios from "axios"
import './plugins/element.js'

import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';


axios.defaults.baseURL = 'http://112.74.76.116:5000'
axios.defaults.headers['Content-Type'] = 'application/json';

Vue.config.productionTip = false

Vue.use(toast).use(VueLazyLoad, {
  loading: require('assets/img/common/preLoadImg.png'),
}).use(VueAwesomeSwiper).use(Vuelidate).use(VueAreaLinkage);


Vue.prototype.$axios = axios;

Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})