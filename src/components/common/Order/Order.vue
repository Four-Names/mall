<template>
  <div>
    <div class="itemHeader">
      <div class="orderTitle">
        <img v-if="isSingle" :src="getImg" alt="" />
        <img v-else src="~img/logo/mili.svg" alt="" />
        {{ getTitle }}
      </div>
      <slot name="status" />
    </div>

    <div>
      <div class="goodContent" @click="checkDetail">
        <div v-if="isSingle">
          <img
            class="goodImg"
            v-for="(good, index) of Object.values(item.data)[0].goods"
            :src="good.cover"
            alt=""
            :key="index"
            style="width: 80px; height: 80px"
          />
        </div>
        <div v-else class="imgs">
          <img
            v-for="(img, index) of getImgs"
            :key="index"
            :src="img"
            class="goodImg"
            alt="good"
            style="width: 80px; height: 80px"
          />
        </div>
        <div class="title" v-if="isSingle">
          {{ formateTitle }}
        </div>

        <div class="info">
          <div class="price"><span>¥</span>{{ item.price }}</div>
          <div class="count">共{{ item.count }}件</div>
        </div>
      </div>
    </div>
    <div class="btns">
      <slot name="btn" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    checkDetail() {
      this.$router.push({
        path: `/my/order_detail`,
        query: {
          i: this.item.i,
        },
      });
    },
  },
  computed: {
    getTitle() {
      if (Object.keys(this.item.data).length === 1) {
        return Object.values(this.item.data)[0].info.shopName;
      } else {
        return "咪狸商城";
      }
    },
    getImg() {
      return Object.values(this.item.data)[0].info.shopLogo;
    },
    isSingle() {
      return Object.keys(this.item.data).length === 1;
    },
    formateTitle() {
      let title = Object.values(Object.values(this.item.data)[0].goods)[0]
        .title;
      if (title.length <= 20) return title;
      return title.slice(0, 20) + "...";
    },
    getImgs() {
      let imgs = [];
      for (let shop in this.item.data) {
        for (let good in this.item.data[shop].goods) {
          imgs.push(this.item.data[shop].goods[good].cover);
        }
      }
      return imgs;
    },
  },
  created() {},
};
</script>
<style scoped>
.itemHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.itemHeader img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.orderTitle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  gap: 10px;
}

.goodImg {
  border-radius: 10px;
  flex-shrink: 0;
}

.goodContent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}

.title {
  font-size: 16px;
}

.info {
  min-width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: right;
  text-align: right;
}

.price {
  font-size: 17px;
  font-weight: 550;
}

.price > span {
  font-size: 14px;
}

.count {
  font-size: 15px;
  color: gray;
}

.btns {
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 20px;
  padding-bottom: 10px;
}

.btns div {
  height: 30px;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 15px;
  width: 80px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  border: 1px solid rgb(254, 191, 184);
  color: red;
  font-weight: 550;
}

.imgs {
  display: flex;
  flex-direction: row;
  gap: 5px;
  width: 100%;
  overflow-x: scroll;
}
</style>