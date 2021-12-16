<template>
  <div class="shop">
    <div class="left">
      <span class="choosed" @click="$emit('allChoosed')" v-show="!tag"></span>
      <span class="choosed" @click="$emit('unChoosed')" v-show="tag"></span>
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
};
</script>
<style scoped>
</style>