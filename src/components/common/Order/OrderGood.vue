<template>
  <div v-if="goods">
    <div v-for="(shop, index) in goods" :key="index" class="shopGoods">
      <div class="shopBanner">
        <img :src="shop.info.shopLogo" alt="" />
        <div class="shopName">
          {{ shop.info.shopName }}
        </div>
      </div>
      <div>
        <div v-for="(good, index) in shop.goods" :key="index" class="good">
          <img :src="good.cover" :alt="good.title" @click="checkGood(good)" />
          <div class="info">
            <div>{{ formateTitle(good.title) }}</div>
            <div>
              <div class="price"><span>¥</span>{{ good.price }}</div>
              <div class="count">x{{ good.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    goods: {
      type: Object,
      default() {
        return undefined;
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    formateTitle(title) {
      return title.slice(0, 20) + "...";
    },
    checkGood(goods) {
      this.$router.push({ path: "/detail", query: { id: goods.goodId } });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.shopGoods {
  background-color: white;
  border-radius: 10px;
  margin: 10px 0;
}
.shopBanner {
  display: flex;
  flex-direction: row;
  width: 95vw;
  margin: 0 auto;
  box-sizing: border-box;
  height: 60px;
  gap: 10px;
  align-items: center;
}
.shopBanner img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.shopName {
  font-weight: 550;
}
.good {
  display: flex;
  flex-direction: row;
  width: 95vw;
  margin: 0 auto;
  padding: 10px 0;
}
.good img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}
.info {
  width: calc(95vw - 100px);
  margin-left: 10px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info > div:first-child {
  font-size: 17px;
}

.info > div:nth-child(2) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.price {
  color: red;
  font-size: 18px;
}
.price > span {
  font-size: 13px;
}

.count {
  color: rgb(152, 152, 152);
}
</style>