<template>
  <div v-if="shopInfo" class="cart_shop_good_main">
    <div class="shop">
      <div class="left">
        <img
          src="~img/cart/unchoosed.svg"
          alt=""
          class="choosed"
          @click="chooseAllGoods(shopId)"
          v-show="!ifShopActive(shopId)"
        />

        <img
          src="~img/cart/choosed.svg"
          alt=""
          class="choosed"
          @click="noChooseGoods(shopId)"
          v-show="ifShopActive(shopId)"
        />
      </div>
      <img :src="shop.shopLogo" alt="" />
      <span>{{ shop.shopName }}</span>
    </div>
    <cart-good
      v-for="(good, index) in shopInfo.goods"
      :key="index"
      :goodInfo="good"
      :shopId="shopId"
      :shop="shop"
      class="goods"
    />
  </div>
</template>

<script>
import CartGood from "./CartGood";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CartShopGood",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return null;
      },
    },
    shopId: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      shop: this.shopInfo.shop,
    };
  },
  components: { CartGood },
  methods: {
    ...mapMutations([
      "chooseAllGoods",
      "noChooseGoods",
      "goodCollected",
      "goodUnCollect",
    ]),

  },
  computed: {
    ...mapGetters(["ifShopActive"]),
  },
};
</script>
<style scoped>
.cart_shop_good_main {
  background-color: white;
  border-radius: 15px;
  margin: 10px 0;
  border-bottom: 1px solid rgb(226, 226, 226);
  padding-left: 4vw;
  padding-right: 3vw;
}

#end {
  border: none;
}

.left {
  display: grid;
  align-items: center;
}
.shop {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  font-weight: 800;
}

.shop > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding-right: 5px;
}
.choosed {
  height: 21px;
  width: 20px;
  padding-right: 5px;
}
</style>