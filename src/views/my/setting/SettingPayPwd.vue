<template>
  <div class="main">
    <el-dialog
      :title="payTitle"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      width="80vw"
    >
      <el-form :model="form" :rules="rules" ref="Form">
        <el-form-item
          label="旧支付密码"
          :label-width="formLabelWidth"
          v-if="hasPayPwd"
          prop="oldPwd"
        >
          <el-input
            show-password
            v-model="form.oldPwd"
            autocomplete="off"
            maxlength="6"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="hasPayPwd ? ' 新支付密码' : '支付密码'"
          :label-width="formLabelWidth"
          prop="newPwd"
        >
          <el-input
            show-password
            v-model="form.newPwd"
            autocomplete="off"
            maxlength="6"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="hasPayPwd ? '确认新支付密码' : '确认支付密码'"
          :label-width="formLabelWidth"
          prop="repeatNewPwd"
        >
          <el-input
            v-model="form.repeatNewPwd"
            show-password
            autocomplete="off"
            maxlength="6"
            minlength="6"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="setPayPwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommonNavBar from "components/common/NavBar/CommonNavBar";

import { validPayPwd, setPayPwd } from "network/user";

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
      form: {},
      rules: {},
      formLabelWidth: "240",
      showDialog: true,
    };
  },
  methods: {
    setPayPwd() {
      this.$refs["Form"].validate((valid) => {
        if (valid) {
          if (this.hasPayPwd) {
            let pwd = {
              pwd: this.form.oldPwd,
            };
            validPayPwd(JSON.stringify(pwd)).then(async (res) => {
              if (res.data.tag) {
                let pwd = {
                  pwd: this.form.newPwd,
                };
                setPayPwd(JSON.stringify(pwd)).then((res) => {
                  if (res.data.tag) {
                    this.$message.success("设置成功");
                    this.$emit("add");
                    this.$emit("done");
                  } else {
                    this.$message.error("设置失败");
                    this.$emit("done");
                  }
                });
              } else {
                this.$message.warning("支付密码错误");
              }
            });
          } else {
            let pwd = {
              pwd: this.form.newPwd,
            };
            setPayPwd(JSON.stringify(pwd)).then((res) => {
              if (res.data.tag) {
                this.$message.success("设置成功");
                this.$emit("add");
                this.$emit("done");
              } else {
                this.$message.error("设置失败");
                this.$emit("done");
              }
            });
          }
        } else {
          this.$message.warning("密码不合法");
          return false;
        }
      });
    },
    cancel() {
      this.$message("已取消");
      this.$emit("done");
    },
  },
  created() {
    if (this.hasPayPwd) {
      this.form.oldPwd = "";
      this.rules.oldPwd = [
        {
          trigger: "blur",
          min: 6,
          max: 6,
          message: "支付密码为6位数字",
        },
        { pattern: /^[0-9]*$/, message: "支付密码必须全部为数字" },
      ];
    }
    this.form = {
      newPwd: "",
      repeatNewPwd: "",
    };
    this.rules = {
      newPwd: [
        {
          validator: (rule, value, callback) => {
            if (value === "") {
              callback(new Error("请输入密码"));
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
          max: 6,
          message: "支付密码为6位数字",
        },
        { pattern: /^[0-9]*$/, message: "支付密码必须全部为数字" },
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
          max: 6,
          message: "支付密码为6位数字",
        },
        { pattern: /^[0-9]*$/, message: "支付密码必须全部为数字" },
      ],
    };
  },
  computed: {
    payTitle() {
      return this.hasPayPwd ? "更改支付密码" : "设置支付密码";
    },
  },
};
</script>
<style scoped>
</style>