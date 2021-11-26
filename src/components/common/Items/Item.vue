<template>
  <div class="item">
    <div @click="choosed = !choosed" v-show="isEditing">
      <div class="btn">
        <img
          src="~img/cart/unchoosed.svg"
          alt=""
          class="choosed"
          v-show="!choosed"
        />
        <img
          src="~img/cart/choosed.svg"
          alt=""
          class="choosed"
          v-show="choosed"
        />
      </div>
    </div>
    <div class="left">
      <img :src="goodObj.good.cover" alt="" @click="check" />
    </div>
    <div class="right">
      <div class="title">{{ showTitle }}</div>
      <div class="bottom">
        <div class="price">￥{{ goodObj.good.price }}</div>
        <div v-show="!isEditing" class="cart" @click="addGood(goodObj)">
          <img v-show="goodInCart" src="~img/item/CartActive.svg" alt="" />
          <img v-show="!goodInCart" src="~img/item/addCart.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {},
  props: {
    goodId: {
      type: String,
      default() {
        return "";
      },
    },
    goodObj: {
      type: Object,
      default() {
        return {};
      },
    },
    isEditing: {
      type: Boolean,
      default() {
        return false;
      },
    },
    chooseGood: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      choosed: this.chooseGood,
    };
  },
  computed: {
    ...mapGetters(["goodIfInCart"]),
    showTitle() {
      let title = this.goodObj.good.title;
      return title.length < 30 ? title : title.slice(0, 30) + "...";
    },
    goodInCart() {
      return this.goodIfInCart({
        shopId: this.goodObj.good.belonging,
        goodId: this.goodId,
      });
    },
  },
  methods: {
    ...mapMutations(["addShop"]),
    check() {
      this.$router.push({ path: "/detail", query: { id: this.goodId } });
    },
    addGood(goodObj) {
      this.addShop(goodObj);
      this.$message.success("加入购物车成功");
    },
  },
  watch: {
    choosed(newV) {
      this.$emit(newV ? "choosed" : "unchoosed", this.goodId);
    },
    chooseGood() {
      this.choosed = this.chooseGood;
    },
    isEditing(newV) {
      !newV && (this.choosed = false);
    },
  },
};
</script>
<style scoped>
.item {
  display: flex;
  padding: 10px 0;
  font-size: 4vw;
}
.left {
  display: flex;
  align-items: center;
  margin: 0 5px;
}
.left > img {
  width: 25vw;
  height: 25vw;
  border-radius: 50%;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 15px;
}

.title {
  height: 35px;
  font-size: 4vw;
}

.bottom {
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  color: red;
}

.cart > img {
  width: 32px;
  height: 32px;
}
.choosed {
  height: 21px;
  width: 20px;
}

.btn {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2vw 0 4vw;
}
</style>