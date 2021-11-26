<template>
  <div class="collect">
    <item-list
      :ItemObj="collectionList"
      event="event"
      desc="取消收藏"
      path="/my"
      text="我的收藏"
      :num="getCollectionNum"
      @event="resolve"
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
      collectObj: null,
    };
  },
  computed: {
    ...mapGetters(["getCollectionNum"]),
    ...mapState(["collectionList"]),
  },
  methods: {
    ...mapMutations(["goodUnCollect"]),
    resolve(goodsList) {
      goodsList.forEach((goodId) => {
        this.goodUnCollect(goodId);
      });
        this.$message.success("已取消收藏");
    },
  },
};
</script>
<style scoped>
.collect {
  height: 100vh;
  background-color: rgb(242, 242, 242);
}
</style>