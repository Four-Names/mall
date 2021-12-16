<template>
  <div class="main">
    <el-dialog
      title="更改登录密码"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      width="80vw"
    >
      <el-form :model="form" :rules="rules" ref="Form">
        <el-form-item
          label="旧登录密码"
          :label-width="formLabelWidth"
          prop="oldPwd"
        >
          <el-input
            show-password
            v-model="form.oldPwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新登录密码"
          :label-width="formLabelWidth"
          prop="newPwd"
        >
          <el-input
            show-password
            v-model="form.newPwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认新登录密码"
          :label-width="formLabelWidth"
          prop="repeatNewPwd"
        >
          <el-input
            v-model="form.repeatNewPwd"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="setPwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommonNavBar from "components/common/NavBar/CommonNavBar";

import { isValidPwd, updatePwd } from "network/user";

export default {
  components: {
    CommonNavBar,
  },
  props: {
    hasPayPwd: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      form: {
        oldPwd: "",
        newPwd: "",
        repeatNewPwd: "",
      },
      rules: {
        oldPwd: [
          {
            trigger: "blur",
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
          },
        ],
        newPwd: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入支付密码"));
              } else {
                if (this.form.repeatNewPwd !== "") {
                  this.$refs.Form.validateField("repeatNewPwd");
                }
                callback();
              }
            },
            trigger: "blur",
          },
          {
            trigger: "blur",
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
          },
        ],
        repeatNewPwd: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.form.newPwd) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
          {
            trigger: "blur",
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
          },
        ],
      },
      formLabelWidth: "240",
      showDialog: true,
    };
  },
  methods: {
    setPwd() {
      this.$refs["Form"].validate((valid) => {
        if (valid) {
          let pwd = {
            pwd: this.form.oldPwd,
          };
          isValidPwd(JSON.stringify(pwd)).then(async (res) => {
            if (res.data.tag) {
              let pwd = {
                pwd: this.form.newPwd,
              };
              await updatePwd(JSON.stringify(pwd)).then((res) => {
                if (res.data.tag) {
                  this.$message.success("更新密码成功");
                  this.$emit("done");
                } else {
                  this.$message.warning("更新密码失败");
                  this.$emit("done");
                }
              });
            } else {
              this.$message.error("密码错误");
            }
          });
        } else {
          this.$message.warning("信息不合法");
        }
      });
    },
    cancel() {
      this.$message("已取消");
      this.$emit("done");
    },
  },
};
</script>
<style scoped>
</style>