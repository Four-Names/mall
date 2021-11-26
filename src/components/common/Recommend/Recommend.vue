<template>
  <div class="" v-if="goodRecommend">
    <recommend-bar />
    <good-list :goods="goodRecommend" :loadName="loadName"> </good-list>
  </div>
</template>

<script>
import RecommendBar from "./RecommendBar";
import GoodList from "components/content/Goods/GoodList";
export default {
  props: {
    loadName: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      goodRecommend:null
    }
  },
  created() {
    //获取商品推荐
    this.$axios
      .get(`/recommend`)
      .then((res) => {
        this.goodRecommend = res.data.data;
      })
      .catch(() => {
        this.$message.warning('获取推荐数据失败，请稍后刷新或检查网络问题');
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