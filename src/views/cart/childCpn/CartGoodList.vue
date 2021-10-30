<template>
  <div>
    <cart-shop-good
      v-for="(shop, index) in shopList"
      :key="index"
      :shopInfo="shop"
      :shopId="shop.id"
    />
  </div>
</template>

<script>
import CartShopGood from "./CartShopGood";

import { mapState } from "vuex";

export default {
  name: "CartGoodList",
  components: {
    CartShopGood,
  },
  computed: {
    ...mapState(["shopList"]),
  },
};
</script>
<style scoped>
</style>