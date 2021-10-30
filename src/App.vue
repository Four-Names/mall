<template>
  <div id="app">
    <MainTabBar />
  </div>
</template>

<script>
import MainTabBar from "components/content/Tab/MainTabBar";
import {mapMutations} from "vuex"

export default {
  name: "App",
  components: {
    MainTabBar,
  },
  methods: {
    ...mapMutations(['sync'])
  },
  created() {
    this.sync()
  },
  watch: {
    //监听vuex数据对象变化以更新sessionStorage
    '$store.state': {
      handler() {
        this.$store.commit("syncToCartGoodList");
      },
      deep:true
    },
  },
};
</script>

<style>
#app {
  min-width: 320px;
}
</style>
