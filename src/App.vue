<template>
  <div id="app">
    <main-tab-bar />
    <div v-if="isLoading" class="loading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
import MainTabBar from "./components/content/Tab/MainTabBar";
import { mapMutations, mapGetters, mapState } from "vuex";
import { debounce } from "common/utils";

import { syncCart, updateCollection, updateViewed } from "network/user";

import BaseConfig from "network/base";

export default {
  name: "app",
  components: {
    MainTabBar,
  },
  data() {
    return {
      loadingCount: 0,
      isLoading: false,
      setLoading: null,
      syncCart: null,
      updateCollection: null,
      updateViewed: null,
      timer: null,
      warning: null,
    };
  },
  computed: {
    ...mapState(["viewedList", "shopList", "isLogin", "collectionList"]),
  },
  mounted() {
    //请求拦截器
    BaseConfig.interceptors.request.use(
      (config) => {
        this.addLoading();
        if (localStorage.token) {
          config.headers.Authorization = localStorage.token;
        }
        return config;
      },
      (error) => {
        this.warning();
        this.closeLoading();
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    BaseConfig.interceptors.response.use(
      (response) => {
        this.closeLoading();
        return response;
      },
      (error) => {
        this.warning();
        this.closeLoading();
        return Promise.reject(error);
      }
    );
  },
  methods: {
    ...mapMutations(["sync"]),
    addLoading() {
      this.loadingCount++;
      setTimeout(() => {
        if (this.loadingCount != 0) this.isLoading = true;
      }, 150);
    },
    closeLoading() {
      this.loadingCount--;
      if (this.loadingCount === 0) {
        this.isLoading = false;
      }
    },
  },
  beforeDestroy() {
    localStorage.removeItem("token");
  },

  created() {
    this.warning = debounce(() => {
      this.$message.warning("网络异常，请稍后再试");
    });
    this.sync();

    //更新购物车数据
    this.syncCart = debounce((data) => {
      syncCart({ data }).catch();
    });

    //更新收藏数据
    this.updateCollection = debounce((data) => {
      updateCollection({ data }).catch();
    });

    //更新浏览记录
    this.updateViewed = debounce((data) => {
      updateViewed({ data }).catch();
    });
  },
  watch: {
    //监听vuex数据对象变化以更新localStorage
    "$store.state": {
      handler() {
        this.$store.commit("syncToCartGoodList");
      },
      deep: true,
    },
    "$store.state.shopList": {
      handler() {
        if (localStorage.token) {
          this.syncCart(JSON.stringify(this.shopList));
        }
      },
      deep: true,
    },
    "$store.state.collectionList": {
      handler() {
        if (localStorage.token) {
          this.updateCollection(JSON.stringify(this.collectionList));
        }
      },
      deep: true,
    },
    "$store.state.viewedList": {
      handler() {
        if (localStorage.token) {
          this.updateViewed(JSON.stringify(this.viewedList));
        }
      },
      deep: true,
    },
  
  },
};
</script>

<style>
#app {
  height: 100vh;
  position: relative;
  background-color: rgb(242, 242, 242);
  min-width: 280px;
  min-height: 320px;
}

#app .loading {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  color: orange;
  font-size: 30px;
}
</style>
