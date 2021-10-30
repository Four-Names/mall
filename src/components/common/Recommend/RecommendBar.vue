<template>
  <div class="recommend-user">
      <img src="~img/common/right_edging.svg" alt="">
      <p>为  您  推  荐 </p>
      <img src="~img/common/left_edging.svg" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.recommend-user{
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    gap: 10px;
}

</style>