<template>
  <div v-if="data.length">
    <order class="item" v-for="(item, index) in data" :key="index" :item="item">
      <div slot="status" class="status">待收货</div>
      <div class="btn" slot="btn" @click="receive(item.i)">确认收货</div>
    </order>
  </div>
  <div v-else-if="isEmpty">
    <el-empty
      style="background-color: rgb(242, 242, 242)"
      v-show="$route.params.idx == 2"
      description="空空如也"
    ></el-empty>
  </div>
</template>

<script>
import { receiveOrder, untakeOrder } from "network/user";
import Order from "components/common/Order/Order";
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
    receive(i) {
      this.$confirm("确认收货?", "确认收货", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          await receiveOrder(JSON.stringify({ i })).then((res) => {
            if (res.data.tag) {
              this.$message.success("已确认收货");
              this.$router.go(0);
            }
          });
        })
        .catch((e) => {
          this.$message("已取消");
        });
    },
    loadOrder() {
      untakeOrder().then((res) => {
        let arr = [];
        for (let item of res.data.data) {
          let { created, price, count, i } = item,
            data = JSON.parse(item.data);
          arr.push({ created, data, price, count, i });
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