<template>
  <div class="view">
    <div>
      <a :href="view.link">
        <img :src="view.image" alt="" />
        {{ view.title }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryRightBar",
  props: {
    view: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.$emit("doneView");
  },
};
</script>
<style scoped>

.view {
  width: 80px;
  height: 100px;
  text-align: center;
}

img {
  height: 70px;
  width: 70px;
}

a {
  text-decoration: none;
  color: #ff534d;
  font-size: 0.9rem;
}
</style>