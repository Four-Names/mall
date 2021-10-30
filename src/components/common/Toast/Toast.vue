<template>
  <div class="" v-show="ifShow">
    <div class="toast">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      message: "",
      ifShow: false,
      timer: null,
    };
  },
  methods: {
    show(msg, duration = 1500) {
      this.message = msg;
      this.ifShow = true;

      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.close();
      }, duration);

    },

    close() {
      this.ifShow = false;
      this.message = "";
    },

    todo() {
      this.show("该功能待开发中,敬请期待");
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
  background-color: rgba(216, 94, 94, 0.801);
  color: white;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
}
</style>