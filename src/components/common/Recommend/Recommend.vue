<template>
  <div class="" v-if="recommendGoods">
    <recommend-bar />
    <good-list :goods="recommendGoods" @loadGood="$emit('loadGood')">
    </good-list>
  </div>
</template>

<script>
import RecommendBar from "./RecommendBar";
import GoodList from "components/content/Goods/GoodList";
import { goodRecommend } from "network/recommend";

export default {
  data() {
    return {
      recommendGoods: null,
    };
  },
  created() {
    //获取商品推荐
    goodRecommend().then((res) => {
      this.recommendGoods = res.data.data;
    });
  },
  components: {
    GoodList,
    RecommendBar,
  },
};
</script>
 <style scoped>
</style>