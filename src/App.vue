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
      updateCart: null,
      updateCollection: null,
      updateViewed: null,
    };
  },
  computed: {
    ...mapState(["viewedList", "shopList", "isLogin", "collectionList"]),
  },
  mounted() {
    //请求拦截器
    this.$axios.interceptors.request.use(
      (config) => {
        this.addLoading();
        if (localStorage.token) {
          config.headers.Authorization = localStorage.token;
        }
        return config;
      },
      (error) => {
        this.closeLoading();
        this.$message.warning('网络异常，请稍后再试');
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.$axios.interceptors.response.use(
      (response) => {
        this.closeLoading();
        return response;
      },
      (error) => {
        this.closeLoading();
        this.$message.warning('网络异常，请稍后再试');
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
    this.sync();

    //更新购物车数据
    this.updateCart = debounce((data) => {
      if (localStorage.token) {
        this.$axios.post("/user/sync_cart", JSON.stringify({ data })).catch()
      }
    });

    //更新收藏数据
    this.updateCollection = debounce((data) => {
      if (localStorage.token) {
        this.$axios.post("/user/update_collection", JSON.stringify({ data })).catch()
      }
    });

    //更新浏览记录
    this.updateViewed = debounce((data) => {
      if (localStorage.token) {
        this.$axios.post("/user/update_viewed", JSON.stringify({ data })).catch()
      }
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
        this.updateCart(JSON.stringify(this.shopList));
      },
      deep: true,
    },
    "$store.state.collectionList": {
      handler() {
        this.updateCollection(JSON.stringify(this.collectionList));
      },
      deep: true,
    },
    "$store.state.viewedList": {
      handler() {
        this.updateViewed(JSON.stringify(this.viewedList));
      },
      deep: true,
    },
    "$store.state.isLogin": {
      handler(newV) {
        if (newV) console.log("已登录");
        else {
          console.log("已注销");
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
