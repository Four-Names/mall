<template>
  <div class="login_page">
    <item-nav-bar text="用户登录" :close="true" />
    <div class="logo">
      <img src="~img/logo/mall.svg" alt="" />
    </div>
    <input
      v-model="$v.username.$model"
      :class="status($v.username)"
      placeholder="用户名"
      minlength="3"
      maxlength="10"
      autocomplete="false"
    />
    <input
      v-model="$v.password.$model"
      :class="status($v.password)"
      type="password"
      placeholder="密码"
      minlength="6"
      maxlength="18"
      autocomplete="false"
    />

    <div id="login_Btn" :class="btnIsActive" @click="login">
      <span>登录</span>
    </div>
    <div id="register_Btn">
      <span @click="$router.push('/register')">未有账户?点此注册</span>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "components/common/Items/ItemNavBar";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { loginIn, setUserInfo } from "common/localStorage";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  components: { ItemNavBar },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["cartIsEmpty"]),
    ...mapState(["viewedList", "shopList", "collectionList"]),

    btnIsActive() {
      return !this.$v.username.$invalid && !this.$v.password.$invalid
        ? "btn_active"
        : "btn";
    },
  },
  methods: {
    ...mapMutations([
      "setLogin",
      "addShop",
      "syncCart",
      "syncCollection",
      "syncViewed",
    ]),
    login() {
      let data = {
        username: this.username,
        password: this.password,
      };
      this.$axios
        .post(`/login`, JSON.stringify(data))
        .then(async (res) => {
          if (res.data?.tag) {
            if (!this.cartIsEmpty) {
              await this.updateCart();
            }

            this.getUserCart();
            this.getUserCollection();
            this.getUserViewed();

            let token = res.data.data.token;
            loginIn(token);

            this.setLogin(true);

            setUserInfo({ nickname: res.data.data.nickname });

            this.$message.success("登录成功");
            this.$router.push({ path: "/my" });
          } else {
            this.$message.error("用户名或密码错误");
          }
        })
        .catch((e) => {
          throw e;
        });
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },

    //同步未登录前的购物车数据
    updateCart() {
      let data = {
        data: JSON.stringify(this.shopList),
      };
      this.$axios
        .post("/user/update_cart", JSON.stringify(data))
        .then((res) => {
          console.log("res", res);
        });
    },

    //获取用户购物车数据
    getUserCart() {
      this.$axios.get("/user/cart").then((res) => {
        let shops = JSON.parse(res.data.data);
        for (let shop in shops) {
          this.syncCart(shops[shop]);
        }
      });
    },

    //获取用户收藏数据
    getUserCollection() {
      this.$axios.get("/user/collection").then((res) => {
        console.log(res, "collection");
        let collections = JSON.parse(res.data.data.data);
        for (let collection in collections) {
          this.syncCollection(collections[collection]);
        }
      });
    },

    //获取用户浏览记录
    getUserViewed() {
      this.$axios.get("/user/viewed").then((res) => {
        console.log(res, "viewed");
        let viewedGood = JSON.parse(res.data.data.data);
        for (let good in viewedGood) {
          this.syncViewed(viewedGood[good]);
        }
      });
    },
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10),
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(18),
    },
  },
};
</script>
<style scoped>
.login_page {
  background-color: white;
  height: 100vh;
}
.logo {
  text-align: center;
  display: flex;
  justify-content: center;
}
#login_Btn {
  width: 90vw;
  height: 60px;
  border-radius: 35px;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: whitesmoke;
}
#register_Btn {
  margin: 0 auto;
  font-size: 13px;
  width: 90vw;
  text-align: right;
  color: gray;
  height: 40px;
  display: flex;
  justify-content: right;
  align-items: center;
}

.btn_active {
  background-color: rgb(252, 26, 0);
}
.btn {
  background-color: rgb(255, 188, 179);
  pointer-events: none;
}
input {
  border-bottom: 1px solid silver;
  background: white;
  padding: 5px 10px;
  display: block;
  margin: 10px auto;
  width: 90vw;
  height: 45px;
  font-size: 20px;
  outline: none;
}

.dirty {
  border-color: #5a5;
  background: #efe;
}

.dirty:focus {
  outline-color: #8e8;
}

.error {
  border-color: red;
  background: #fdd;
}

.error:focus {
  outline-color: #f99;
}
</style>