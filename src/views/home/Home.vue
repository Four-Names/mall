<template>
  <div id="home">
    <nav-bar ref="bar" class="background">
      <img
        slot="left"
        src="~img/home/category.svg"
        alt=""
        @click="$router.push('/category')"
      />
      <search slot="center" />
      <img
        slot="right"
        src="~img/home/my.svg"
        alt=""
        @click="$router.push('/my')"
      />
    </nav-bar>
    <div class="scroll">
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
        <home-swiper :banners="banners" />

        <home-recommond :recommends="recommends" />

        <feature-view />

        <tab-control
          :titles="titles"
          @tabClick="tabClick"
          ref="tab1"
          v-show="!ceiling"
        />

        <good-list :goods="CurrentGoods" @loadGood="refreSher" />
      </scroll>
    </div>

    <back-top @click.native="$refs.scroll.BackTop" v-show="IsBottom" />
  </div>
</template>
<script>
import NavBar from "components/common/NavBar/NavBar";
import Scroll from "components/common/Scroll/Scroll";
import Search from "components/common/Search/Search";

import HomeRecommond from "./child/HomeRecommond";
import HomeSwiper from "./child/HomeSwiper";
import FeatureView from "./child/FeatureView";

import TabControl from "components/content/Tab/TabControl";
import GoodList from "components/content/Goods/GoodList";
import BackTop from "components/content/BackTop/BackTop";

import { debounce } from "common/utils";

import { getHomeData, getHomeGoods } from "network/home";

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
      refreSher: {},
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
    Search,
  },
  created() {
    //获取tabbar、swiper、featrueview数据
    getHomeData().then((res) => {
      this.banners = res.data.data.banner;
      this.recommends = res.data.data.recommend;
      this.$nextTick(() => {
        //获取吸顶组件上方的navbar所占的高度以计算固定值
        const offset = this.$refs.bar.$el.offsetHeight;
        this.ceilingPot = this.$refs.tab1.$el.offsetTop - offset;
      });
    });

    //获取商品封面数据
    this.getHomeGood("pop");
    this.getHomeGood("sell");
    this.getHomeGood("new");
  },
  mounted() {
    this.refreSher = debounce(() => {
      this.$nextTick(() => {
        this.$refs.scroll?.refresh();
      });
    });
  },
  methods: {
    //加載更多
    loadMore() {
      this.getHomeGood(); //获取商品数据
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

    // 获取对应商品封面数据
    getHomeGood(type = this.type) {
      const page = ++this.goods[type].page;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data);
        this?.refreSher();
      });
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
    this.ceiling = this.$refs?.scroll.getY() > this.ceilingPot;
  },
};
</script>
<style scoped>
#home {
  background-color: white;
}

.scroll {
  height: 92.6vh;
}

.wrapper {
  height: 86.6vh;
  overflow-y: hidden;
}

.wrapper1 {
  height: 79.9vh;
  overflow-y: hidden;
}

.background {
  background: linear-gradient(rgb(221, 0, 0), #ff1717);
}
</style>