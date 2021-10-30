<template>
  <div id="MainTabBar">
    <keep-alive exclude="Detail,Category,Mine">
      <router-view ref="view"></router-view>
    </keep-alive>
    <tab-bar v-if="!hide">
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~img/tabbar/home.svg" alt="主页" />
        <img
          slot="item-icon-active"
          src="~img/tabbar/home_active.svg"
          alt="主页"
        />
        <div slot="item-text" @click="resolve">主页</div>
      </tab-bar-item>

      <tab-bar-item path="/category">
        <img slot="item-icon" src="~img/tabbar/category.svg" alt="分类" />
        <img
          slot="item-icon-active"
          src="~img/tabbar/category_active.svg"
          alt="分类"
        />
        <div slot="item-text" @click="resolve">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/cart">
        <img slot="item-icon" src="~img/tabbar/cart.svg" alt="购物车" />
        <img
          slot="item-icon-active"
          src="~img/tabbar/cart_active.svg"
          alt="购物车"
        />
        <div slot="item-text" @click="resolve">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/mine">
        <img slot="item-icon" src="~img/tabbar/mine.svg" alt="我的" />
        <img
          slot="item-icon-active"
          src="~img/tabbar/mine_active.svg"
          alt="我的"
        />
        <div slot="item-text" @click="resolve">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/TabBar/TabBar";
import TabBarItem from "components/common/TabBar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBarItem,
    TabBar,
  },
  data() {
    return {
      hide:false
    }
  },
  methods: {
    resolve() {
      console.log("点击");
      // this.$refs.view.ifreload = true
    },
  },
  mounted() {
    this.$bus.$on('hideTabBar',() => {
      this.hide = true
    })
    this.$bus.$on('showTabBar',() => {
      this.hide = false
    })
  },
  updated() {
    console.log("更新了")
  },
};
</script>

<style scoped>

</style>
