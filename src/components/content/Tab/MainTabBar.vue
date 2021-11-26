<template>
  <div>
    <keep-alive exclude="Detail">
      <router-view ref="view"></router-view>
    </keep-alive>

    <tab-bar v-show="main">
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~img/tabbar/home.svg" alt="主页" />
        <img
          slot="item-icon-active"
          src="~img/tabbar/home_active.svg"
          alt="主页"
        />

        <div slot="item-text">主页</div>
      </tab-bar-item>

      <tab-bar-item path="/category">
        <img slot="item-icon" src="~img/tabbar/category.svg" alt="分类" />
        <img
          slot="item-icon-active"
          src="~img/tabbar/category_active.svg"
          alt="分类"
        />

        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/cart">
        <div class="cart" slot="item-icon">
           <el-badge :value="goodsNum" :max="99" class="item">
            <img src="~img/tabbar/cart_active.svg" alt="购物车" />
          </el-badge>
        </div>

        <div class="cart" slot="item-icon-active">
          <el-badge :value="goodsNum" :max="99" class="item">
            <img src="~img/tabbar/cart_active.svg" alt="购物车" />
          </el-badge>
        </div>

        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/my">
        <img slot="item-icon" src="~img/tabbar/my.svg" alt="我的" />
        <img
          slot="item-icon-active"
          src="~img/tabbar/my_active.svg"
          alt="我的"
        />

        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/TabBar/TabBar";
import TabBarItem from "components/common/TabBar/TabBarItem";
import { mapState } from "vuex";
export default {
  name: "MainTabBar",
  components: {
    TabBarItem,
    TabBar,
  },
  data() {
    return {
      pathList: ["My", "Home", "Cart", "Category"],
      main: false,
    };
  },
  watch: {
    "$route.name"(newV) {
      this.main = this.pathList.includes(newV);
    },
  },
  computed: {
    ...mapState(["goodsNum"]),
  },
};
</script>

<style scoped>
.item {
  position: relative;
}
.cart {
  position: relative;
  height: 3.5vh;
}

img {
  width: 3.5vh;
}
</style>
