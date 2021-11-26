<template>
  <div class="detail_operation_main">
    <div class="fun">
      <div class="fun_btn">
        <img src="~img/common/customer.svg" alt="" />
        <p>客服</p>
      </div>
      <div class="fun_btn">
        <img src="~img/common/shop.svg" alt="" />
        <p>店铺</p>
      </div>
      <div class="fun_btn" @click="goCart">
        <el-badge :value="goodsNum" :max="99" class="item">
          <img src="~img/common/cart.svg" alt="" />
        </el-badge>
        <p>购物车</p>
      </div>
    </div>
    <div class="fun_btn2">
      <div class="cart" @click="$emit('addShop')">
        <p>加入购物车</p>
      </div>
      <div class="buy">
        <p>立即购买</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      ifStar: false,
    };
  },
  computed: {
    ...mapState(["goodsNum"]),
  },
  methods: {
    goCart() {
      this.$router.push({ path: "/cart" });
    },
  },
};
</script>
<style scoped>
.detail_operation_main {
  height: 7.4vh;
  font-size: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  background-color: white;
  z-index: 4;
}

.fun {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40%;
}

.fun_btn {
  display: grid;
  justify-items: center;
  font-size: 2vh;
  color: grey;
  position: relative;
}
img {
  height: 3vh;
}

.fun_btn2 {
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  width: 60%;
  font-size: 2vh;
  font-weight: 800;
  padding: 0 5px;
}

.buy {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6vh;
  border-radius: 3vh;
  width: calc(50% - 10px);
  background-color: #fcbc0c;
}

.cart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6vh;
  border-radius: 3vh;
  width: calc(50% - 10px);
  background-color: #f4200c;
}
</style>