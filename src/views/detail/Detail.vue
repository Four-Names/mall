<template>
  <div class="detail">
    <router-view/>
    <detail-nav-bar ref="navbar" @titleClick="titleClick" :cursor="cursor" />

    <scroll
      class="wrapper"
      @ifBottom="ifBottom"
      @getPostionY="getPostionY"
      :backTimer="450"
      ref="scroll"
    >
      <detail-swiper :img="swiperImage" v-show="swiperImage" />

      <detail-base-info
        v-if="goodInfo"
        :goodInfo="goodInfo"
        :goodId="goodId"
        :shopId="shopId"
        :goodObj="goodObj"
      />

      <detail-shop-info v-if="shopInfo" :shopInfo="shopInfo" ref="shop" />

      <detail-good-more
        v-if="goodImages"
        :goodImages="goodImages"
        @detailGoodResourceLoad="updateOffsetTop"
      />

      <detail-params
        v-if="goodParams"
        ref="params"
        :goodParams="goodParams"
        @detailGoodResourceLoad="updateOffsetTop"
      />

      <detail-comment
        ref="comment"
        v-if="goodComment"
        :goodComment="goodComment"
        @detailGoodResourceLoad="updateOffsetTop"
      />

      <recommend ref="recommend" />
    </scroll>

    <back-top @click.native="backTop" v-show="IsBottom"></back-top>
    <detail-operation-bar
      @addShop="addGood"
      @buyNowGood="buyNowGood"
      v-if="done"
      :cover="cover"
      :price="price"
    />
  </div>
</template>

<script>
//detail子组件
import DetailNavBar from "./childCpn/DetailNavBar";
import DetailSwiper from "./childCpn/DetailSwiper";
import DetailBaseInfo from "./childCpn/DetailBaseInfo";
import DetailShopInfo from "./childCpn/DetailShopInfo";
import DetailParams from "./childCpn/DetailParams";
import DetailGoodMore from "./childCpn/DetailGoodMore";
import DetailComment from "./childCpn/DetailComment";
import DetailOperationBar from "./childCpn/DetailOperationBar";

//其他功能性组件
import Scroll from "components/common/Scroll/Scroll";
import BackTop from "components/content/BackTop/BackTop";
import Recommend from "components/common/Recommend/Recommend";

//防抖
import { debounce } from "common/utils";

//获取数据的格式
import { getGoodDetail, Goods, Shop } from "network/detail";

//vuex映射
import { mapGetters, mapMutations } from "vuex";

