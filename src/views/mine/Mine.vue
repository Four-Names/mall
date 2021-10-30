<template>
  <div>
    <nav-bar>
      <div slot="center">个人中心</div>
    </nav-bar>
    <scroll
      class="Mine_Main"
      ref="scroll"
      @ifBottom="ifBottom"
      :backTimer="300"
      :topPot="0"
    >
      <mine-header />
      <feature-bar class="feature_bar">
        <div class="feature" @click="$toast.todo">
          <img src="~img/mine/pay.png" alt="" />
          <p>待付款</p>
        </div>
        <div class="feature" @click="$toast.todo">
          <img src="~img/mine/receive.png" alt="" />
          <p>待收货</p>
        </div>
        <div class="feature" @click="$toast.todo">
          <img src="~img/mine/after_sale.png" alt="" />
          <p>退换/售后</p>
        </div>
        <div class="feature" @click="$toast.todo">
          <img src="~img/mine/orders.png" alt="" />
          <p>全部订单</p>
        </div>
      </feature-bar>

      <recommend
        ref="recommend"
        v-show="goodRecommend"
        :goodRecommend="goodRecommend"
        :loadName="RecommendLoad"
      />
    </scroll>
    <back-top @click.native="backTop" v-show="IsBottom" />
  </div>
</template>
<script>
import MineHeader from "./childCpn/MineHeader";
import FeatureBar from "./childCpn/FeatureBar";

import NavBar from "components/common/NavBar/NavBar";

import Recommend from "components/common/Recommend/Recommend";
import Scroll from "components/common/Scroll/Scroll";

import { getGoodRecommend } from "network/detail";
import BackTop from "components/content/BackTop/BackTop";

import { debounce } from "common/utils";

export default {
  name: "Mine",
  data() {
    return {
      IsBottom: false,
      goodRecommend: null,
      RecommendLoad: "RecommendLoad",
    };
  },
  components: {
    FeatureBar,
    MineHeader,
    Recommend,
    Scroll,
    BackTop,
    NavBar,
  },
  mounted() {
    getGoodRecommend()
      .then((res) => {
        this.goodRecommend = res.data.data.list;
      })
      .catch(() => {
        this.$toast.show("获取数据失败，请稍后刷新或检查网络问题");
      });
    this.$refs.scroll.openBackTop();
    this.$refs.scroll.openPullUp();
    this.refresher = debounce(this.$refs.scroll.refresh);

    this.$bus.$on(this.RecommendLoad, () => {
      this.refresher();
    });
  },
  computed: {
    loadif() {
      return this.loadDone < 3;
    },
  },
  methods: {
    ifBottom(tag = false) {
      this.IsBottom = tag;
    },
    backTop() {
      this.$refs.scroll.BackTop();
    },
  },
};
</script>
<style scoped>
.Mine_Main {
  background-color: rgb(240, 240, 240);
  width: 100vw;
  /* height: calc(100vh - 97px); */
  height: 89vh;
  overflow: hidden;
}
.feature_bar {
  margin-top: -15px;
  margin-bottom: 10px;
  background-color: white;
}

.feature {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 50px;
  font-size: 0.9rem;
  gap: 5px;
}
.feature > img {
  width: 30px;
  height: 30px;
  display: block;
}
</style>