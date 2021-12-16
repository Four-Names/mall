<template>
  <div class="main">
    <common-nav-bar
      :home="true"
      :cart="true"
      :category="true"
      :my="true"
      :viewed="true"
      :sticky="true"
    >
      <div slot="content">我的订单</div>
    </common-nav-bar>
    <div class="order_header">
      <div class="title">
        <div
          :class="activedIndex == 0 ? 'isActived' : ''"
          @click="activedIndex = 0"
        >
          全部
        </div>
        <div
          :class="activedIndex == 1 ? 'isActived' : ''"
          @click="activedIndex = 1"
        >
          待付款
        </div>
        <div
          :class="activedIndex == 2 ? 'isActived' : ''"
          @click="activedIndex = 2"
        >
          待收货
        </div>
        <div
          :class="activedIndex == 3 ? 'isActived' : ''"
          @click="activedIndex = 3"
        >
          已完成
        </div>
        <div
          :class="activedIndex == 4 ? 'isActived' : ''"
          @click="activedIndex = 4"
        >
          已取消
        </div>
      </div>
    </div>
    <div class="box">
      <order-pay
        v-if="activedIndex == 1 || activedIndex == 0"
        @empty="isPayEmpty"
      />
      <order-receive
        v-if="activedIndex == 2 || activedIndex == 0"
        @empty="isReceiveEmpty"
      />
      <order-completed
        v-if="activedIndex == 3 || activedIndex == 0"
        @empty="isCompletedEmpty"
      />
      <order-cancel
        v-if="activedIndex == 4 || activedIndex == 0"
        @empty="isCancelEmpty"
      />
    </div>
    <el-empty
      style="background-color: rgb(242, 242, 242)"
      v-show="isEmpty"
      description="空空如也"
    ></el-empty>
  </div>
</template>

<script>
import Search from "components/common/Search/Search";
import CommonNavBar from "components/common/NavBar/CommonNavBar";

import OrderCancel from "./OrderCancel";
import OrderReceive from "./OrderReceive";
import OrderPay from "./OrderPay";
import OrderCompleted from "./OrderCompleted";

export default {
  components: {
    Search,
    CommonNavBar,
    OrderCancel,
    OrderReceive,
    OrderPay,
    OrderCompleted,
  },
  data() {
    return {
      activedIndex: this.$route.params.idx,
      empty: false,
      payEmpty: false,
      receiveEmpty: false,
      completedEmpty: false,
      cancelEmpty: false,
      refreSher: null,
    };
  },
  activated() {
    this.activedIndex = this.$route.params.idx;
  },
  watch: {
    activedIndex(newV) {
      this.$router.replace(`/my/order/${newV}`);
    },
  },
  computed: {
    isEmpty() {
      return (
        this.payEmpty &&
        this.receiveEmpty &&
        this.completedEmpty &&
        this.cancelEmpty &&
        this.activedIndex == 0
      );
    },
  },
  methods: {
    isPayEmpty(v) {
      this.payEmpty = v;
    },
    isReceiveEmpty(v) {
      this.receiveEmpty = v;
    },
    isCompletedEmpty(v) {
      this.completedEmpty = v;
    },
    isCancelEmpty(v) {
      this.cancelEmpty = v;
    },
  },
};
</script>
<style scoped>
.main {
  width: 100vw;
  background-color: rgb(242, 242, 242);
}

.order_header {
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 2vh 2vw;
  background-color: white;
  justify-content: center;
  align-items: center;
  height: 6.3vh;
  box-sizing: border-box;
  position: fixed;
  top: 6.7vh;
  z-index: 2;
}
.search {
  width: 100%;
  border-radius: 18px;
}

.title {
  display: flex;
  flex-direction: row;
  width: 90vw;
  height: 30px;
  justify-content: space-around;
  box-sizing: border-box;
}

.isActived {
  border-bottom: 2px solid red;
}

.box {
  padding-top: 13.4vh;
}
</style>
