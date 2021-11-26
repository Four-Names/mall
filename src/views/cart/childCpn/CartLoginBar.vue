<template>
    <div class="top">
      <p>登录后可同步账户购物车中的商品</p>
      <div class="btn"><span @click="login">登录</span></div>
    </div>
</template>

<script>
export default {
  methods: {
    login() {
        this.$router.push({path:'/login'});
    },
  },
};
</script>
<style scoped>
.top {
  width: 100vw;
  height: 50px;
  text-align: center;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
}
.btn {
  width: 60px;
  height: 30px;
  line-height: 30px;
  color: white;
  border-radius: 20px;
  background-color: rgb(244, 44, 16);
}
</style>