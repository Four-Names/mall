<template>
  <div class="">
    <recommend-bar />
    <good-list :goods="goodRecommend" :loadName="loadName"> </good-list>
  </div>
</template>

<script>
import RecommendBar from "./RecommendBar";
import GoodList from "components/content/Goods/GoodList";
export default {
  props: {
    goodRecommend: {
      type: Array,
      default() {
        return [];
      },
    },
    loadName: {
      type: String,
      default() {
        return "";
      },
    },
  },
  components: {
    GoodList,
    RecommendBar,
  },
};
</script>
 <style scoped>
</style>