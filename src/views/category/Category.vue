<template>
  <div>
    <category-nav-bar />

    <div class="category_main">
      <scroll :class="applyClass" ref="category">
        <category-left-bar
          v-for="(item, index) in Categorys"
          :key="index"
          :category="item"
          @doneCategory="doneCategory"
          :index="index"
          :isEnd="isEnd(index)"
          :ref="'category' + index"
          @loadCategory="loadCategory"
        />
      </scroll>

      <scroll class="goods" ref="goods">
        <div v-show="this.categoryViews" class="good">
          <category-right-bar
            v-for="(view, index) in categoryViews"
            :key="index"
            :view="view"
            @doneView="done"
          />
        </div>

        <tab-control v-show="loadDone" :titles="titles" @tabClick="tabClick" />

        <good-list
          v-if="type"
          :goods="CurrentGoods"
          class="specific"
          :loadName="loadName"
        />
      </scroll>
    </div>
  </div>
</template>
<script scoped>
import Scroll from "components/common/Scroll/Scroll";

import CategoryNavBar from "./childCpn/CategoryNavBar";
import CategoryLeftBar from "./childCpn/CategoryLeftBar";
import CategoryRightBar from "./childCpn/CategoryRightBar";

import GoodList from "components/content/Goods/GoodList";
import TabControl from "components/content/Tab/TabControl";

import { debounce } from "common/utils";

import {
  getCategory,
  getCategoryGoods,
  getCategoryGoodsDetail,
} from "network/category";
export default {
  name: "Category",
  data() {
    return {
      Categorys: null,
      chooseCategory: 0,
      categoryViews: null,
      maitKey: null,
      miniWallkey: null,
      loadName: "specificGood",
      goods: {
        pop: [],
        new: [],
        sell: [],
      },
      type: null,
      done: null,
      loadDone: false, //识图加载完成后再加载tabControl
      titles: ["流行", "新款", "精选"],
      types: ["pop", "new", "sell"],
      ifLowChrome: false,
    };
  },
  components: {
    Scroll,
    CategoryNavBar,
    CategoryLeftBar,
    CategoryRightBar,
    GoodList,
    TabControl,
  },
  created() {
    getCategory()
      .then((res) => {
        this.Categorys = res.data.data.category.list;
        this.chooseCategory = 0;
      })
      .catch(() => {
        this.$toast.show("获取数据失败，请稍后刷新或检查网络问题");
      });
    //防抖doneView
    this.done = debounce(this.doneView);
  },

  mounted() {
    //打开bs
    this.$refs.category.openPullUp();
    this.$refs.goods.openPullUp();

    //出于未知原因我手机的chrome浏览器布局出现问题，故需切换到支持的class
    const ifLowChrome = navigator.userAgent.match(/Chrome\/\d+/i);
    if (ifLowChrome) {
      this.ifLowChrome = ifLowChrome.toString().match(/\d{1}/i) < 8;
    }
  },
  activated() {
    this.$refs.category?.refresh();
    this.$refs.goods?.refresh();

    this.$bus.$on(this.loadName, () => {
      this.done();
    });
  },
  deactivated() {
    this.$bus.$off(this.loadName);
  },
  methods: {
    //初始化设置默认值
    doneCategory() {
      this.$refs.category.refresh();
      this.$refs["category" + 0][0].choosed = true;
      this.maitKey = this.Categorys[0].maitKey;
      this.miniWallkey = this.Categorys[0].miniWallkey;
      this.type = "pop";
    },

    //获取被点击的子组件index设置对应的category
    loadCategory(index) {
      this.chooseCategory = index;
    },

    //重新计算bs高度
    doneView() {
      this.loadDone = true;
      this.$refs.goods?.refresh();
    },

    //tab点击切换商品视图
    tabClick(index) {
      this.type = this.types[index];
    },

    //加载type商品信息
    loadType() {
      const popT = getCategoryGoodsDetail(this.miniWallkey, "pop");
      const newT = getCategoryGoodsDetail(this.miniWallkey, "new");
      const sellT = getCategoryGoodsDetail(this.miniWallkey, "sell");
      Promise.all([popT, newT, sellT])
        .then((res) => {
          this.goods["pop"] = res[0].data;
          this.goods["new"] = res[1].data;
          this.goods["sell"] = res[2].data;
        })
        .catch(() => {
          this.$toast.show("获取数据失败，请稍后刷新或检查网络问题");
        });
    },
    isEnd(index) {
      return this.Categorys.length - 1 == index;
    },
  },
  computed: {
    //返回所点标题对应商品
    CurrentGoods() {
      return this.goods[this.type];
    },

    //依据浏览器版本切换class
    applyClass() {
      return this.ifLowChrome ? "chrome_category" : "category";
    },
  },
  watch: {
    //当catetory改变时设置对应的样式
    chooseCategory(newV, oldV) {
      this.$refs["category" + oldV][0].choosed = false;
      this.$refs["category" + newV][0].choosed = true;
      this.maitKey = this.Categorys[newV].maitKey;
      this.miniWallkey = this.Categorys[newV].miniWallkey;
      this.type = "pop";
    },

    //改变时获取对应的数据
    maitKey(newV) {
      getCategoryGoods(newV)
        .then((res) => {
          this.categoryViews = res.data.data.list;
          if (this.$refs.goods) this.$refs.goods.BackTop();
          this.loadType();
        })
        .catch(() => {
          this.$toast.show("获取数据失败，请稍后刷新或检查网络问题");
        });
    },
  },
};
</script>
<style scoped>
.category_main {
  width: 100vw;
  display: flex;
  /* height: calc(100vh - 97px); */
  height: 89vh;
  overflow: hidden;
}

.category {
  width: 25%;
  background-color: rgb(240, 240, 240);
}

.chrome_category {
  width: 25%;
  background-color: rgb(240, 240, 240);
  /* height: calc(100vh - 150px); */
  height: 84vh;
}

.goods {
  width: 100%;
}

.good {
  padding: 20px 0px;
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  flex: 1;
  gap: 10px;
  padding: 10px;
}

.reload {
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1;
}
</style>