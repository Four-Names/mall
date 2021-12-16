<template>
  <div class="goods">
    <div class="good">
      <good-list-item v-for="(item, id) in goods" :key="id" :goodsItem="item" @loadGood="$emit('loadGood')"/>
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
  },
  components: { GoodListItem },
};
</script>
<style scoped>

.good {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 57px;
  justify-content: space-between;
  width: 98%;
  margin: 0 auto;
}

.goods {
  width: 100%;
}
</style>