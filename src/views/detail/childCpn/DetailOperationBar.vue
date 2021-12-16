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
      <div class="cart" @click="(drawer = true), (type = 0)">
        <p>加入购物车</p>
      </div>
      <div class="buy" @click="(drawer = true), (type = 1)">
        <p>立即购买</p>
      </div>
    </div>
    <el-drawer
      :visible.sync="drawer"
      direction="btt"
      :modal="false"
      :withHeader="false"
      size="auto"
    >
      <div class="drawerBar">
        <div class="row-1">
          <div>
            <img :src="cover" alt="" />
            <div class="price">{{ formatePrice }}</div>
          </div>
          <div class="closeBtn" @click="drawer = false">×</div>
        </div>
        <div class="row-3">
          <div class="text">数量</div>
          <div class="count">
            <div :class="isForbidMin" @click="count--">-</div>
            <div>{{ count }}</div>
            <div :class="isForbidMax" @click="count++">+</div>
          </div>
        </div>
        <div class="btn" @click="addGood">确定</div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    cover: {
      type: String,
      default() {
        return "";
      },
    },
    price: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      ifStar: false,
      drawer: false,
      count: 1,
      type: 0,
    };
  },
  computed: {
    ...mapState(["goodsNum"]),
    formatePrice() {
      return parseFloat(this.price).toFixed(2);
    },
    isForbidMin() {
      return this.count <= 1 ? "forbid" : "";
    },
    isForbidMax() {
      return this.count <= 99 ? "" : "forbid";
    },
  },
  methods: {
    goCart() {
      this.$router.push({ path: "/cart" });
    },
    addGood() {
      if (this.type === 0) {
        this.$emit("addShop", this.count);
      } else {
        this.$emit("buyNowGood", this.count);
      }
      this.drawer = false;
    },
    isActive(index) {
      return this.idx == index ? "active" : "";
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

.drawerBar {
  display: flex;
  flex-direction: column;
  width: 100vw;
}

.row-1 {
  padding-top: 10px;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
  position: relative;
}

.closeBtn {
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  background-color: rgb(192, 192, 192);
  line-height: 20px;
  text-align: center;
  font-size: 18px;
  position: absolute;
}

.text{
  padding-left: 10px;
}

.row-1 div:nth-child(1) {
  padding-left: 10px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.row-1 img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.row-2 {
  padding: 5px 10px;
}

.row-3 {
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.count {
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 40px;
}

.count div:nth-child(2) {
  width: 30px;
  display: flex;
  justify-content: center;
  background-color: rgb(194, 194, 194);
}

.count div:not(:nth-child(2)) {
  width: 30px;
  display: flex;
  justify-content: center;
}

.row-3 div:nth-child(2) {
  display: flex;
  flex-direction: row;
}

.price {
  color: red;
  font-size: 16px;
}

.btn {
  width: 90vw;
  background-color: rgb(242, 36, 13);
  text-align: center;
  line-height: inherit;
  color: white;
  margin: 0 auto;
  height: 45px;
  line-height: 45px;
  border-radius: 35px;
  margin-bottom: 10px;
}

.forbid {
  pointer-events: none;
  color: gray;
}

.active {
  border: 1px solid rgb(245, 93, 74);
  color: rgb(242, 39, 12);
  background-color: rgb(252, 237, 235);
}
</style>