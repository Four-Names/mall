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
          <img src="~img/tabbar/cart.svg" alt="购物车" />
          <div class="num">
            {{ goodsNumInCart }}
          </div>
        </div>
        <div class="cart" slot="item-icon-active">
          <img src="~img/tabbar/cart_active.svg" alt="购物车" />
          <div class="num">
            {{ goodsNumInCart }}
          </div>
        </div>

        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/mine">
        <img slot="item-icon" src="~img/tabbar/mine.svg" alt="我的" />
        <img
          slot="item-icon-active"
          src="~img/tabbar/mine_active.svg"
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
import { mapGetters } from "vuex";
export default {
  name: "MainTabBar",
  components: {
    TabBarItem,
    TabBar,
  },
  data() {
    return {
      main: true,
      pathList: ["/collect", "/history"],
    };
  },
  watch: {
    "$route.path"(newV) {
      this.main = this.pathList.indexOf(newV) == -1;
    },
  },
  computed: {
    ...mapGetters(["goodsNumInCart"]),
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
.num {
  position: absolute;
  right: -3px;
  top: 0;
  color: white;
  display: flex;
  background-color: rgb(230, 0, 0);
  width: 2vh;
  height: 2vh;
  font-weight: 500;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  font-size: 1.5vh;
  padding: 5%;
}

img {
  width: 3.5vh;
}
</style>
