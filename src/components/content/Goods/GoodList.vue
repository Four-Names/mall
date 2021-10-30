<template>
  <div class="goods">
    <div class="good">
      <good-list-item v-for="(item, id) in goods" :key="id" :goodsItem="item" :loadName="loadName"/>
    </div>
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem";

export default {
  name: "GoodList",
  props: {
    goods: {
      type: Array,
      defualt() {
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
  components: { GoodListItem },
};
</script>
<style scoped>

.good {
  display: flex;
  flex-wrap: wrap-reverse;
  padding-bottom: 57px;
  justify-content: space-around;
}

.goods {
  width: 100%;
}
</style>