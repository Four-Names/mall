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
        autocomplete="false"
        max="11"
        min="11"
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
        v-model="$v.address.$model"
        :class="status($v.address)"
        type="text"
        placeholder="详细地址需填写街道楼栋楼层或房间号信息"
        autocomplete="false"
        minlength="1"
        maxlength="32"
      />
    </div>

    <div id="submit_Btn" :class="btnIsActive" @click="submit">
      <span>确认</span>
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

import { addAddress } from "network/user";

export default {
  components: { AreaSelect, AreaCascader },
  data() {
    return {
      pcaa: pcaa,
      selected: [],
      address: "",
      receiver: "",
      phone: "",
    };
  },
  computed: {
    btnIsActive() {
      return !this.$v.receiver.$invalid &&
        !this.$v.phone.$invalid &&
        this.selected.length &&
        !this.$v.address.$invalid
        ? "btn_active"
        : "btn";
    },
  },
  methods: {
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    submit() {
      let address = this.address,
        phone = this.phone,
        receiver = this.receiver,
        province = this.selected[0],
        city = this.selected[1];
      let data = {
        address,
        phone,
        receiver,
        province,
        city,
      };
      addAddress(JSON.stringify({ data })).then((r) => {
        if (r.data.tag) {
          this.$emit("reloadAddress");
          this.$message.success("添加成功");
          this.$router.go(-1);
        }
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
    address: {
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

#submit_Btn {
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