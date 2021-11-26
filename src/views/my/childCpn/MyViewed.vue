
<template>
  <div class="viewed">
    <item-list
      :ItemObj="viewedList"
      event="event"
      desc="删除记录"
      path="/my"
      text="历史浏览"
      @event="resolve"
      :num="getViewedNum"
    />
  </div>
</template>
<script>
import ItemList from "components/common/Items/ItemList";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  components: { ItemList },
  data() {
    return {
      viededObj: null,
      num: 0,
    };
  },
  computed: {
    ...mapGetters(["getViewedNum"]),
    ...mapState(["viewedList"]),
  },
  methods: {
    ...mapMutations(["deleteViewedData"]),
    resolve(goodsList) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          goodsList.forEach((good) => {
            this.deleteViewedData(good);
          });
          this.$message.success("删除成功");
        })
        .catch((e) => {
          this.$message("已取消删除");
        });
    },
  },
};
</script>
<style scoped>
.viewed {
  height: 100vh;
  width: 100vw;
  background-color: rgb(242, 242, 242);
}
</style>