<template>
  <div class="">
    <item-list
      :ItemObj="getCollectionList"
      event="event"
      desc="取消关注"
      path="/mine"
      text="我的关注"
      :num="getCollectionNum"
      @event="resolve"
    />
  </div>
</template>

<script>
import ItemList from "components/common/Items/ItemList";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: { ItemList },
  data() {
    return {
      collectObj: null,
    };
  },
  computed: {
    ...mapGetters(["getCollectionList", "getCollectionNum"]),
  },
  methods: {
    ...mapMutations(["goodUnCollect"]),
    resolve(goodsList) {
      goodsList.forEach((goodId) => {
        this.goodUnCollect(goodId);
      });
      this.$toast.show("已取消关注");
    },
  },

};
</script>
<style scoped>
</style>