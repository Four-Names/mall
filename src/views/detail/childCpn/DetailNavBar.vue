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
}

.title div {
  flex: 1;
}

.active {
  color: red;
}

.triangle {
  top: 5vh;
  right: 22px;
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom: 8px solid rgba(25, 25, 25, 0.9);
}

.menu {
  top: calc(5vh + 16px);
  right: 10px;
  background-color: rgba(25, 25, 25, 0.9);
  width: 120px;
  padding: 10px 0;
  position: absolute;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.row {
  display: flex;
  height: 35px;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
}

.icon {
  width: 26px;
}

.desc {
  color: white;
  width: 80px;
  font-size: 14px;
}
</style>