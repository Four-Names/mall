<template>
  <nav-bar class="sticky">
    <div slot="left" class="btn">
      <img src="~assets/img/common/left-arrow.svg" alt="" @click="back" />
    </div>
    <div slot="center" >{{ text }}</div>
    <div slot="right" class="btn">
      <div v-if="!close" class="text" @click="edit">
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
      if (this.path) this.$router.push(this.path);
      else this.$router.go(-1);
    },
    edit() {
      this.editing = !this.editing;
      this.$emit("editing", this.editing);
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
}
.text {
  font-size: 2vh;
}

.sticky{
  top: 0;
  /* position: fixed; */
}
</style>