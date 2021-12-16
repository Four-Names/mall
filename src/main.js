import Vue from 'vue'
import App from './App'
import router from "./router"
import store from "./store"
import VueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'assets/css/base.css'
import Vuelidate from 'vuelidate'


import './plugins/element.js'
import 'vue-area-linkage/dist/index.css'; 
import VueAreaLinkage from 'vue-area-linkage';


Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/preLoadImg.png'),
}).use(VueAwesomeSwiper).use(Vuelidate).use(VueAreaLinkage);


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})