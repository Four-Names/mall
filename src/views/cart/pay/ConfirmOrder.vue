<template>
  <div class="main">
    <router-view />
    <nav-bar class="line">
      <img
        slot="left"
        @click="$router.go(-1)"
        src="~assets/img/common/left-arrow.svg"
        alt=""
      />
      <div slot="center">确认订单</div>
    </nav-bar>
    <div  @click="selectAddress">
      <div class="address" v-if="currentAddress">
        <div>
          <div>
            <div>{{ currentAddress.receiver }}</div>
            <div>{{ currentAddress.phone }}</div>
          </div>
          <div>
            {{ fullAddress }}
          </div>
        </div>
        <div>
          <img src="~assets/img/common/more.svg" alt="" />
        </div>
      </div>
    </div>
    <div>
      <div
        v-for="(shop, index) in getSelectedGood"
        :key="index"
        class="shopGoods"
      >
        <div class="shopBanner">
          <img :src="shop.info.shopLogo" alt="" />
          <div class="shopName">
            {{ shop.info.shopName }}
          </div>
        </div>
        <div>
          <div v-for="(good, index) in shop.goods" :key="index" class="good">
            <img :src="good.cover" :alt="good.title" />
            <div class="info">
              <div>{{ formateTitle(good.title) }}</div>
              <div>
                <div class="price"><span>￥</span>{{ good.price }}</div>
                <div class="count">x{{ good.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar/NavBar";
import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      address: null,
      currentAddress: null,
    };
  },
  computed: {
    ...mapGetters(["getSelectedGood"]),
    fullAddress() {
      return (
        this.currentAddress.province +
        this.currentAddress.city +
        this.currentAddress.address
      );
    },
  },
  watch: {},
  methods: {
    formateTitle(title) {
      return title.slice(0, 20) + "...";
    },

    async selectAddress() {
      this.$router.push("/my/address?pay=1");
      await new Promise((resolve, reject) => {
        this.$bus.$on("getAddress", (address) => {
          this.currentAddress = address;
          resolve()
        });
      }).then(() => {
        this.$bus.$off("getAddress");
      });
    },
  },
  created() {
    this.$axios.get("/user/address").then((res) => {
      this.currentAddress = res.data.data[0];
    });
  },
};
</script>
<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  background-color: rgb(242, 242, 242);
}

.line {
  border-bottom: 1px solid rgb(242, 242, 242);
}

.shopGoods {
  background-color: white;
  border-radius: 10px;
  margin: 10px 0;
}

.address {
  width: 100vw;
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  border-bottom: 3px solid #2ed;
}
.address > div:first-child {
  width: calc(100vw - 100px);
}

.address > div:first-child > div:first-child {
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
}

.shopBanner {
  display: flex;
  flex-direction: row;
  width: 95vw;
  margin: 0 auto;
  box-sizing: border-box;
  height: 60px;
  gap: 10px;
  align-items: center;
}
.shopBanner img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.shopName {
  font-weight: 550;
}

.good {
  display: flex;
  flex-direction: row;
  width: 95vw;
  margin: 0 auto;
  padding: 10px 0;
}
.good img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.info {
  width: calc(95vw - 100px);
  margin-left: 10px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info > div:first-child {
  font-size: 17px;
}

.info > div:nth-child(2) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.price {
  color: red;
  font-size: 18px;
}

.price > span {
  font-size: 13px;
}

.count {
  color: rgb(152, 152, 152);
}
</style>