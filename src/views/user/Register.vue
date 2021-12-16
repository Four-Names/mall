<template>
  <div class="reg_page">
    <item-nav-bar text="用户注册" :close="true" />
    <div class="logo">
      <img src="~img/logo/mall.svg" alt="" />
    </div>
    <form action="">
      <input
        v-model="$v.nickname.$model"
        :class="status($v.nickname)"
        placeholder="昵称"
        maxlength="20"
      />
      <input
        v-model="$v.username.$model"
        :class="status($v.username)"
        placeholder="用户名"
        maxlength="20"
        autocomplete="true"
      />
      <input
        v-model="$v.password.$model"
        :class="status($v.password)"
        type="password"
        placeholder="密码"
        maxlength="20"
        autocomplete="true"
      />
      <input
        v-model="$v.repeatPassword.$model"
        :class="status($v.repeatPassword)"
        type="password"
        placeholder="确认密码"
        maxlength="20"
        autocomplete="true"
      />
      <input
        v-model="$v.email.$model"
        :class="status($v.email)"
        type="email"
        placeholder="邮箱"
        maxlength="255"
      />

      <div id="emailer" :class="getCode" @click="postCode">
        <span v-if="isSended">{{ countdown }}</span>
        <span v-else>发送邮箱验证码</span>
      </div>

      <input
        v-model="$v.code.$model"
        :class="status($v.code)"
        type="code"
        placeholder="邮箱验证码"
        maxlength="6"
      />

      <div id="register_btn" @click="register" :class="btnActive">
        <span>注册</span>
      </div>
    </form>
  </div>
</template>

<script>
import ItemNavBar from "components/common/Items/ItemNavBar";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import { mapGetters, mapState } from "vuex";

import {
  validCode,
  register,
  sendCode,
  hasUser,
  hasEmail,
} from "network/register";

export default {
  components: { ItemNavBar },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      code: "",
      nickname: "",
      repeatPassword: "",
      countdown: 60,
      isSended: false,
    };
  },
  computed: {
    btnActive() {
      return this.$v.$invalid ? "btn" : "btn_active";
    },
    invalidPwd() {
      if (this.password == "" && this.$v.repeatPassword.$model == "")
        return true;
      return this.$v.repeatPassword.$invalid || this.$v.repeatPassword.$invalid;
    },
    getCode() {
      return this.$v.nickname.$invalid ||
        this.$v.username.$invalid ||
        this.$v.password.$invalid ||
        this.invalidPwd ||
        this.$v.email.$invalid ||
        this.isSended
        ? "btn"
        : "btn_active";
    },
    ...mapState(["isLogin"]),
  },
  watch: {
    //倒计时
    isSended(newV) {
      if (newV) {
        (async () => {
          for (let i = 60; i >= 0; i--) {
            await new Promise((resolve, reject) => {
              setTimeout(
                (i) => {
                  this.countdown = i;
                  if (i == 0) {
                    this.isSended = false;
                    this.countdown = 60;
                  }
                  resolve();
                },
                1000,
                i
              );
            });
          }
        })();
      }
    },
  },
  methods: {
    register() {
      validCode(this.code, this.email).then(async (res) => {
        if (res.data.tag) {
          let data = {
            nickname: this.nickname,
            email: this.email,
            password: this.password,
            username: this.username,
          };
          await register(data).then(async (res) => {
            if (res.data.tag) {
              if (!this.isLogin) {
                await this.$confirm("注册成功,是否现在登录?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                })
                  .then(() => {
                    this.$router.push({ path: "/login" });
                  })
                  .catch((e) => {
                    this.$message("已取消删除");
                  });
              } else {
                this.$message.success("注册成功");
                this.$router.go(-1);
              }
            } else {
              this.$message.error("注册失败,请稍候重试");
            }
          });
        } else {
          this.$message.error("验证码错误");
        }
      });
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    postCode() {
      this.checkValid().then((res) => {
        if (res) {
          sendCode(this.username, this.email).then((res) => {
            console.log("res", res);
            if (res.data.tag) {
              this.isSended = true;
              this.$message.success("已发送邮箱验证码");
            } else {
              this.$message.error("发送邮箱验证码失败,请重试");
            }
          });
        }
      });
    },
    checkValid() {
      return Promise.all([
        hasUser(this.username).then((res) => {
          return res.data.tag;
        }),
        hasEmail(this.email).then((res) => {
          return res.data.tag;
        }),
      ]).then((res) => {
        if (res[0] && res[1]) {
          this.$message.error("该用户名与邮箱已被注册");
          return false;
        } else if (res[0]) {
          this.$message.error("该用户名已被注册");
          return false;
        } else if (res[1]) {
          this.$message.error("该邮箱已被注册");
          return false;
        } else {
          return true;
        }
      });
    },
  },
  validations: {
    nickname: {
      required,
      minLength: minLength(3),
    },
    username: {
      required,
      minLength: minLength(3),
    },
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
      minLength: minLength(6),
    },
    email: {
      required,
      email,
    },
    code: {
      required,
      minLength: minLength(6),
    },
  },
};
</script>
<style scoped>
.reg_page {
  background-color: white;
  height: 100vh;
}
.logo {
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100px;
}

input {
  border-bottom: 1px solid silver;
  background: white;
  padding: 5px 10px;
  display: block;
  margin: 10px auto;
  width: 90vw;
  height: 35px;
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

#register_btn {
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
.btn_active {
  background-color: rgb(252, 26, 0);
}
.btn {
  background-color: rgb(255, 188, 179);
  pointer-events: none;
}
#emailer {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 90vw;
  color: whitesmoke;
  border-radius: 35px;
}
</style>