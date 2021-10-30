<template>
  <div class="Feature">
    <img :src="imgSrc" alt="" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "Feature",
  components: {},
  props: {
    imgSrc: {
      type: String,
      default() {
        return "";
      },
    },
    text: {
      type: String,
      default() {
        return "";
      },
    },
  },
  computed:{

  }
};
</script>
<style scoped>

</style>