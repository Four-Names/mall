<template>
  <div class="operation-bar" >
    <div>
      <div
        class="choosed"
        @click="$emit('chooseAll')"
        v-show="!isAllChoosed"
      >
        <img src="~img/cart/unchoosed.svg" alt="" />
        全选
      </div>
      <div
        class="choosed"
        @click="$emit('unChooseAll')"
        v-show="isAllChoosed"
      >
        <img src="~img/cart/choosed.svg" alt="" />
        全选
      </div>
    </div>
    <div>
      <div class="btn" :class="ifChoosed" @click="$emit('resolve')">{{ desc }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemOperationBar",
  props: {
    desc: {
      type: String,
      default() {
        return "";
      },
    },
    isAllChoosed: {
      type: Boolean,
      default() {
        return false;
      },
    },
    hasChoosed: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  computed: {
    ifChoosed() {
      console.log(this.hasChoosed);
      return this.hasChoosed ? "isChoosed" : ["noChoosed", "lock"];
    },

  },
};
</script>
<style scoped>
.operation-bar {
  height: 7vh;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  padding-left: 4vw;
  padding-right: 3vw;
  position: fixed;
  z-index: 5;
  bottom: 0;
  background-color: white;
}
.choosed {
  display: flex;
  align-items: center;
  gap: 2px;
}

.choosed > img {
  height: 21px;
  width: 20px;
}

.btn {
  border: 1px solid rgb(224, 224, 224);
  padding: 6px 10px;
  border-radius: 15px;
  text-align: center;
  margin: 0 10px;
  line-height: 4vh;
  color: white;
  border: none;

}
.isChoosed {
  background-color: #f4200c;
}
.noChoosed {
  background-color: #f57469;
}
.lock {
  pointer-events: none;
}
</style>