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
        <item-nav-bar
          text="购物车"
          :close="cartIsEmpty"
          @editing="edit"
          class="line"
        />
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
        <div v-else>
          <el-empty
            style="background-color: rgb(242, 242, 242)"
            description="空空如也"
          ></el-empty>
        </div>
        <recommend
          ref="recommend"
          v-show="!isEditing || !shopNum"
          @loadGood="refreSher"
        />
      </scroll>
      <back-top class="backTop" @click.native="backTop" v-show="IsBottom" />
      <cart-operation-bar
        ref="checkOut"
        v-show="!cartIsEmpty"
        :editing="isEditing"
      />
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
      refreSher: {},
      close: false,
      isEditing: false,
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
    main() {
      return this.$route.name == "Cart";
    },
  },
  mounted() {
    this.refreSher = debounce(() => {
      this.$nextTick(() => {
        this.$refs.scroll?.refresh();
      });
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
    edit(isEditing) {
      this.isEditing = isEditing;
    },
  },

  activated() {
    this.refreSher?.();
    if (!localStorage.token) {
      this.setLogin(false);
    }
  },

  deactivated() {
    this.isEditing = false;
  },
  //刷新BS
  updated() {
    this?.refreSher();
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