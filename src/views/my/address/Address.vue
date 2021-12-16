<template>
  <div class="main">
    <router-view @reloadAddress="reloadAddress" />
    <div v-if="main">
      <nav-bar>
        <img
          slot="left"
          @click="type"
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

import { getAddress } from "network/user";
import { mapMutations } from "vuex";

export default {
  components: { NavBar, Scroll },
  props: {
    props: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
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
    ...mapMutations(["setAddress"]),
    reloadAddress() {
      getAddress().then((res) => {
        this.$set(this, "addresses", res.data.data);
        this.$nextTick(() => {
          this.$refs.address?.refresh();
        });
      });
    },
    editAddress(i) {
      this.$router.push(`/my/address/edit?i=${i}`);
    },
    addAddress() {
      this.$router.push("/my/address/add");
    },
    selected(address) {
      if (this.$route.query.pay == 1) {
        this.setAddress(address);
        this.$router.go(-1);
      }
    },
    type() {
      if (this.$route.query.pay == 2) {
        if (!this.addresses) {
          this.$message.warning("请先添加收货地址");
        } else {
          this.setAddress(this.addresses[0]);
          this.$router.go(-1);
        }
      } else {
        this.$router.go(-1);
      }
    },
  },
  created() {
    if (this.$route.name == "Address")
      getAddress().then((res) => {
        this.$set(this, "addresses", res.data.data);
      });
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