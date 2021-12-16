<template>
  <div class="main">
    <order-operation
      v-if="paying"
      :price="price"
      :i="i"
      :setPayed="true"
      @close="paying = false"
    />
    <common-nav-bar
      :home="true"
      :cart="true"
      :category="true"
      :my="true"
      :viewed="true"
      :sticky="true"
    >
      <div slot="content">订单详情</div>
    </common-nav-bar>
    <div class="content" v-if="goods">
      <div class="bg">
        <div class="status">
          <div>
            <img v-if="waitForPay" src="~img/order/wait.svg" alt="" />
            <img v-if="waitForTake" src="~img/order/wait.svg" alt="" />
            <img v-if="isCanceled" src="~img/order/canceled.svg" />
            <img v-if="isCompleted" src="~img/order/completed.svg" alt="" />
            {{ statusText }}
          </div>
          <div v-if="waitForPay" style="font-size:1.2rem;">
            {{getTime()}}
          </div>
        </div>
      </div>
      <div class="detail">
        <div class="block" v-if="receiverInfo != {}">
          <img src="~img/order/address.svg" alt="" />
          <div class="address">
            <div>
              <span>{{ receiverInfo.receiver }}</span>
              <span> {{ formatePhone }}</span>
            </div>
            <div class="addText">
              {{ fullAddress }}
            </div>
          </div>
        </div>

        <order-good :goods="goods" />
        <div class="orderInfo block">
          <div v-if="created">
            <span style="color: gray">下单时间: </span>
            <span>{{ created }}</span>
          </div>
          <div v-if="payed">
            <span style="color: gray">支付时间: </span>
            <span>{{ payed }}</span>
          </div>
          <div v-if="received">
            <span style="color: gray">收货时间: </span>
            <span>{{ received }}</span>
          </div>
          <div v-if="isCanceled">
            <span style="color: gray">取消时间: </span>
            <span>{{ expired }}</span>
          </div>
          <div class="price">
            <div>{{ priceText }}</div>
            <div>¥{{ price }}</div>
          </div>
        </div>
      </div>

      <div class="Btns">
        <div @click="buyAgain">再次购买</div>
        <div id="opBtn" v-if="waitForPay" @click="paying = true">去付款</div>
        <div id="opBtn" v-if="waitForTake" @click="receive">确认收货</div>
      </div>
    </div>
    <recommend ref="recommend" @loadGood="refreSher" />
  </div>
</template>

<script>
import CommonNavBar from "components/common/NavBar/CommonNavBar";
import { getOrderDetail, selectAddress, receiveOrder } from "network/user";
import OrderGood from "components/common/Order/OrderGood";
import Recommend from "components/common/Recommend/Recommend";
import Scroll from "components/common/Recommend/Recommend";
import OrderOperation from "components/common/Order/OrderOperation";

