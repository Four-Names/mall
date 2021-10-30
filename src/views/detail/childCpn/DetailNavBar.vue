<template>
  <nav-bar>
    <div slot="left" class="btn">
      <img src="~assets/img/common/left-arrow.svg" alt="" @click="back" />
    </div>

    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="title-item"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        {{ item }}
      </div>
    </div>

    <div slot="right" class="btn">
      <img src="~assets/img/common/menu.svg" alt="" @click="menu" />
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/NavBar/NavBar";

export default {
  components: { NavBar },
  props: {
    cursor: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },

  methods: {
    itemClick(index) {
      this.$emit("titleClick", index);
      this.currentIndex = index;
    },

    back() {
      this.$router.back();
    },
    menu() {
      this.$toast.show("尚未开发\n敬请期待");
    },
  },

  watch: {
    cursor(newY) {
      this.currentIndex = newY;
    },
  },
};
</script>
<style scoped>
.btn {
  display: flex;
  width: 60px;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title {
  display: flex;
}

.title div {
  flex: 1;
}

.active {
  color: red;
}
</style>