<template>
  <div class="settlement">
    <div>
      <div
        class="choosed"
        @click="chooseAllShop"
        v-show="!ifAllShopChoosed"
        :class="ifLock"
      >
        <img src="~img/cart/unchoosed.svg" alt="" />
        全选
      </div>
      <div
        class="choosed"
        :class="ifLock"
        @click="unChooseAllShop"
        v-show="ifAllShopChoosed"
      >
        <img src="~img/cart/choosed.svg" alt="" />
        全选
      </div>
    </div>
    <div @click="isEditing = !isEditing">
      <div v-show="isEditing" class="feature-btn">
        <div class="btn" @click="collect"><span>加入关注</span></div>
        <div class="btn" @click="remove"><span>删除</span></div>
      </div>
    </div>

    <div v-show="!isEditing" class="price-check">
      <p>总计:￥{{ formatPrice }}</p>
      <span class="checkstand" :class="ifCanCheck">去结算{{ reCount }}件</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      isEditing: false,
    };
  },
  activated() {
    this.$bus.$on("editing", (isEditing) => {
      this.isEditing = isEditing;
    });
  },

  computed: {
    ...mapGetters(["ifAllShopChoosed", "reCount"]),
    ...mapState(["shopNum", "totalPrice"]),

    //是否锁定按钮
    ifLock() {
      return this.shopNum > 0 ? "" : "lock";
    },

    //格式化价格
    formatPrice() {
      return parseFloat(this.totalPrice).toFixed(2);
    },

    //依据已选商品件数切换样式
    ifCanCheck() {
      return this.reCount > 0 ? "checked" : "check-lock";
    },
  },
  methods: {
    ...mapMutations(["chooseAllShop", "unChooseAllShop"]),
    remove() {
      this.$bus.$emit("executeDelete");
      this.$toast.show("删除成功");
    },
    collect() {
      this.$bus.$emit("executeCollect");
      this.$toast.show("关注成功");
    },
  },
};
</script>
<style scoped>
.settlement {
  height: 6vh;
  box-sizing: border-box;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  padding-left: 4vw;
  padding-right: 3vw;
  position: fixed;
  bottom: 6vh;
  background-color: rgba(255, 255, 255, 0.95);
}

.choosed {
  display: flex;
  align-items: center;
  gap: 2px;
}

.choosed > img {
  height: 21px;
  width: 20px;
}

.price-check {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.bar-fixed {
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 1);
}

.checkstand {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2.5vh;
  height: 5vh;
  margin: 0px 3px;
  width: 100px;
}

.checked {
  background-color: #f4200c;
  pointer-events: all;
  cursor: pointer;
}

.check-lock {
  background-color: #f57469;
  pointer-events: none;
  cursor: pointer;
}

.lock {
  pointer-events: none;
  cursor: pointer;
}
.feature-btn {
  display: flex;
}
.btn {
  background-color: white;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 15px;
  text-align: center;
  margin: 0 10px;
  padding: 0 1vh;
  height: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>