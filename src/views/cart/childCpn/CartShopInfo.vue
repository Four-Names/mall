<template>
  <div class="shop">
    <div class="left">
      <span class="choosed" @click="choosed" v-show="!tag"></span>
      <span class="choosed" @click="unchoosed" v-show="tag"></span>
    </div>
    <img :src="shop.shopLogo" alt="" />
    <span>{{ shop.shopName }}</span>
  </div>
</template>

<script>
export default {
  name: "CartShopInfo",
  components: {},
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      tag: this.$store,
    };
  },
  methods: {
    choosed() {
      this.$emit("allChoosed");
    },
    unchoosed() {
      this.$emit("unChoosed");
    },
  },
};
</script>
<style scoped>

</style>