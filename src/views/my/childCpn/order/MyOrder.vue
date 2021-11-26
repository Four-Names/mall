<template>
  <div class="main">
    <common-nav-bar
      :home="true"
      :cart="true"
      :category="true"
      :my="true"
      :viewed="true"
    >
      <div slot="content">我的订单</div>
    </common-nav-bar>
    <div class="order_header">
      <search message="搜索我的订单" class="search" />
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
      </div>
    </div>
    <scroll>
      <order-all v-if="activedIndex == 0" />
      <order-pay v-if="activedIndex == 1" />
      <order-receive v-if="activedIndex == 2" />
      <order-completed v-if="activedIndex == 3" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/Scroll/Scroll";
import Search from "components/common/Search/Search";
import CommonNavBar from "components/common/NavBar/CommonNavBar";

import OrderAll from "./OrderAll";
import OrderReceive from "./OrderReceive";
import OrderPay from "./OrderPay";
import OrderCompleted from "./OrderCompleted";

export default {
  components: {
    Scroll,
    Search,
    CommonNavBar,
    OrderAll,
    OrderReceive,
    OrderPay,
    OrderCompleted,
  },
  data() {
    return {
      activedIndex: 0,
    };
  },
  computed: {

  },
  methods: {},
  activated() {
    this.activedIndex = this.$route.params.idx;
    console.log(this.activedIndex);
  },
  mounted() {},
};
</script>
<style scoped>
.main {
  background-color: rgb(247, 247, 247);
  width: 100vw;
  height: 100vh;
}

.order_header {
  width: 95vw;
  display: flex;
  flex-direction: column;
  padding: 1vh 2vw;
  gap: 10px;
  background-color: white;
  justify-content: center;
  align-items: center;
}
.search {
  width: 100%;
  height: 6vh;
  border-radius: 18px;
}

.title {
  display: flex;
  flex-direction: row;
  width: 90vw;
  /* padding: 1vh 1.5vw; */
  height: 30px;
  justify-content: space-around;
  box-sizing: border-box;
}

.isActived {
  border-bottom: 2px solid red;
}
</style>
