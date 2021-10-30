<template>
  <div id="home">
    <nav-bar ref="bar">
      <div slot="center">主页</div>
    </nav-bar>
    <div v-show="loadDone">
      <tab-control
        :titles="titles"
        @tabClick="tabClick"
        ref="tab2"
        v-show="ceiling"
      />

      <scroll
        :class="ClassWrapper"
        @loadMore="loadMore"
        @ifBottom="ifBottom"
        :topPot="ceilingPot"
        :backTimer="450"
        ref="scroll"
      >
        <home-swiper :banners="banners" @loadDone="loadDone++" />

        <home-recommond :recommends="recommends" @loadDone="loadDone++" />

        <feature-view @loadDone="loadDone++" />

        <tab-control
          :titles="titles"
          @tabClick="tabClick"
          ref="tab1"
          v-show="!ceiling"
        />

        <good-list :goods="CurrentGoods" :loadName="loadName" />
      </scroll>
    </div>

    <back-top @click.native="$refs.scroll.BackTop" v-show="IsBottom" />
  </div>
</template>
<script>
import NavBar from "components/common/NavBar/NavBar";
import Scroll from "components/common/Scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";

import HomeRecommond from "./child/HomeRecommond";
import HomeSwiper from "./child/HomeSwiper";
import FeatureView from "./child/FeatureView";

import TabControl from "components/content/Tab/TabControl";
import GoodList from "components/content/Goods/GoodList";
import BackTop from "components/content/BackTop/BackTop";

import { debounce } from "common/utils";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      type: "pop",
      IsBottom: false,
      ceiling: false,
      ceilingPot: 0,
      posY: 0,
      refreSher: null,
      loadName: "homeGoodLoad",
      loadDone: 0,
      types: ["pop", "new", "sell"],
      titles: ["流行", "新款", "精选"],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommond,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  created() {
    //获取tabbar、swiper、featrueview数据
    this.getHomeMultidata();

    //获取商品封面数据
    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
    this.getHomeGoods("new");
  },
  methods: {
    //获取首页轮播图、小圆窗数据
    getHomeMultidata() {
      getHomeMultidata()
        .then((res) => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
        .catch(() => {
          this.$toast.show("获取数据失败，请稍后刷新或检查网络问题");
        });
    },

    // 获取对应商品封面数据
    getHomeGoods(type = this.type) {
      const page = ++this.goods[type].page;
      getHomeGoods(type, page)
        .then((res) => {
          this.goods[type].list.splice(0, 0, ...res.data.data.list);
          this.loadDone++;
        })
        .catch(() => {
          this.$toast.show("获取数据失败，请稍后刷新或检查网络问题");
        });
    },

    //加載更多
    loadMore() {
      this.getHomeGoods(); //获取商品数据
    },

    //tabi点击切换商品视图
    tabClick(index) {
      this.type = this.types[index];
      this.$refs.tab1.currentIndex = this.$refs.tab2.currentIndex = index;
    },

    //是否可以显示backtop
    ifBottom(tag = false) {
      this.IsBottom = tag;
      this.ceiling = tag;
    },
  },
  computed: {
    CurrentGoods() {
      return this.goods[this.type].list;
    },

    ClassWrapper() {
      return this.ceiling ? "wrapper1" : "wrapper";
    },
  },
  activated() {
    if (this.loadDone == 3) {
      this.$refs.scroll.scrollTo(0, this.posY, 1);
    }
    if (this.refreSher) this.refreSher();
  },
  deactivated() {
    if (this.loadDone == 3) {
      this.posY = this.$refs.scroll.getY();
    }
  },
  watch: {
    loadDone(newV) {
      if (newV == 6) {
        //打开scrollup与backtop监听
        this.$refs.scroll.openPullUp();
        this.$refs.scroll.openBackTop();

        //闭包函数实现防抖
        this.refreSher = debounce(this.$refs.scroll.refresh);

        //获取吸顶组件上方的navbar所占的高度以计算固定值
        const offset = this.$refs.bar.$el.offsetHeight;
        this.ceilingPot = this.$refs.tab1.$el.offsetTop - offset;
      }
    },
  },
  activated() {
    this.$bus.$on(this.loadName, () => {
      this.refreSher();
    });
  },
  deactivated() {
    this.$bus.$off(this.loadName)
  },
};
</script>
<style scoped>
.homve-nav {
  background-color: aqua;
}

.wrapper {
  height: 90vh;
  overflow: hidden;
}

.wrapper1 {
  height: 84vh;
  overflow: hidden;
}
</style>