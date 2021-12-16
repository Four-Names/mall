<template>
  <div class="edit_address">
    <div>
      <div class="desc">收货人</div>
      <input
        v-model="$v.receiver.$model"
        :class="status($v.receiver)"
        type="text"
        placeholder="姓名"
        minlength="1"
        maxlength="10"
        autocomplete="false"
      />
    </div>
    <div>
      <div class="desc">联系方式</div>
      <input
        v-model="$v.phone.$model"
        :class="status($v.phone)"
        type="text"
        placeholder="手机号码"
        minlength="11"
        maxlength="11"
        max="11"
        min="11"
        autocomplete="false"
      />
    </div>
    <div>
      <div class="desc">所在地区</div>

      <div class="area">
        <area-cascader
          :level="0"
          v-model="selected"
          :data="pcaa"
          type="text"
          size="large"
        ></area-cascader>
      </div>
    </div>
    <div>
      <div class="desc">详细地址</div>
      <input
        v-model="$v.currentAddress.$model"
        :class="status($v.currentAddress)"
        type="text"
        placeholder="详细地址需填写街道楼栋楼层或房间号信息"
        minlength="1"
        maxlength="32"
        autocomplete="false"
      />
    </div>

    <div id="btns">
      <div class="Btn delBtn" :class="btnIsActive" @click="deleteAddress">
        <span>删除该地址</span>
      </div>
      <div class="Btn" :class="btnIsActive" @click="submit">
        <span>确认</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  numeric,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

import { AreaSelect, AreaCascader } from "vue-area-linkage";
import { pcaa } from "area-data";
import { deleteAddress } from "network/user";
import { mapState, mapMutations } from "vuex";

import { selectAddress, updateAddress } from "network/user";

export default {
  components: { AreaSelect, AreaCascader },
  data() {
    return {
      pcaa: pcaa,
      selected: [],
      currentAddress: "",
      receiver: "",
      phone: "",
      i: this.$route.query.i,
      idx: 0,
    };
  },
  created() {
    selectAddress(this.i).then((data) => {
      this.$nextTick(() => {
        if (data.data.tag) {
          this.$set(this, "selected", [
            data.data.data[0].province,
            data.data.data[0].city,
          ]);
          this.currentAddress = data.data.data[0].address;
          this.receiver = data.data.data[0].receiver;
          this.phone = data.data.data[0].phone;
        } else {
          this.$router.go(-1);
        }
      });
    });
  },
  computed: {
    ...mapState(["address"]),
    btnIsActive() {
      return !this.$v.receiver.$invalid &&
        !this.$v.phone.$invalid &&
        this.selected.length &&
        !this.$v.currentAddress.$invalid
        ? "btn_active"
        : "btn";
    },
  },
  methods: {
    ...mapMutations(["setAddress"]),
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    submit() {
      let address = this.currentAddress,
        phone = this.phone,
        receiver = this.receiver,
        province = this.selected[0],
        city = this.selected[1],
        i = this.i;
      let data = {
        address,
        phone,
        receiver,
        province,
        city,
        i,
      };
      updateAddress(JSON.stringify({ data })).then((r) => {
        if (r.data.tag) {
          this.$message.success("修改成功");
          this.$emit("reloadAddress");
          this.$router.go(-1);
        }
      });
    },
    deleteAddress() {
      this.$confirm("确认删除该地址?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          if (this.i == this.address.i) {
            this.setAddress({});
          }
          deleteAddress({ i: this.i }).then((res) => {
            if (res.data.tag) {
              this.$message.success("删除成功");
              this.$router.go(-1);
              this.$emit("reloadAddress");
            }
          });
        })
        .catch((e) => {
          this.$message("已取消删除");
        });
    },
  },

  validations: {
    receiver: {
      required,
      minlength: minLength(1),
      maxlength: maxLength(10),
    },
    phone: {
      required,
      numeric,
      minLength: minLength(11),
      maxlength: maxLength(11),
      phoneReg(value) {
        return /^1[3-9]\d{9}$/.test(value);
      },
    },
    currentAddress: {
      required,
      minLength: minLength(1),
      maxlength: maxLength(32),
    },
  },
};
</script>
<style scoped>
.btn_active {
  background-color: rgb(252, 26, 0);
}
.btn {
  background-color: rgb(255, 188, 179);
  pointer-events: none;
}

#btns {
  display: flex;
  flex-direction: row;
  bottom: 0;
  position: absolute;
}

.Btn {
  width: 45vw;
  height: 50px;
  border-radius: 35px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: whitesmoke;
}

.delBtn {
  background-color: rgb(64, 158, 255);
}
.edit_address {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100vw;
  height: 100vh;
}

.desc {
  color: rgb(121, 121, 121);
  width: 100%;
  height: 25px;
  padding: 10px 0;
}

.edit_address > div {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 95vw;
  padding: 1vh 2.5vw;
  border-bottom: 1px solid rgb(216, 216, 216);
  font-size: 16px;
}

input {
  outline: none;
  width: 100%;
  height: 30px;
}

input::placeholder {
  color: rgb(216, 216, 216);
}

.area {
  width: 100%;
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