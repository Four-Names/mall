<template>
  <div v-if="data.length">
    <order class="item" v-for="(item, index) in data" :key="index" :item="item">
      <div slot="status" class="status">完成</div>

      <div class="btn" slot="btn" @click="again(item.data)">再次购买</div>
    </order>
  </div>
  <div v-else-if="isEmpty">
    <el-empty
      style="background-color: rgb(242, 242, 242)"
      v-show="$route.params.idx == 3"
      description="空空如也"
    ></el-empty>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Order from "components/common/Order/Order";
import { completedOrder } from "network/user";

export default {
  components: { Order },
  data() {
    return {
      data: [],
      isEmpty: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapMutations(["addShop"]),

    again(data) {
      for (let shop in data) {
        for (let good in data[shop].goods) {
          let { goodId, price, title, cover, count } = data[shop].goods[good],
            belonging = shop;
          let goodInfo = { goodId, price, title, cover, belonging, count };
          this.addShop({
            shopId: shop,
            shop: data[shop].info,
            goodId: good,
            good: goodInfo,
          });
        }
      }
      this.$router.push("/cart");
    },
    loadOrder() {
      completedOrder().then((res) => {
        let arr = [];
        for (let item of res.data.data) {
          let { created, completed, price, count,i } = item,
            data = JSON.parse(item.data);
          arr.push({ created, completed, data, price, count,i });
        }
        if (arr.length === 0) {
          this.isEmpty = true;
          this.$emit("empty", true);
        } else {
          this.$emit("empty", false);
        }
        this.$set(this, "data", arr);
      });
    },
  },
  created() {
    this.loadOrder();
  },
  mounted() {},
};
</script>
<style scoped>
.item {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  padding: 10px 5vw;
  gap: 10px;
  background-color: white;
  box-sizing: border-box;
  border-radius: 10px;
}

.status {
  color: rgb(192, 192, 192);
}
</style>