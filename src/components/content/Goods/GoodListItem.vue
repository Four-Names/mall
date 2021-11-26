<template>
  <div class="good-item">
    <img
      v-lazy="showImage"
      :key="showImage"
      alt=""
      @click="itemClick"
      @load="load"
    />

    <p>{{ goodsItem.title }}</p>

    <div class="good-info">
      <span>{{ parseFloat(goodsItem.price) }}￥</span>
      <img src="~img/common/collect.svg" alt="" />
      <span>{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
import { debounce } from "common/utils";

export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return null;
      },
    },
    loadName: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      load: null,
    };
  },
  computed: {
    showImage() {
      return (
        this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
      );
    },

    id() {
      return this.goodsItem.iid;
    },
  },
  created() {
    this.load = debounce(this.imgload);
  },
  methods: {
    //转到对应的页面
    itemClick() {
      // console.log(this.$route,this.$router);
      this.$router.push({ path: "/detail", query: { id: this.id } });
    },

    //事件总线分发图片加载事件
    imgload() {
      this.$bus.$emit(this.loadName);
    },
  },
};
</script>
<style scoped>
.good-item {
  padding: 5px 0;
  width: 48%;
}

.good-item img {
  width: 100%;
  border-radius: 5px;
}

.good-item p {
  font-size: 2vh;
  text-align: center;
  margin: 2px 0 3px;
}

.good-info {
  font-size: 2vh;

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.good-info span:nth-child(1) {
  color: deeppink;
  margin-right: 10px;
}
.good-info > img {
  width: 2vh;
}

.good-price {
  display: flex;
  align-items: center;
}
</style>