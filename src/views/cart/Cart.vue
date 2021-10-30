<template>
  <div>
    <item-nav-bar text="购物车" :close="cartIsEmpty" />
    <scroll class="cartGood" ref="scroll" @ifBottom="ifBottom" :backTimer="300">
      <cart-good-list ref="goodList" />
      <recommend
        ref="recommend"
        v-show="goodRecommend"
        :goodRecommend="goodRecommend"
        :loadName="RecommendLoad"
      />
    </scroll>
    <back-top class="backTop" @click.native="backTop" v-show="IsBottom" />
    <cart-operation-bar ref="checkOut" v-show="!cartIsEmpty" />
  </div>
</template>
<script>
import CartGoodList from "./childCpn/CartGoodList";
import CartOperationBar from "./childCpn/CartOperationBar";

import { getGoodRecommend } from "network/detail";
import BackTop from "components/content/BackTop/BackTop";

import { debounce } from "common/utils";
import Scroll from "components/common/Scroll/Scroll";
import Recommend from "components/common/Recommend/Recommend";

import ItemNavBar from "components/common/Items/ItemNavBar";

import { mapGetters } from "vuex";

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
    };
  },
  components: {
    CartGoodList,
    Scroll,
    BackTop,
    Recommend,
    ItemNavBar,
    CartOperationBar,
  },
  computed: {
    ...mapGetters(["cartIsEmpty"]),
  },
  mounted() {
    getGoodRecommend()
      .then((res) => {
        this.goodRecommend = res.data.data.list;
      })
      .catch(() => {
        this.$toast.show("获取数据失败，请稍后刷新或检查网络问题");
      });
    this.close = this.$refs.scroll.openBackTop();
    this.$refs.scroll.openPullUp();

    this.refresher = debounce(this.$refs.scroll.refresh);

    this.$bus.$on(this.RecommendLoad, () => {
      this.refresher();
    });
  },
  methods: {
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
      this.$toast.show("购物车空空如也", 1000);
    }
  },
  deactivated() {
    this.posY = this.$refs.scroll.getY();

    this.$bus.$off("editing");
  },

  //刷新BS
  updated() {
    this.refresher();
  },
};
</script>
<style scoped>
.cartGood {
  /* height: calc(100vh - 96px); */
  height: 89vh;
  /* height: 95vh;  */

  overflow: hidden;
}

.backTop {
  bottom: 120px;
}
</style>