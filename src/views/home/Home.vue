<template>
  <div id="home">
    <nav-bar ref="bar" class="background">
      <img
        slot="left"
        src="~img/home/category.svg"
        alt=""
        @click="$router.push('/category')"
      />
      <search slot="center" :message="''" />
      <img
        slot="right"
        src="~img/home/my.svg"
        alt=""
        @click="$router.push('/my')"
      />
    </nav-bar>
    <div v-show="loadDone" class="scroll">
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
import Search from "components/common/Search/Search";

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
    Search,
  },
  created() {
    this.getHomeData();

    //获取商品封面数据
    this.getHomeGood("pop");
    this.getHomeGood("sell");
    this.getHomeGood("new");
    //闭包函数实现防抖
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

    //获取tabbar、swiper、featrueview数据
    getHomeData() {
      this.$axios
        .get("/home/data")
        .then((res) => {
          this.banners = res.data.data.banner;
          this.recommends = res.data.data.recommend;
        })
        .catch();
    },

    // 获取对应商品封面数据
    getHomeGood(type = this.type) {
      const page = ++this.goods[type].page;
      this.$axios
        .get(`/home/good?type=${type}&page=${page}`)
        .then((res) => {
          this.goods[type].list.splice(0, 0, ...res.data.data);
          this.loadDone++;
        })
        .catch();
    },
  },
  mounted() {
    this.refreSher = debounce(this.$refs.scroll?.refresh);
  },
  computed: {
    CurrentGoods() {
      return this.goods[this.type].list;
    },

    ClassWrapper() {
      return this.ceiling ? "wrapper1" : "wrapper";
    },
  },
  watch: {
    loadDone(newV) {
      if (newV == 6) {
        //打开scrollup与backtop监听
        this.$refs.scroll.openPullUp();
        this.$refs.scroll.openBackTop();

        //获取吸顶组件上方的navbar所占的高度以计算固定值
        const offset = this.$refs.bar.$el.offsetHeight;
        this.ceilingPot = this.$refs.tab1.$el.offsetTop - offset;
      }
    },
  },
  activated() {
    console.log(this.posY, "posy");
    this.$bus.$on(this.loadName, () => {
      this?.refreSher();
    });
    if (this.loadDone == 3) {
      this.$refs.scroll.scrollTo(0, this.posY, 4);
    }
    console.log(this.ClassWrapper, this.ceiling);
  },
  deactivated() {
    this.posY = this.$refs.scroll.getY();
    console.log(this.posY, "posy");
    this.$bus.$off(this.loadName);
  },
};
</script>
<style scoped>
#home {
  background-color: white;
}

.scroll{
  height: 92.6vh;
}

.wrapper {
  height: 86.6vh;
  overflow: hidden;
}

.wrapper1 {
  height: 79.9vh;
  overflow: hidden;
}

.background {
  background: linear-gradient(rgb(221, 0, 0), #ff1717);
}
</style>