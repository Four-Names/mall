<template>
  <nav-bar>
    <div slot="left" class="btn" />
    <search slot="center" :message="'请输入商品分类信息'" />
    <div slot="right" class="btn" />
  </nav-bar>
</template>

<script>
import NavBar from "components/common/NavBar/NavBar";
import Search from "components/common/Search/Search";

export default {
  components: { NavBar, Search },
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