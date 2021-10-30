<template>
  <div class="cart_good_main">
    <div class="good">
      <div class="left">
        <img
          src="~img/cart/unchoosed.svg"
          alt=""
          class="choosed"
          v-show="!goodIsActive"
          @click="chooseGood({ shopId, goodId })"
        />

        <img
          src="~img/cart/choosed.svg"
          alt=""
          class="choosed"
          v-show="goodIsActive"
          @click="noChooseGood({ shopId, goodId })"
        />
      </div>

      <div class="right">
        <div class="good-state">
          <a @click="checkGood">
            <img :src="goodInfo.cover" alt="" />
          </a>
          <div class="good-info">
            <span>{{ showTitle }}</span>
            <div class="check">
              <div class="price">
                <span class="flotBit">￥</span
                ><span class="intBit"> {{ intBit }}</span
                ><span class="flotBit">{{ flotBit }}</span>
              </div>
              <div class="counter">
                <span
                  class="btn"
                  @click="goodLess({ shopId, goodId })"
                  :class="ifCheck"
                  >-</span
                >
                <div class="count">{{ goodInfo.count }}</div>
                <span class="btn" @click="goodMore({ shopId, goodId })">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="good-operation" v-show="!isEditing">
      <span v-show="goodIfCollected(goodId)" @click="$emit('Uncollect', goodId)"
        >取消关注</span
      >
      <span v-show="!goodIfCollected(goodId)" @click="$emit('Collect', goodId)">加入关注</span
      ><span>|</span><span @click="goodDelete({ shopId, goodId })">删除</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CartGood",
  props: {
    goodInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    shopId: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      title: this.goodInfo.title,
      goodId: this.goodInfo.goodId,
      isEditing:false
    };
  },
  activated() {
    this.$bus.$on("editing", (isEditing) => {
        this.isEditing = isEditing

      if (isEditing) {
        this.$bus.$on("executeDelete", () => {
          if (this.goodIsActive)
            this.goodDelete({ shopId: this.shopId, goodId: this.goodId });
        });
        this.$bus.$on("executeCollect", () => {
          if (this.goodIsActive) this.$emit("Collect", this.goodId);
        });
      }
    });
  },

  computed: {
    //格式化标题
    showTitle() {
      return this.title.length < 30 ? this.title :this.title.slice(0, 30) + "...";
    },
    //价格整数位
    intBit() {
      return this.goodInfo.price.slice(0, this.goodInfo.price.indexOf("."));
    },

    //价格小数位
    flotBit() {
      return this.goodInfo.price.slice(this.goodInfo.price.indexOf("."));
    },

    //是否可结算
    ifCheck() {
      return this.goodInfo.count > 1 ? "" : "forbid";
    },

    //getters映射
    ...mapGetters(["ifGoodActive", "goodIfCollected"]),

    goodIsActive() {
      return this.ifGoodActive({ goodId: this.goodId, shopId: this.shopId });
    },
  },
  methods: {
    //关注操作
    foucsOn() {},

    //mutations映射
    ...mapMutations([
      "goodDelete", //删除商品
      "goodLess", //商品数量减一
      "goodMore", // 商品数量加一
      "chooseGood", //选择商品
      "noChooseGood", //取消选择商品
    ]),

    checkGood() {
      this.$router.push({ path: "/detail", query: { id: this.goodId } });
    },
  },

};
</script>
<style scoped>
.cart_good_main {
  width: calc(100vw - 10px);
  height: 150px;
  display: grid;
}

.left {
  display: grid;
  align-items: center;
  height: 100px;
}

.right {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100px;

  padding: 0 10px;
}

.good {
  display: flex;
  height: 100px;
}

.good-state {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.good-info {
  width: calc(100% - 120px);
  display: grid;
  justify-content: flex-start;
  font-size: 0.9rem;
}

.good-state img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
}

.check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price {
  color: red;
}

.intBit {
  font-size: 1.1rem;
}

.flotBit {
  font-size: 0.8rem;
}

.choosed {
  height: 21px;
  width: 20px;
}

.count {
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  background-color: rgb(211, 211, 211);
  font-size: 0.9rem;
}

.counter {
  display: flex;
  justify-content: space-between;
  width: 80px;
  font-weight: bolder;
  align-items: center;
}

.btn {
  font-size: 1rem;
}

.good-operation {
  font-size: 0.9rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  height: 30;
  margin-right: 20px;
}



.forbid {
  color: grey;
  pointer-events: none;
}
</style>