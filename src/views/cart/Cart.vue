<template>
  <div>
    <router-view />
    <div v-show="main">
      <scroll
        class="cartGood"
        ref="scroll"
        @ifBottom="ifBottom"
        :backTimer="300"
      >
        <item-nav-bar text="购物车" :close="cartIsEmpty" class="line" />
        <cart-login-bar v-if="!isLogin" />
        <div class="content" v-if="!isLogin">
          <div>
            <img src="~img/cart/null.svg" alt="" />
          </div>
          <p>登录后可同步购物车中商品</p>
        </div>

        <div class="goodList" v-if="shopNum">
          <cart-shop-good
            v-for="(shop, index) in shopList"
            :key="index"
            :shopInfo="shop"
            :shopId="shop.id"
            ref="goodList"
          />
        </div>
        <recommend
          ref="recommend"
          :loadName="RecommendLoad"
          v-show="!isEditing || !shopNum"
        />
      </scroll>
      <back-top class="backTop" @click.native="backTop" v-show="IsBottom" />
      <cart-operation-bar ref="checkOut" v-show="!cartIsEmpty" />
    </div>
  </div>
</template>
<script>
import CartOperationBar from "./childCpn/CartOperationBar";
import CartLoginBar from "./childCpn/CartLoginBar";
import CartShopGood from "./childCpn/CartShopGood";

import BackTop from "components/content/BackTop/BackTop";

import { debounce } from "common/utils";
import Scroll from "components/common/Scroll/Scroll";
import Recommend from "components/common/Recommend/Recommend";

import ItemNavBar from "components/common/Items/ItemNavBar";

import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "Cart",
  data() {
    return {
      ifreload: true,
      goodRecommend: null,
      RecommendLoad: "refresh",
      IsBottom: false,
      refresher: null,
      close: false,
      isEditing: false,
      msg: null,
    };
  },
  components: {
    Scroll,
    BackTop,
    Recommend,
    ItemNavBar,
    CartOperationBar,
    CartLoginBar,
    CartShopGood,
  },
  computed: {
    ...mapGetters(["cartIsEmpty"]),
    ...mapState(["shopList", "isLogin", "shopNum"]),
    main(){
      return this.$route.name == 'Cart';
    }
  },
  mounted() {
    this.close = this.$refs.scroll.openBackTop();
    this.$refs.scroll.openPullUp();

    // this.refresher = debounce(this.$refs.scroll?.refresh);
    this.refresher = debounce(() => {
      this.$nextTick(() => {
        this.$refs.scroll?.refresh();
      });
    });

    this.$bus.$on(this.RecommendLoad, () => {
      this?.refresher();
    });
  },
  methods: {
    ...mapMutations(["setLogin"]),
    backTop() {
      this.$refs.scroll.BackTop();
    },
    ifBottom(tag = false) {
      this.IsBottom = tag;
    },
  },
  activated() {
    this.refresher?.();
    if (this.cartIsEmpty) {
      this.msg = this.$message("购物车空空如也");
    }
    if (!localStorage.token) {
      this.setLogin(false);
    }
    this.$bus.$on("editing", (isEditing) => {
      this.isEditing = isEditing;
    });
  },
  deactivated() {
    this.posY = this.$refs.scroll.getY();
    this.$bus.$off("editing");
    this.msg?.close();
  },
  //刷新BS
  updated() {
    this?.refresher();
  },
};
</script>
<style scoped>
.cartGood {
  height: 92.6vh;
  overflow: hidden;
}

.backTop {
  bottom: 120px;
}
.line {
  border-bottom: 1px solid rgb(229, 229, 229);
}
.content {
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
}
.goodList {
  padding-bottom: 13.4vh;
}
</style>