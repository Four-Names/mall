<template>
  <div class="shop-info">
    <div class="shop-logo">
      <img :src="shopInfo.logo" alt="" /> <a href="">{{ shopInfo.name }}</a>
    </div>
    <div class="shop-desc">
      <div class="left">
        <div class="desc">
          <div class="num">{{formatSell}}</div>
          <div>总销量</div>
        </div>
        <div class="desc">
          <div class="num">{{ shopInfo.goodsCount }}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="center"></div>
      <div class="right">
        <div
          class="right-judge"
          v-for="(item, index) in shopInfo.score"
          :key="index"
        >
          <span>{{ item.name }}</span>
          <span>{{Number.parseFloat(item.score).toFixed(2)}}</span>
          <img v-if="item.score > 4.8" src="~img/common/normal.svg" alt="">
          <img v-else-if="item.score > 4.5" src="~img/common/low.svg" alt="">
          <img v-else src="~img/common/top.svg" alt="">
        </div>
      </div>
    </div>
    <div class="shop-entry">
      <a href="">进店逛逛</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    formatSell() {
      const num = parseInt(this.shopInfo.sells);
      if (num > 10000) {
        return parseFloat(num / 10000).toFixed(1) + "万";
      } else return num;
    },
  },
  methods: {
    decision(score) {
      if (score >= 4.8) {
        return "top";
      } else if (score >= 4.5) {
        return "normal";
      } else return "low";
   
    },
  },
};
</script>
<style scoped>

.shop-info {
  width: 100%;
}

.shop-logo {
  display: flex;
  justify-content: flex-start;
  margin: 20px auto 20px 25px;
}

.shop-logo a {
  font-size: 1.1rem;
  color: black;
  text-decoration: none;
  line-height: 50px;
  margin-left: 10px;
}

.shop-logo img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: 0 -1px 3px rgba(190, 190, 190, 0.356);
}

.shop-desc {
  display: flex;
  justify-content: space-between;
  height: 75px;
  margin: 5px 10px;
}

.shop-entry {
  display: flex;
  justify-content: center;
  align-items: center;
}

.shop-entry a {
  display: inline-block;
  text-align: center;
  color: grey;
  text-decoration: none;
  width: 40%;
  height: 30px;
  font-size: 1rem;
  line-height: 30px;
  background-color: antiquewhite;
  border-radius: 5%;
  margin: 10px 0px;
}

.left {
  width: 45%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}

.desc {
  font-size: 0.9rem;
}

.num {
  font-size: 1.1rem;
  font-weight: bold;
  height: 30px;
}

.right {
  width: 45%;
}

.right div {
  display: flex;
}

.right-judge {
  height: 26px;
  align-items: center;
  display: flex;
  font-size: 1.1rem;
  justify-content: space-between;
  align-items: center;
}
.right-judge >img{
  height: 21px;
  width: 20px;
}
.center {
  width: 1px;
  background-color: grey;
  height: 100%;
}


</style>