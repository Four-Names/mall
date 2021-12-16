<template>
  <div>
    <setting-pay-pwd v-if="!hasPayPwd" />
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
import { hasPayPwd, validPayPwd, updateOrder } from "network/user";
import { mapMutations } from "vuex";
export default {
  components: {
    SettingPayPwd,
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
    price: {
      type: String,
      default() {
        return "";
      },
    },
    count: {
      type: Number,
      default() {
        return 0;
      },
    },
    address_i: {
      type: Number,
      default() {
        return 0;
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
    ...mapMutations(["deleteOrderedGoods", "clearBought"]),
    async cancel() {
      this.showPay = false;
      this.updateOrder(false);
    },
    payOrder() {
      this.$refs["Form"].validate((valid) => {
        if (valid) {
          this.validPayPwd(this.form.payPwd);
        } else {
            this.$message.error("密码格式错误");
        }
      });
    },
    async pay() {
      await this.$confirm(` 确认支付${this.price}元?`, "支付确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
        closeOnClickModal: false,
      })
        .then(async () => {
          await this.updateOrder(true);
          this.$router.replace("/my/order/2");
        })
        .catch(async () => {
          await this.updateOrder(false);
          this.$router.replace("/my/order/1");
        });
    },

    async updateOrder(payed) {
      let address_i = this.address_i,
        price = this.price,
        count = this.count,
        data = this.goods;
      await updateOrder({
        payed,
        price,
        count,
        data: this.goods,
        address_i,
      })
        .then((res) => {
          if (this.$route.params.type == 0) {
            this.deleteOrderedGoods();
          } else if (this.$route.params.type == 1) {
            this.clearBought();
          }
          if (res.data.tag) {
            if (payed) {
              this.$message.success("支付成功!");
              this.$router.replace("/my/order/2");
            } else {
              this.$message.warning("订单未支付");
              this.$router.replace("/my/order/1");
            }
          } else {
            this.$message.error("下单失败,请重试");
            this.$router.go(-1);
          }
        })
        .catch(() => {
          this.$message.error("下单失败");
          this.$router.replace("/my/order/1");
        });
    },

    async validPayPwd(pwd) {
      await validPayPwd(JSON.stringify({ pwd })).then(async (res) => {
        if (res.data.tag) {
          this.showPay = false;
          this.updateOrder(true);
        } else {
          this.$message.warning("密码错误,请重新输入");
          throw false;
        }
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