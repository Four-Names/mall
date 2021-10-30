<template>
  <div class="featureBar">
    <slot />
  </div>
</template>

<script>
export default {
  name: "FeatureBar",
};
</script>
<style scoped>
.featureBar {
  padding: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(224, 224, 224);
}

</style>