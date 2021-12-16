<template>
  <div>
    <setting-pay-pwd v-if="!hasPayPwd && setPayed" />
    <el-dialog
      title="支付订单"
      :visible.sync="showPay"
      :close-on-click-modal="false"
      :show-close="false"
      width="80vw"
    >
      <el-form :model="form" :rules="rules" ref="Form">
        <el-form-item label="支付密码" label-width="240" prop="payPwd">
          <el-input
            show-password
            v-model="form.payPwd"
            autocomplete="off"
            maxlength="6"
            minlength="6"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="payOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SettingPayPwd from "views/my/setting/SettingPayPwd";
import {
  hasPayPwd,
  validPayPwd,
  PayOrder,
  receiveOrder,
  cancelOrder,
} from "network/user";
export default {
  components: {
    SettingPayPwd,
  },
  props: {
    setPayed: {
      type: Boolean,
      default() {
        return false;
      },
    },
    setReceived: {
      type: Boolean,
      default() {
        return false;
      },
    },
    setCompleted: {
      type: Boolean,
      default() {
        return false;
      },
    },
    setCanceled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    i: {
      type: Number,
      default() {
        return 0;
      },
    },
    price: {
      type: Number,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      form: {
        payPwd: "",
      },
      rules: {
        payPwd: [
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
        ],
      },
      hasPayPwd: true,
      dialogVisible: false,
      showPay: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async cancel() {
      this.showPay = false;
      this.$emit('close')
    },
    payOrder() {
      this.$refs["Form"].validate((valid) => {
        if (valid) {
          this.validPayPwd(this.form.payPwd);
        } else {
          this.$message.warning("密码格式错误");
        }
      });
    },
    async pay() {
      let i = this.i;
      await this.$confirm(` 确认支付${this.price}元?`, "支付确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
        closeOnClickModal: false,
      })
        .then(async () => {
          await PayOrder(JSON.stringify({ i })).then((res) => {
            if (res.data.tag) {
              this.$message.success("支付成功");
              this.$router.go(0);

            } else {
              this.$message.error("支付失败");
            }
          });
          this.showPay = false;
        })
        .catch(async () => {
          this.showPay = false;

          this.$emit("updateOrder", false);
        });
      this.deleteOrderedGoods();
    },

    async validPayPwd(pwd) {
      await validPayPwd(JSON.stringify({ pwd })).then(async (res) => {
        if (res.data.tag) {
          this.pay()
        } else {
          this.$message.warning("密码错误,请重新输入");
          throw false;
        }
      });
    },

    receiveOrder(i) {
      this.$confirm("确认收货?", "确认收货", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          await receiveOrder(JSON.stringify({ i })).then((res) => {
            if (res.data.tag) {
              this.$message.success("已确认收货");
              this.$router.go(0);
            }
          });
        })
        .catch((e) => {
          this.$message("已取消");
        });
    },

    cancelOrder(i) {
      this.$confirm("确认取消订单?", "取消订单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          await cancelOrder(JSON.stringify({ i })).then((res) => {
            if (res.data.tag) {
              this.$message.success("已取消订单");
              this.$router.go(0);
            }
          });
        })
        .catch((e) => {
          this.$message("已取消");
        });
    },
  },
  created() {
    hasPayPwd().then((res) => {
      if (res.data.tag) {
        this.showPay = true;
      } else {
        this.pay();
      }
    });
  },
  mounted() {},
};
</script>
<style scoped>
</style>