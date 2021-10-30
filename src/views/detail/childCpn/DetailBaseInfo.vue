<template>
  <div class="base-info">
    <div class="title">
      <span>{{ goodInfo.title }}</span>
    </div>
    <div class="price-bar">
      <div class="price" :class="ifHasDiscount">
        <span class="new-price"
          >{{ goodInfo.newPrice }}
          <span class="old-price">
            <del>{{ goodInfo.oldPrice }}</del>
          </span>
        </span>
        <span v-show="goodInfo.discount" class="discount">
          {{ goodInfo.discount }}
        </span>
      </div>
      <div class="star" @click="collect = !collect">
        <img
          v-show="goodIfCollected(goodId)"
          src="~img/common/collect.svg"
          alt=""
          @click="$emit('Uncollect')"
        />
        <img
          v-show="!goodIfCollected(goodId)"
          src="~img/common/no-collect.svg"
          alt=""
          @click="$emit('Collect')"
        />
      </div>
    </div>
    <div class="info">
      <span v-for="(item, index) in goodInfo.columns" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="guarantee">
      <span>退货补运费</span>
      <span>全国包邮</span>
      <span>7天无忧退货</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "DetailBaseInfo",
  props: {
    goodInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    goodId: {
      type: String,
      default() {
        return "";
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
      defaultServices: ["退货补运费", "全国包邮", "7天无忧退货"],
      collect: this.ifCollect,
    };
  },
  computed: {
    ...mapGetters(["goodIfCollected"]),
    ifHasDiscount() {
      return this.goodInfo.discount ? "price-discount" : "";
    },
  },

};
</script>
<style scoped>
.base-info {
  width: 100%;
}
.title {
  color: black;
  font-size: 1.2rem;
  margin: 5px 0 10px;
}

.price {
  color: deeppink;
}
.price-discount {
  border-bottom: 5px solid deeppink;
}
.price-bar {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.star {
  padding-right: 15px;
}
.new-price {
  font-size: 1.6rem;
  padding-left: 0.7rem;
}
.old-price {
  color: grey;
  font-size: 0.8rem;
}
.discount {
  color: white;
  font-size: 1.6rem;
  background-color: deeppink;
  border-radius: 10px 0 0 0;
  padding-right: 5px;
}

.info {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-size: 0.9rem;
  color: grey;
}
.guarantee {
  display: flex;
  justify-content: space-around;
  align-content: center;
  font-size: 1.1rem;
  border-top: 1px solid rgb(224, 224, 224);
  border-bottom: 3px solid rgb(224, 224, 224);
  padding: 10px 0px;
}

.guarantee > span::before {
  content: url("~img/common/none.svg");
  background: url("~img/common/Guarantee.svg") no-repeat;
  background-size: 20px 20px;
}
</style>