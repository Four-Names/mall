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
        <img src="~img/common/cart.svg" alt="" />
        <p>购物车</p>
        <span class="num">{{ $store.state.goodsNum }}</span>
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
export default {
  data() {
    return {
      ifStar: false,
    };
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
  height: 6vh;
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
  width: 45%;
}

.fun_btn {
  display: grid;
  justify-items: center;
  font-size: 1.5vh;
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
  width: 55%;
  font-size: 2vh;
  font-weight: 800;
  padding: 0 5px;
}
.fun_btn2 > p {
  /* height: 5vh; */
}
.buy {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 38px; */
  height: 5vh;

  border-radius: 2vh;
  width: calc(50% - 10px);
  background-color: #fcbc0c;
}

.cart {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 38px; */
  height: 5vh;

  border-radius: 2vh;
  width: calc(50% - 10px);

  background-color: #f4200c;
}
.num {
  position: absolute;
  right: 0;
  top: -5px;
  width: 17px;
  height: 17px;
  background-color: red;
  color: white;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 0.7rem;
  font-weight: 500;
}
</style>