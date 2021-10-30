
<template>
  <div class="">
    <item-list
      :ItemObj="historyObj"
      event="event"
      desc="删除记录"
      path="/mine"
      text="历史浏览"
      @event="resolve"
      :num="num"
    />
  </div>
</template>
<script>
import ItemList from "components/common/Items/ItemList";
import {
  getHistoryObj,
  getHistoryListLength,
  removeGoodsInHistory,
} from "common/sessionStorage";
export default {
  components: { ItemList },
  data() {
    return {
      historyObj: null,
      num: 0,
    };
  },
  methods: {
    resolve(goodsList) {
      removeGoodsInHistory(goodsList);
      this.$toast.show("删除成功");
      this.update();
    },
    update() {
      this.historyObj = getHistoryObj();
      this.num = getHistoryListLength();
    },
  },
  activated() {
    this.update();
  },

};
</script>
<style scoped>
</style>