<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~img/home/recommend_bg.jpg" @load="$emit('loadDone')" alt="" />
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
};
</script>
<style scoped>

.feature {
  margin-bottom: 20px;
}
.feature img {
  width: calc(100vw  + 1px); 
}

</style>