<template>
  <div class="header">
    <div class="photo">
      <img src="~img/my/example.svg" alt="" />
      <p class="nickname">{{ userInfo.nickname }}</p>
    </div>
    <div class="collect_info">
      <div>
        <div>{{ getCollectionNum }}</div>
        <div @click="goCollect">我的收藏</div>
      </div>
      <div>
        <div>{{ getViewedNum }}</div>
        <div @click="goViewed">我的足迹</div>
      </div>
    </div>

    <div class="feature_bar">
      <div class="feature" @click="$router.push('/my/order/1')">
        <img src="~img/my/pay.svg" alt="" />
        <p>待付款</p>
      </div>
      <div class="feature" @click="$router.push('/my/order/2')">
        <img src="~img/my/receive.svg" alt="" />
        <p>待收货</p>
      </div>
      <div class="feature" @click="$router.push('/my/order/3')">
        <img src="~img/my/complete.svg" alt="" />
        <p>已完成</p>
      </div>
      <div class="feature" @click="$router.push('/my/order/0')">
        <img src="~img/my/orders.svg" alt="" />
        <p>全部订单</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserInfo } from "common/localStorage";

export default {
  name: "MyHeader",
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapGetters(["getCollectionNum", "getViewedNum"]),
    shop_count() {
      return 0;
    },
  },
  methods: {
    async goCollect() {
      if (!this.$route.path.includes("/my/collect")) {
        let collect = await this.$router.push("/my/collect");
        console.log(collect);
      }
    },
    async goViewed() {
      if (!this.$route.path.includes("/my/viewed")) {
        let viewed = await this.$router.push("/my/viewed");
        console.log(viewed);
      }
    },
  },
  activated() {
    this.userInfo = getUserInfo();
  },
};
</script>
<style scoped>
.header {
  background: url("~img/my/background.png") no-repeat center;
  background-size: 100% 100%;
  flex-direction: column;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  position: relative;
  margin-bottom: 100px;
}

.photo > img {
  width: 80px;
  height: 80px;
}

.collect_info {
  height: 60px;
  display: flex;
  width: 100vw;
  justify-content: space-around;
  align-items: center;
  color: white;
}
.collect_info > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.collect_info > div > div:nth-child(1) {
  font-weight: 600;
}
.nickname {
  text-align: center;
}

.feature_bar {
  display: none;
  bottom: -70px;
  width: 100vw;
  position: absolute;
  background-color: white;
  border-radius: 15px;
  padding: 15px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgb(224, 224, 224);
}

.feature {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 50px;
  font-size: 0.9rem;
  gap: 5px;
}
.feature > img {
  width: 30px;
  height: 30px;
  display: block;
}

</style>