import { debounce } from "common/utils";
import { mapMutations } from "vuex";
export default {
  components: { CommonNavBar, OrderGood, Recommend, Scroll, OrderOperation },
  data() {
    return {
      op: "再次购买",
      statusCode: 3,
      receiverInfo: {},
      goods: null,
      count: null,
      price: null,
      created: null,
      expired: null,
      received: null,
      payed: null,
      paying: false,
      i: 0,
      refreSher: {},
    };
  },
  computed: {
    img() {
      return "~img/order/completed.svg";
    },
    waitForPay() {
      return this.statusCode === 0;
    },
    waitForTake() {
      return this.statusCode === 1;
    },
    isCanceled() {
      return this.statusCode === 2;
    },
    isCompleted() {
      return this.statusCode === 3;
    },
    statusText() {
      switch (this.statusCode) {
        case 0:
          return "等待付款";
        case 1:
          return "等待收货";
        case 2:
          return "已取消";
        case 3:
          return "已完成";
        default:
          return "";
      }
    },

    fullAddress() {
      return (
        this.receiverInfo.province +
        this.receiverInfo.city +
        this.receiverInfo.address
      );
    },

    formatePhone() {
      return (
        this.receiverInfo?.phone?.slice(0, 3) +
        "****" +
        this.receiverInfo?.phone?.slice(7)
      );
    },

    priceText() {
      return this.payed ? "实付金额：" : "需付款：";
    },
  },
  watch: {},
  methods: {
    ...mapMutations(["addShop"]),
    formateTime(time) {
      return (
        time.toLocaleDateString().replace(/\//g, "-") +
        "  " +
        time.toTimeString().slice(0, 9)
      );
    },

    getTime() {
      let expire = this.expired;
      let timer = new Date(new Date(expire).getTime() - Date.now());
      let hours = timer.getHours(),
        minutes = timer.getMinutes();
      if (hours === 0 && minutes === 0) {
        return `剩余：${this.price}23小时59分钟`;
      }
      return `剩余：${hours}小时${minutes}分钟`;
    },
    buyAgain() {
      let data = this.goods;
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
    receive() {
      let i = this.i;
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
  },

  activated() {
    this.i = this.$route.query.i;
    getOrderDetail(this.i).then((res) => {
      let result = res.data.data[0];
      if (result.canceled) {
        this.statusCode = 2;
      } else if (result.received) {
        this.statusCode = 3;
      } else if (result.payed) {
        this.statusCode = 1;
      } else {
        this.statusCode = 0;
      }
      this.created = result.created
        ? this.formateTime(new Date(result.created))
        : null;

      if (result.canceled) {
        this.expired = this.formateTime(
          new Date(new Date(result.expire).getTime() + 60 * 60 * 8 * 1000)
        );
      }
      this.received = result.received
        ? this.formateTime(
            new Date(new Date(result.received).getTime() + 60 * 60 * 8 * 1000)
          )
        : null;
      this.payed = result.payed
        ? this.formateTime(
            new Date(new Date(result.payed).getTime() + 60 * 60 * 8 * 1000)
          )
        : null;

      this.goods = JSON.parse(result.data);
      this.price = result.price;
      this.count = result.count;
      selectAddress(result.address_i).then((res) => {
        this.receiverInfo = res.data.data[0];
      });
    });
  },
  mounted() {
    this.refreSher = debounce(() => {
      this.$nextTick(() => {
        this.$refs.scroll?.refresh();
      });
    });
  },
};
</script>
<style scoped>
.main {
  width: 100vw;
  height: 100%;
}

.content {
  padding-top: 6.7vh;
  width: 100vw;
}

.bg {
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 80px;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  background-image: linear-gradient(270deg, #ff4142, #ff4b2b);
  margin-bottom: -15px;
}

.status {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
  gap: 5px;

}

.status div:nth-child(1) {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.btn {
  margin-top: 15px;
  background: #fff;
  box-shadow: 0 8px 16px 0 rgb(231 0 28 / 14%),
    inset 0 -4px 6px 0 rgb(255 198 198 / 77%);
  border-radius: 20px;
  color: #f2270c;
  padding: 10px 38px;
  line-height: 14px;
  font-size: 1rem;
}

.detail {
  width: 100vw;
}

.block {
  width: 100vw;
  padding: 10px 2vw;
  box-sizing: border-box;
  background-color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 2vw;
}
.address {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.addText {
  color: rgb(153, 153, 153);
  font-size: 0.9rem;
}

.orderInfo {
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: column;
  width: 100vw;
  align-items: flex-start;
}

.Btns {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: right;
  width: 100vw;
  padding: 0 2vw;
  box-sizing: border-box;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: white;
  height: 7.4vh;
  box-shadow: 0 0 15px rgb(160 160 160 / 69%);
}

.Btns > div {
  width: 80px;
  color: #f2270c;
  border: 1px solid #f2270c;
  box-shadow: 0 3px 6px 0 rgb(242 39 12 / 10%);
  padding: 0 10px;
  text-align: center;
  min-width: 56px;
  height: 35px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#opBtn {
  background-color: #f73c24;
  color: white;
}

.price {
  width: 100%;
  border-top: 1px solid rgb(240, 240, 240);
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 5px 0;
  box-sizing: border-box;
  height: 60px;
}

.price > div:nth-child(1) {
  font-size: 1.2rem;
  font-weight: 600;
}

.price > div:nth-child(2) {
  color: #f2270c;
  font-weight: 600;
}
</style>