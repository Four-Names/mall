<template>
  <common-nav-bar
  :home="true"
  :viewed="true"
  :collect="true"
  :category="true"
  :my="true"
  >
    <div slot="content" class="title">
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
  </common-nav-bar>
</template>

<script>
import NavBar from "components/common/NavBar/NavBar";
import CommonNavBar from "components/common/NavBar/CommonNavBar";
export default {
  components: { NavBar, CommonNavBar },
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
      showMenu: false,
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
      this.showMenu = !this.showMenu;
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
  width: 100%;
}

.title div {
  flex: 1;
}

.active {
  color: red;
}


</style>