//加入历史浏览记录

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    BackTop,
    DetailShopInfo,
    DetailGoodMore,
    DetailParams,
    DetailComment,
    DetailOperationBar,
    Recommend,
  },

  data() {
    return {
      goodId: null, //商品id
      swiperImage: null, //swiper图
      shopInfo: null, //商店信息
      goodInfo: null, //商品信息
      IsBottom: false, //backtop是否显示的tag
      goodImages: null, //商品展示图
      goodParams: null, //商品参数
      goodComment: null, //商品评论
      cartGoodInfo: {}, //加入购物车所需要的信息
      tagsY: [0], //每个tag对应着title具体的offsetHeight值以跳转
      refreSher: null, //经过防抖处理的refresh方法
      updateOffsetTop: null, //经过防抖处理的更新tag的offsetTop的方法
      cursor: 0, //对应激活的title游标
      tag: 0, //接收title点击事件的index以跳到对应的内容
      done: false, //是否显示operationBar的标志
      goodObj: {}, //加入购物车所需信息
      shopId: null,
      size: [],
      cover: null,
      price: 0,
    };
  },
  created() {
    this.goodId = this.$route.query.id;

    //获取商品详情页所需信息
    getGoodDetail(this.goodId)
      .then((res) => {
        const info = res.data.data;
        this.swiperImage = info.itemInfo.topImages;
        this.shopInfo = new Shop(info.shopInfo);
        this.goodInfo = new Goods(info.itemInfo, info.columns, info.services);
        this.price = this.goodInfo.realPrice;
        this.goodImages = info.detailInfo.detailImage[0].list;
        this.cover = this.swiperImage[0];
        this.goodParams = info.itemParams;
        this.goodComment = info.rate.list ? info.rate.list : [];
        this.cartGoodInfo = {
          goodId: this.goodId,
          belonging: info.shopInfo.shopId,
          price: this.goodInfo.realPrice,
          title: this.goodInfo.title,
          cover: this.swiperImage[0],
        };
        this.cartShopInfo = {
          shopId: info.shopInfo.shopId,
          shopName: info.shopInfo.name,
          shopLogo: info.shopInfo.shopLogo,
        };
        this.shopId = info.shopInfo.shopId;
        this.done = true;
        this.goodObj = {
          shopId: this.shopId,
          shop: this.cartShopInfo,
          goodId: this.goodId,
          good: this.cartGoodInfo,
        };

        //如果尚未记录
        if (!this.goodIfViewed(this.goodId)) {
          //本地存储浏览记录

          this.addGoodViewed({ goodId: this.goodId, info: this.goodObj });
        }
      })
      .catch(() => {
        this.$router.go(-1);
        this.$message.warning("获取数据失败，请稍后刷新或检查网络问题");
      });
  },
  computed: {
    ...mapGetters(["goodsIfFull", "goodIfViewed"]),
  },
  mounted() {
    this.refreSher = this.$refs.scroll?.refresh;

    //使用防抖实时刷新高度
    this.updateOffsetTop = debounce(() => {
      this.$nextTick(() => {
        this?.refreSher();
        //获取各标题的Y轴位置
        if (this.$refs.params != undefined) {
          this.tagsY[1] = this.$refs.params.$el.offsetTop - 44;
        }

        if (this.$refs.comment != undefined) {
          this.tagsY[2] = this.$refs.comment.$el.offsetTop - 44;
        }
        if (this.$refs.recommend != undefined) {
          this.tagsY[3] = this.$refs.recommend.$el.offsetTop - 84;
        }
      });
    }, 100);
  },

  methods: {
    ...mapMutations([
      "addShop",
      "goodCollected",
      "goodUnCollect",
      "addGoodViewed",
      "buyNow",
    ]),
    //是否可以开启backtop
    ifBottom(tag = false) {
      this.IsBottom = tag;
    },

    //切换到对应的标题锚点
    titleClick(index) {
      this.tag = index;
    },

    //额外的监听事件
    getPostionY(y) {
      //从倒数第二个往前遍历标题的y值,如果形参y值大于或等于对应的标题y值则代表在其位置上,设置正确的cursor为标题对应的下标
      for (let i = this.tagsY.length - 1; i; i--) {
        if (y >= this.tagsY[i]) {
          this.cursor = i;
          return;
        }
      }
      this.cursor = 0;
    },

    backTop() {
      this.$refs.scroll.BackTop();
    },

    addGood(count) {
      if (this.goodsIfFull) {
        this.$message.warning("购物车已满,添加失败,请先清空购物车");
      } else {
        this.goodObj.good["count"] = count;
        this.addShop(this.goodObj);
        this.$message.success("加入购物车成功");
      }
    },

    buyNowGood(count) {
      let buyNowGoodObj = {},
        goods = {},
        info = this.cartShopInfo;
      goods[this.goodId] = {
        count,
        cover: this.cover,
        goodId: this.goodId,
        price: this.price,
        title: this.goodInfo.title,
      };
      buyNowGoodObj[this.shopId] = {
        goods,
        info,
      };
      this.goodObj.good["count"] = count;
      this.buyNow(buyNowGoodObj);

      this.$router.push("/cart/confirm/1");
    },
  },

  watch: {
    //滚动到对应的标题位置
    tag(newV) {
      this.$refs.scroll.scrollTo(0, -this.tagsY[newV], 300);
    },
    "$route.query.id"() {
      this.$router.go(0);
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 85.9vh;
  overflow: hidden;
}
</style>