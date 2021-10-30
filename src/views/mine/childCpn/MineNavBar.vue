<template>
  <nav-bar>
    <div slot="left" class="btn">
      <img src="~assets/img/common/left-arrow.svg" alt="" @click="back" />
    </div>
    <div slot="center" class="center">个人中心</div>
    <div slot="right" class="btn">
      <img src="~assets/img/common/menu.svg" alt="" @click="menu" />
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/NavBar/NavBar";

export default {
  components: { NavBar },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    back() {
      this.$router.back();
    },
    menu() {},
  },
  created() {},
  mounted() {},
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

</style>