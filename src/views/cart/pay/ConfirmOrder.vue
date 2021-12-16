<template>
  <div class="main">
    <nav-bar class="line">
      <img
        slot="left"
        @click="$router.go(-1)"
        src="~assets/img/common/left-arrow.svg"
        alt=""
      />
      <div slot="center">确认订单</div>
    </nav-bar>
    <div @click="$router.push('/my/address?pay=1')">
      <div class="address" v-if="address">
        <div>
          <div>
            <div>{{ address.receiver }}</div>
            <div>{{ address.phone }}</div>
          </div>
          <div>
            {{ fullAddress }}
          </div>
        </div>
        <div>
          <img src="~assets/img/common/more.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="goods">
      <order-good :goods="goods" />
    </div>

    <div class="payLine" @click="pay">
      <div slot="reference">在线支付</div>
    </div>
    <pay-order
      v-if="paying"
      :price="price"
      :count="count"
      :goods="goods"
      :address_i="address_i"
      @close="paying = false"
    />
  </div>
</template>


<script>
import NavBar from "components/common/NavBar/NavBar";
import OrderGood from "components/common/Order/OrderGood";
import payOrder from "./payOrder";

import { mapGetters, mapState, mapMutations } from "vuex";

import { getAddress } from "network/user";

export default {
  components: {
    NavBar,
    payOrder,
    OrderGood,
  },
  data() {
    return {
      buyNow: null,
      paying: false,
      currentAddress: null,
    };
  },
  computed: {
    ...mapGetters(["getSelectedGood", "reCount"]),
    ...mapState(["totalPrice", "address", "buyNowGood", "hasAddress"]),
    fullAddress() {
      return this.address.province + this.address.city + this.address.address;
    },

    good() {
      if (this.goods) {
        return Object.values(Object.values(this.goods)[0].goods)[0];
      } else {
        return {};
      }
    },

    price() {
      return this.buyNow
        ? (this.good.price * this.count).toFixed(2)
        : this.totalPrice.toFixed(2);
    },
    count() {
      return this.buyNow ? this.good.count : this.reCount;
    },
    goods() {
      if (this.$route.params.type == 0) {
        if (this.getSelectedGood == {}) {
          this.$message.error("获取用户订单信息失败");
          this.$router.push("/");
        } else {
          return this.getSelectedGood;
        }
      }
      if (this.$route.params.type == 1) {
        return this.buyNowGood;
      }
    },
    address_i() {
      return this.address.i;
    },
  },
  methods: {
    ...mapMutations([, "setAddress"]),

    formateTitle(title) {
      return title.slice(0, 20) + "...";
    },

    pay() {
      this.paying = true;
    },
  },
  created() {
    this.buyNow = this.$route.params.type == 1;
    if (this.$route.params.type != 0 && this.$route.params.type != 1) {
      this.$router.push("/");
    }
    if (!this.hasAddress) {
      getAddress().then((res) => {
        if (res.data.tag) {
          this.currentAddress = res.data.data[0];
          this.setAddress(res.data.data[0]);
        } else {
          this.$router.push("/my/address?pay=2");
        }
      });
    }
  },
  activated() {
    if (!Object.keys(this.address).length) {
      this.$router.push("/my/address?pay=2");
    }
  },

};
</script>
<style scoped>
.main {
  width: 100vw;
  background-color: rgb(242, 242, 242);
}

.line {
  border-bottom: 1px solid rgb(242, 242, 242);
}

.address {
  width: 100vw;
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  border-bottom: 3px solid #2ed;
}
.address > div:first-child {
  width: calc(100vw - 100px);
}

.address > div:first-child > div:first-child {
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
}

.payLine {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100vw;
  padding: 0 10vw;
  background-color: white;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  margin-top: 70px;
}

.payLine > div {
  width: 80vw;
  height: 45px;
  line-height: 45px;
  background-color: rgb(55, 131, 253);
  text-align: center;
  border-radius: 20px;
  color: white;
}

.goods {
  padding-bottom: 70px;
}
</style>