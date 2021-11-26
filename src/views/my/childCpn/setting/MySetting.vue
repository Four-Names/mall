<template>
  <div class="main">
    <router-view></router-view>
    <div v-show="main">
      <common-nav-bar
        :home="true"
        :category="true"
        :cart="true"
        :my="true"
        :viewed="true"
      >
        <div slot="content">账户设置</div>
      </common-nav-bar>
      <div class="setting">
        <div>
          <span> 管理我的账户 </span>
          <div class="user"></div>
        </div>
        <div @click="$router.push('/my/address')">
          <span> 收货地址管理 </span>
          <span class="explain"> 管理我的地址 </span>
        </div>
        <div @click="setPwd = true">
          <span> 修改登录密码 </span>
          <span class="explain"> 定期修改登录密码,保护账户安全 </span>
        </div>
        <div @click="setPayPwd = true">
          <span> 设置支付密码 </span>
          <span class="explain">{{ msg }}</span>
        </div>
        <div @click="changeNickname">
          <span> 更改昵称 </span>
        </div>
        <div @click="logOut">
          <span> 退出登录 </span>
          <span class="explain"> 退出当前账户 </span>
        </div>
      </div>
    </div>
    <setting-login-pwd v-if="setPwd" @done="setPwd = false" />
    <setting-pay-pwd
      v-if="setPayPwd"
      @done="setPayPwd = false"
      @add="hasPayPwd = true"
      :hasPayPwd="hasPayPwd"
    />
  </div>
</template>

<script>
import CommonNavBar from "components/common/NavBar/CommonNavBar";
import SettingLoginPwd from "./SettingLoginPwd";
import SettingPayPwd from "./SettingPayPwd";
import { mapMutations } from "vuex";
import { getUserInfo, setUserInfo } from "common/localStorage";

export default {
  components: {
    CommonNavBar,
    SettingLoginPwd,
    SettingPayPwd,
  },
  data() {
    return {
      hasPayPwd: false,
      setPayPwd: false,
      setPwd: false,
    };
  },
  methods: {
    ...mapMutations(["logout"]),
    logOut() {
      this.$confirm("是否退出当前账户?", "退出登录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "info",
      })
        .then(() => {
          this.logout();
          this.$router.push("/home");
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    changeNickname() {
      this.$prompt("请输入新昵称", "更改昵称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
      })
        .then(async (v) => {
          let nickname = {
            nickname: v.value,
          };
          await this.$axios
            .post("/user/set_nickname", JSON.stringify(nickname))
            .then((res) => {
              if (res.data.tag) {
                let userInfo = getUserInfo();
                userInfo.nickname = v.value;
                setUserInfo(userInfo);
                this.$message.success("更改昵称成功");
              } else {
                this.$message.error("更改昵称失败");
              }
            });
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    cancel() {
      this.$message("已取消");
      this.clear();
    },
    clear() {
      this.form.oldPwd = "";
      this.form.newPwd = "";
      this.form.repeatNewPwd = "";
    },
  },
  created() {
    this.$axios.post("/user/has_pay_pwd").then((res) => {
      this.hasPayPwd = res.data.tag;
    });
  },
  computed: {
    msg() {
      return this.hasPayPwd ? "已设置" : "未设置";
    },
    main(){
      return this.$route.name == 'Setting';
    }
  },

};
</script>
<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-color: rgb(242, 242, 242);
}

.setting {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.setting > div {
  background-color: white;
  width: 100vw;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
}
.setting > div:not(:first-child) {
  display: flex;
  background-color: white;
  width: 100vw;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
}

.user {
  width: 95vw;
  height: 85px;
  border: 1px solid rgb(255, 65, 78);
  border-radius: 10px;
  background-color: rgb(255, 249, 249);
  margin: 15px 0;
}

.explain {
  font-size: 12px;
  color: gray;
}
</style>