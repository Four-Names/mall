<template>
  <div>
    <order-operation v-if="paying" :price="price" :i="i" :setPayed="true" @close="paying=false"/>
    <div v-if="data.length">
      <order
        class="item"
        v-for="(item, index) in data"
        :key="index"
        :item="item"
      >
        <div slot="status" class="ticker">
          <div>等待付款</div>
          <div>
            {{ getTime(item.expire) }}
          </div>
        </div>

        <div slot="btn" @click="cancel(item.i)" id="cancelBtn">取消订单</div>
        <div slot="btn" @click="pay(item)">去支付</div>
      </order>
    </div>
    <div v-else-if="isEmpty">
      <el-empty
        style="background-color: rgb(242, 242, 242)"
        v-show="$route.params.idx == 1"
        description="空空如也"
      ></el-empty>
    </div>
  </div>
</template>

<script>
import Order from "components/common/Order/Order";

import { cancelOrder, PayOrder, unpayOrder } from "network/user";
import { hasPayPwd, validPayPwd } from "network/user";
import OrderOperation from "components/common/Order/OrderOperation";

export default {
  components: { Order, OrderOperation },
  data() {
    return {
      data: [],
      isEmpty: false,
      hasPayPwd: null,
      paying:false,
      price:0,
      i:0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    getTime(expire) {
      let timer = new Date(new Date(expire).getTime() - Date.now());
      let hours = timer.getHours(),
        minutes = timer.getMinutes();
      if(hours === 0 && minutes === 0){
        return `23小时59分钟`;
      }
      return `${hours}小时${minutes}分钟`;
    },

    cancel(i) {
      this.$confirm("确认取消订单?", "取消订单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          await cancelOrder(JSON.stringify({ i })).then((res) => {
            if (res.data.tag) {
              this.$message.success("已取消订单");
              this.$router.go(0);
            }
          });
        })
        .catch((e) => {
          this.$message("已取消");
        });
    },
    pay(item) {
      this.price = item.price;
      this.i = item.i;
      this.paying = true;
      // this.$confirm(`确认支付${item.price}元?`, "确认付款", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "info",
      // })
      //   .then(async () => {
      //     if (this.hasPayPwd) {
      //       this.validPayPwd(item.i);
      //     } else {
      //       await PayOrder(JSON.stringify({ i: item.i })).then((res) => {
      //         if (res.data.tag) {
      //           this.$message.success("支付成功");
      //           this.loadOrder();
      //         }
      //       });
      //     }
      //   })
      //   .catch((e) => {
      //     this.$message("已取消");
      //   });
    },
    loadOrder() {
      unpayOrder().then((res) => {
        let arr = [];
        for (let item of res.data.data) {
          let { created, expire, price, count, i } = item,
            data = JSON.parse(item.data);
          arr.push({ created, expire, data, price, count, i });
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

    async validPayPwd(i) {
      await this.$prompt("请输入支付密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9]{6}$/,
        inputErrorMessage: "密码由六位数字组成",
        closeOnClickModal: false,
      })
        .then(async ({ value }) => {
          let pwd = { pwd: value };
          await validPayPwd(JSON.stringify(pwd)).then(async (res) => {
            if (res.data.tag) {
              await PayOrder(JSON.stringify({ i })).then((res) => {
                if (res.data.tag) {
                  this.$message.success("支付成功");
                  this.loadOrder();
                }
              });
            } else {
              this.$message.warning("密码错误");
            }
          });
        })
        .catch((e) => {
          this.$message.warning("已取消支付");
        });
    },
  },
  created() {
    this.loadOrder();
    hasPayPwd().then((res) => {
      this.hasPayPwd = res.data.tag;
    });
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

.ticker {
  display: flex;
  flex-direction: row;
  font-size: 13px;
  font-weight: 600;
  width: auto;
  height: 1.6rem;
  line-height: 1.6rem;
  align-items: center;
}

.ticker > div:nth-child(1) {
  background-color: rgb(253, 44, 23);
  color: white;
  padding-left: 5px;
  padding-right: 5px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 1;
}

.ticker > div:nth-child(2) {
  padding-left: 10px;
  padding-right: 5px;
  margin-left: -10px;
  background-color: rgb(253, 217, 213);
  color: rgb(254, 98, 80);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

#cancelBtn {
  color: gray;
  border-color: grey;
}
</style>