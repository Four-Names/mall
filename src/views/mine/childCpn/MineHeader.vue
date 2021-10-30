<template>
  <div class="header">
    <div class="photo">
      <img src="~img/mine/example.svg" alt="" />
    </div>
    <div class="collect_info">
      <div>
        <div>{{ getCollectionNum }}</div>
        <div @click="goCollect">我的关注</div>
      </div>
      <div @click="$toast.show('受限于API接口信息的缺失，暂无此功能')">
        <div>{{ shop_count }}</div>
        <div>店铺收藏</div>
      </div>
      <div>
        <div>{{ historyListLength }}</div>
        <div @click="goHistory">我的足迹</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getHistoryListLength } from "common/sessionStorage";
export default {
  name: "MineHeader",
  data() {
    return {
      historyListLength: 0,
    };
  },
  computed: {
    ...mapGetters(["getCollectionNum"]),
    shop_count() {
      return 0;
    },
  },
  methods: {
    goCollect() {
      if (this.$route.path.indexOf("/collect") === -1)
        this.$router.replace("/collect");
    },
    goHistory() {
      if (this.$route.path.indexOf("/history") === -1)
        this.$router.replace("/history");
    },
  },
  activated() {
    this.historyListLength = getHistoryListLength();
  },
};
</script>
<style scoped>
.header {
  background: url("~img/mine/background.png") no-repeat center;
  background-size: 100% 100%;
  flex-direction: column;
  padding: 50px 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
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
： .collect_info > div > div:nth-child(1) {
  font-weight: 600;
}
</style>