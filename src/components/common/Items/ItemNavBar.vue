<template>
  <nav-bar>
    <div slot="left" class="btn">
      <img src="~assets/img/common/left-arrow.svg" alt="" @click="back" />
    </div>
    <div slot="center" class="center">{{ text }}</div>
    <div slot="right" class="btn" @click="editing = !editing">
      <div v-show="!close">
        <div v-show="!editing">编辑</div>
        <div v-show="editing">完成</div>
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "../NavBar/NavBar";
export default {
  components: { NavBar },
  props: {
    text: {
      type: String,
      default() {
        return "";
      },
    },
    path: {
      type: String,
      default() {
        return "";
      },
    },
    close: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    back() {
      if (this.path) this.$router.replace(this.path);
      else this.$router.back();
    },
  },
  watch: {
    editing(newV) {
      this.$bus.$emit("editing", newV);
    },
  },
  deactivated() {
    this.editing = false;
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
  font-weight: 600;
}
</style>