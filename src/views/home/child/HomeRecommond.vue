<template>
  <div class="recommond" v-if="recommonds.length">
    <div v-for="(item, id) in recommonds" :key="id" class="recommond-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommond",
  props: {
    recommonds: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    this.$emit("loadDone");
  },
};
</script>
<style scoped>
.recommond {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 0.8rem;
}
.recommond-item {
  flex: 1;
}
.recommond-item img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.recommond a {
  color: rgb(6, 185, 126);
  text-decoration: none;
}
</style>