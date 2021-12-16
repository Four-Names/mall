<template>
  <div class="serach_main">
    <div class="mid" v-show="imgLoaded" @click="search">
      <input
        name="search"
        type="text"
        class="search"
        :placeholder="keys[idx]"
      />
      <img src="~img/search/search.svg" alt="" @load="imgLoaded = true" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgLoaded: false,
      idx: 0,
      keys: ["男装", "女装", "男鞋", "女鞋", "裙子", "帽子", "首饰"],
    };
  },
  computed: {
    key() {
      return this.keys[this.idx];
    },
  },
  methods: {
    search() {
      this.$router.push({ path: "/search", query: { key: this.key } });
    },
  },
  activated() {
    this.idx = parseInt(Math.random() * 7);
  },
  deactivated() {
    this.idx = parseInt(Math.random() * 7);
  },
};
</script>
<style scoped>
.serach_main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.search {
  height: 5vh;
  border: none;
  outline: none;
  font-size: 2vh;
  text-align: left;
  background-color: rgb(245, 245, 245);
  width: calc(100% - 40px);
}
.mid {
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: right;
  align-items: center;
  border-radius: 18px;
  background-color: rgb(245, 245, 245);
}
</style>