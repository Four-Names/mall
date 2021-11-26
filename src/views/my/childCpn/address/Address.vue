<template>
  <div class="main">
    <router-view />
    <div v-if="main">
      <nav-bar>
        <img
          slot="left"
          @click="$router.go(-1)"
          src="~assets/img/common/left-arrow.svg"
          alt=""
        />
        <div slot="center" class="center">收货地址</div>
      </nav-bar>

      <scroll v-if="addresses" ref="address" class="scroll">
        <div
          v-for="address of addresses"
          :key="address.i"
          class="row"
          @click="selected(address)"
        >
          <div>
            <div>
              <div>{{ address.receiver }}</div>
              <div>{{ address.phone }}</div>
            </div>
            <div>
              {{ address.province + address.city + address.address }}
            </div>
          </div>
          <div class="edit" @click="editAddress(address.i)">编辑</div>
        </div>
      </scroll>

      <div class="add" @click="addAddress">
        <div>新增收货地址</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar/NavBar";

import Scroll from "components/common/Scroll/Scroll";

export default {
  components: { NavBar, Scroll },
  data() {
    return {
      addresses: null,
      select: this.$route.query == "pay",
    };
  },
  computed: {
    main() {
      return this.$route.name == "Address";
    },
  },
  methods: {
    getAddress() {
      this.$axios.get("/user/address").then((res) => {
        this.$set(this, "addresses", res.data.data);
        this.$nextTick(() => {
          this.$refs.address?.refresh();
        });
      });
    },
    editAddress(i) {
      this.$router.push(`/my/address/edit?i=${i}`);
      new Promise((resolve, reject) => {
        this.$bus.$on("reloadAddress", () => {
          this.getAddress();
          resolve();
        });
      }).then(() => {
        this.$bus.$off("reloadAddress");
      });
    },
    addAddress() {
      this.$router.push("/my/address/add");
    },
    selected(address) {
      if (this.$route.query.pay == 1) {
        this.$bus.$emit("getAddress", address);
        this.$router.go(-1);
      }
    },
  },
  created() {
    if (this.$route.name == "Address")
      this.$axios.get("/user/address").then((res) => {
        this.$set(this, "addresses", res.data.data);
        this.$nextTick(() => {
          this.$refs.address.openPullUp();
        });
      });
  },
  activated() {
    console.log("activated");
  },
};
</script>
<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-color: rgb(247, 247, 247);
  position: relative;
}

.scroll {
  height: calc(93.3vh - 70px);
  overflow: hidden;
  background-color: white;
  position: relative;
}

.add {
  position: absolute;
  width: 100vw;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: white;
}
.add > div {
  width: 90%;
  height: 40px;
  border-radius: 20px;
  background-color: rgb(242, 65, 12);
  text-align: center;
  color: white;
  font-size: 18px;
  display: inline-block;
  line-height: 40px;
}

.btn_active {
  background-color: rgb(252, 26, 0);
}
.btn {
  background-color: rgb(255, 188, 179);
  pointer-events: none;
}

.row {
  display: flex;
  flex-direction: row;
  height: 60px;
  width: 95vw;
  padding: 5px 2.5vw;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid rgb(242, 242, 242);
}

.row > div > div:nth-child(1) > div {
  font-weight: 550;
  font-size: 16px;
}
.row > div > div {
  display: flex;
  flex-direction: row;
  font-weight: 400;
  font-size: 13px;
  width: 100%;
  gap: 5px;
  padding: 5px;
}
.edit {
  color: rgb(240, 27, 27);
  font-size: 14px;
}
</style>